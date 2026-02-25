const mongoose = require('mongoose');

const bannerSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, enum: ['video', 'image'], required: true },
  mediaUrl: { type: String, required: true },  // video or image URL
  thumbUrl: { type: String, default: '' },
  buttonText: { type: String, default: 'Get Started' },
  buttonUrl: { type: String, default: '/contact' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Hero Banner' },
    slides: [bannerSlideSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);