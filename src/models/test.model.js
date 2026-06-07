const mongoose = require('mongoose');

const RawResultSchema = new mongoose.Schema({
  line: { type: String },
  recognized: { type: Boolean },
  gazeConfidence: { type: Number } // optional numeric score from frontend gaze detector
}, { _id: false });

const TestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, enum: ['distance','near','combined'], required: true },
  device: { type: String, enum: ['mobile','tablet','desktop','other'], required: true },
  deviceInfo: { type: Object, default: {} },
  distanceMeters: { type: Number, default: null },
  rawResults: { type: [RawResultSchema], default: [] },
  calculatedScore: {
    distance: { type: String, default: null }, // e.g., "20/40"
    near: { type: String, default: null } // e.g., "J2"
  },
  aiPrescription: {
    text: { type: String },
    meta: { type: Object }
  }
}, { timestamps: true });

TestSchema.index({ userId: 1, createdAt: -1 });

const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);

module.exports = Test;