const { validationResult } = require('express-validator');
const Test = require('../models/test.model');
const mongoose = require('mongoose');

// helper: compute a very small fallback calculatedScore if frontend didn't provide
function computeFallbackScore(rawResults) {
  // naive heuristic: count recognized lines
  if (!Array.isArray(rawResults) || rawResults.length === 0) return { distance: null, near: null };
  const recognized = rawResults.filter(r => r.recognized).length;
  const total = rawResults.length;
  const ratio = recognized / total;
  // map ratio to a simple score string (demo)
  if (ratio >= 0.9) return { distance: '20/20', near: 'J1' };
  if (ratio >= 0.7) return { distance: '20/30', near: 'J2' };
  if (ratio >= 0.5) return { distance: '20/40', near: 'J3' };
  return { distance: '20/80', near: 'J5' };
}

exports.createTest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const payload = req.body;
    payload.userId = req.user._id;

    if (!payload.calculatedScore) {
      payload.calculatedScore = computeFallbackScore(payload.rawResults || []);
    }

    const test = await Test.create(payload);
    res.status(201).json(test);
  } catch (err) { next(err); }
};

exports.getTests = async (req, res, next) => {
  try {
    const tests = await Test.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) { next(err); }
};

exports.getTestById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    if (test.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json(test);
  } catch (err) { next(err); }
};

exports.updateTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    if (test.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    const allowed = ['distanceMeters','rawResults','calculatedScore','aiPrescription'];
    allowed.forEach(key => {
      if (req.body[key] !== undefined) test[key] = req.body[key];
    });
    await test.save();
    res.json(test);
  } catch (err) { next(err); }
};

exports.deleteTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    if (test.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await test.remove();
    res.status(204).end();
  } catch (err) { next(err); }
};
