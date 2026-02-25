const Banner = require('../models/Banner');
const path = require('path');
const fs = require('fs');

// ─── Helpers ────────────────────────────────────────────────────────────────

const getOrCreateBanner = async () => {
  let banner = await Banner.findOne();
  if (!banner) {
    banner = await Banner.create({ name: 'Hero Banner', slides: [] });
  }
  return banner;
};

// ─── Public ──────────────────────────────────────────────────────────────────

// GET /api/banner  — returns active banner with active slides (for frontend)
exports.getPublicBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true }).lean();
    if (!banner) return res.json({ success: true, data: { slides: [] } });

    banner.slides = banner.slides
      .filter((s) => s.isActive)
      .sort((a, b) => a.order - b.order);

    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin ───────────────────────────────────────────────────────────────────

// GET /api/admin/banner
exports.getBanner = async (req, res) => {
  try {
    const banner = await getOrCreateBanner();
    banner.slides.sort((a, b) => a.order - b.order);
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/admin/banner/slides  — add a new slide
exports.addSlide = async (req, res) => {
  try {
    const banner = await getOrCreateBanner();
    const { title, subtitle, description, type, mediaUrl, thumbUrl, buttonText, buttonUrl, isActive } = req.body;

    // Handle file upload if present
    let resolvedMediaUrl = mediaUrl;
    let resolvedThumbUrl = thumbUrl || '';

    if (req.file) {
      resolvedMediaUrl = `/uploads/${req.file.filename}`;
      if (type === 'video') resolvedThumbUrl = resolvedMediaUrl;
    }

    const newSlide = {
      title,
      subtitle: subtitle || '',
      description: description || '',
      type: type || 'image',
      mediaUrl: resolvedMediaUrl,
      thumbUrl: resolvedThumbUrl || resolvedMediaUrl,
      buttonText: buttonText || 'Get Started',
      buttonUrl: buttonUrl || '/contact',
      order: banner.slides.length,
      isActive: isActive !== undefined ? isActive : true,
    };

    banner.slides.push(newSlide);
    await banner.save();

    res.status(201).json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/banner/slides/:slideId  — update a slide
exports.updateSlide = async (req, res) => {
  try {
    const banner = await getOrCreateBanner();
    const slide = banner.slides.id(req.params.slideId);
    if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });

    const fields = ['title', 'subtitle', 'description', 'type', 'mediaUrl', 'thumbUrl', 'buttonText', 'buttonUrl', 'order', 'isActive'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) slide[f] = req.body[f];
    });

    // Handle file upload
    if (req.file) {
      slide.mediaUrl = `/uploads/${req.file.filename}`;
      if (slide.type === 'video') slide.thumbUrl = slide.mediaUrl;
    }

    await banner.save();
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/admin/banner/slides/:slideId
exports.deleteSlide = async (req, res) => {
  try {
    const banner = await getOrCreateBanner();
    const slide = banner.slides.id(req.params.slideId);
    if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });

    // Remove local file if it's an upload
    if (slide.mediaUrl && slide.mediaUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../public', slide.mediaUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    slide.deleteOne();
    await banner.save();
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/banner/slides/reorder  — reorder slides
exports.reorderSlides = async (req, res) => {
  try {
    // body: { order: [{ id, order }] }
    const banner = await getOrCreateBanner();
    const { order } = req.body;
    order.forEach(({ id, order: ord }) => {
      const slide = banner.slides.id(id);
      if (slide) slide.order = ord;
    });
    await banner.save();
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/banner/toggle  — toggle whole banner active state
exports.toggleBanner = async (req, res) => {
  try {
    const banner = await getOrCreateBanner();
    banner.isActive = !banner.isActive;
    await banner.save();
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};