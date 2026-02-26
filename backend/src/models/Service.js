const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const benefitSchema = new mongoose.Schema({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  heroImage: { type: String },
  detailImage1: { type: String },
  detailImage2: { type: String },
  description1: { type: String },
  description2: { type: String },
  keyFeatures: [{ type: String }],
  whyChooseHeading: { type: String },
  whyChooseText: { type: String },
  benefits: [benefitSchema],
  faqs: [faqSchema],
  prevService: { type: String, default: null },
  nextService: { type: String, default: null },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);