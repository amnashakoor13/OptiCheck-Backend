const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/tests.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(auth);

router.get('/', controller.getTests);
router.post('/',
  [
    body('type').isIn(['distance','near','combined']).withMessage('type invalid'),
    body('device').isIn(['mobile','tablet','desktop','other']).withMessage('device invalid')
  ],
  controller.createTest);

router.get('/:id', [param('id').isMongoId().withMessage('invalid id')], controller.getTestById);
router.put('/:id', [param('id').isMongoId().withMessage('invalid id')], controller.updateTest);
router.delete('/:id', [param('id').isMongoId().withMessage('invalid id')], controller.deleteTest);

module.exports = router;
