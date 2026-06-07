const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/ai.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(auth);

router.post('/prescription',
  [ body('testId').optional().isMongoId().withMessage('testId invalid') ],
  controller.generatePrescription);

module.exports = router;
