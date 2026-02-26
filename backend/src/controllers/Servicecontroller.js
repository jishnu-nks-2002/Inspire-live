const Service = require('../models/Service');
const { deleteFromCloudinary, getPublicIdFromUrl, isCloudinaryUrl } = require('../middleware/uploadMiddleware');

// ─── GET all services (public) ───────────────────────────────────────────────
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET all services for admin (includes inactive) ──────────────────────────
exports.getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET single service by slug (public) ─────────────────────────────────────
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET single service by ID (admin) ────────────────────────────────────────
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── CREATE service ───────────────────────────────────────────────────────────
exports.createService = async (req, res) => {
  try {
    const body = { ...req.body };

    // Parse JSON strings sent from FormData
    if (typeof body.keyFeatures === 'string') {
      try { body.keyFeatures = JSON.parse(body.keyFeatures); } catch { body.keyFeatures = []; }
    }
    if (typeof body.benefits === 'string') {
      try { body.benefits = JSON.parse(body.benefits); } catch { body.benefits = []; }
    }
    if (typeof body.faqs === 'string') {
      try { body.faqs = JSON.parse(body.faqs); } catch { body.faqs = []; }
    }

    // Cloudinary returns the secure_url directly on req.files[field][0].path
    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        body.heroImage = req.files.heroImage[0].path;
      }
      if (req.files.detailImage1 && req.files.detailImage1[0]) {
        body.detailImage1 = req.files.detailImage1[0].path;
      }
      if (req.files.detailImage2 && req.files.detailImage2[0]) {
        body.detailImage2 = req.files.detailImage2[0].path;
      }
    }

    const service = new Service(body);
    await service.save();

    // Auto-update prev/next nav links across all active services
    await updateServiceLinks();

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── UPDATE service ───────────────────────────────────────────────────────────
exports.updateService = async (req, res) => {
  try {
    const existing = await Service.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const body = { ...req.body };

    if (typeof body.keyFeatures === 'string') {
      try { body.keyFeatures = JSON.parse(body.keyFeatures); } catch { body.keyFeatures = []; }
    }
    if (typeof body.benefits === 'string') {
      try { body.benefits = JSON.parse(body.benefits); } catch { body.benefits = []; }
    }
    if (typeof body.faqs === 'string') {
      try { body.faqs = JSON.parse(body.faqs); } catch { body.faqs = []; }
    }

    // If new images uploaded, delete old ones from Cloudinary first
    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        await deleteOldImage(existing.heroImage);
        body.heroImage = req.files.heroImage[0].path;
      }
      if (req.files.detailImage1 && req.files.detailImage1[0]) {
        await deleteOldImage(existing.detailImage1);
        body.detailImage1 = req.files.detailImage1[0].path;
      }
      if (req.files.detailImage2 && req.files.detailImage2[0]) {
        await deleteOldImage(existing.detailImage2);
        body.detailImage2 = req.files.detailImage2[0].path;
      }
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    await updateServiceLinks();

    res.json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE service ───────────────────────────────────────────────────────────
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    // Delete all associated Cloudinary images
    await deleteOldImage(service.heroImage);
    await deleteOldImage(service.detailImage1);
    await deleteOldImage(service.detailImage2);

    await Service.findByIdAndDelete(req.params.id);

    await updateServiceLinks();

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── REORDER services ─────────────────────────────────────────────────────────
exports.reorderServices = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Service.findByIdAndUpdate(orderedIds[i], { order: i });
    }
    await updateServiceLinks();
    res.json({ success: true, message: 'Services reordered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Delete an image from Cloudinary if it's a Cloudinary URL
 */
async function deleteOldImage(imageUrl) {
  if (!imageUrl || !isCloudinaryUrl(imageUrl)) return;
  try {
    const publicId = getPublicIdFromUrl(imageUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId, 'image');
    }
  } catch (err) {
    // Log but don't throw — deletion failure shouldn't block the main operation
    console.error('Failed to delete old image from Cloudinary:', err.message);
  }
}

/**
 * Auto-update prevService / nextService slugs for all active services
 * based on their current sort order
 */
async function updateServiceLinks() {
  const services = await Service.find({ isActive: true }).sort({ order: 1 });
  for (let i = 0; i < services.length; i++) {
    services[i].prevService = i > 0 ? services[i - 1].slug : null;
    services[i].nextService = i < services.length - 1 ? services[i + 1].slug : null;
    await services[i].save();
  }
}