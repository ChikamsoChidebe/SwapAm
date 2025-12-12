const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String, required: true },
  studentId: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  avatar: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  totalSwaps: { type: Number, default: 0 },
  campusPoints: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);