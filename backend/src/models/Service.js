const mongoose = require('mongoose');

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE MODEL SCHEMA
// ═══════════════════════════════════════════════════════════════════════════════

// ─── FAQ Sub-Schema ──────────────────────────────────────────────────────────
const faqSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: [true, 'FAQ question is required'],
    trim: true
  },
  answer: { 
    type: String, 
    required: [true, 'FAQ answer is required'],
    trim: true
  }
}, { _id: true });

// ─── Benefit Sub-Schema ──────────────────────────────────────────────────────
const benefitSchema = new mongoose.Schema({
  number: { 
    type: String, 
    required: [true, 'Benefit number is required'],
    trim: true,
    default: '01'
  },
  title: { 
    type: String, 
    required: [true, 'Benefit title is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Benefit description is required'],
    trim: true
  }
}, { _id: true });

// ─── Main Service Schema ─────────────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({
  // Core fields
  slug: { 
    type: String, 
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    index: true
  },
  
  subtitle: { 
    type: String,
    trim: true,
    default: ''
  },
  
  // Images (Cloudinary URLs)
  heroImage: { 
    type: String,
    trim: true,
    default: ''
  },
  
  detailImage1: { 
    type: String,
    trim: true,
    default: ''
  },
  
  detailImage2: { 
    type: String,
    trim: true,
    default: ''
  },
  
  // Descriptions
  description1: { 
    type: String,
    trim: true,
    default: ''
  },
  
  description2: { 
    type: String,
    trim: true,
    default: ''
  },
  
  // Arrays
  keyFeatures: [{ 
    type: String,
    trim: true
  }],
  
  // Why Choose section
  whyChooseHeading: { 
    type: String,
    trim: true,
    default: ''
  },
  
  whyChooseText: { 
    type: String,
    trim: true,
    default: ''
  },
  
  // Embedded documents
  benefits: {
    type: [benefitSchema],
    default: []
  },
  
  faqs: {
    type: [faqSchema],
    default: []
  },
  
  // Navigation links (auto-generated)
  prevService: { 
    type: String,
    default: null
  },
  
  nextService: { 
    type: String,
    default: null
  },
  
  // Order and status
  order: { 
    type: Number,
    default: 0,
    index: true
  },
  
  isActive: { 
    type: Boolean,
    default: true,
    index: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ─── Indexes ─────────────────────────────────────────────────────────────────
serviceSchema.index({ slug: 1 });
serviceSchema.index({ isActive: 1, order: 1 });
serviceSchema.index({ title: 'text' });

// ─── Pre-save Middleware ─────────────────────────────────────────────────────
serviceSchema.pre('save', function(next) {
  // Ensure slug is lowercase and trimmed
  if (this.slug) {
    this.slug = this.slug.toLowerCase().trim();
  }
  
  // Filter out empty key features
  if (this.keyFeatures) {
    this.keyFeatures = this.keyFeatures.filter(f => f && f.trim());
  }
  
  next();
});

// ─── Instance Methods ────────────────────────────────────────────────────────
serviceSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    slug: this.slug,
    title: this.title,
    subtitle: this.subtitle,
    heroImage: this.heroImage,
    detailImage1: this.detailImage1,
    detailImage2: this.detailImage2,
    description1: this.description1,
    description2: this.description2,
    keyFeatures: this.keyFeatures,
    whyChooseHeading: this.whyChooseHeading,
    whyChooseText: this.whyChooseText,
    benefits: this.benefits,
    faqs: this.faqs,
    prevService: this.prevService,
    nextService: this.nextService,
    order: this.order,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// ─── Static Methods ──────────────────────────────────────────────────────────
serviceSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug: slug.toLowerCase() });
};

serviceSchema.statics.findActiveServices = function() {
  return this.find({ isActive: true }).sort({ order: 1 });
};

// ─── Export Model ────────────────────────────────────────────────────────────
module.exports = mongoose.model('Service', serviceSchema);