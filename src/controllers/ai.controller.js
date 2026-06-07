const { validationResult } = require('express-validator');
const Test = require('../models/test.model');
const aiService = require('../services/ai.service');

exports.generatePrescription = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { testId, visionData } = req.body;

    let test;
    if (testId) {
      test = await Test.findById(testId);
      if (!test) return res.status(404).json({ message: 'Test not found' });
      if (test.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    }

    // Compose prompt from either passed visionData or saved test
    const payload = test ? test : (visionData ? visionData : null);
    if (!payload) return res.status(400).json({ message: 'Provide testId or visionData' });

    // AI service returns text + meta
    const aiResult = await aiService.generatePrescription(payload);

    // Save to test if exists
    if (test) {
      test.aiPrescription = { text: aiResult.text, meta: aiResult.meta };
      await test.save();
    }

    res.json({ aiPrescription: aiResult });
  } catch (err) { next(err); }
};
