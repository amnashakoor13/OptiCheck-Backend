const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  email: { type: String, required: false, unique: true, sparse: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
