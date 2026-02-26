const Service = require('../models/Service');
const { deleteFromCloudinary, getPublicIdFromUrl, isCloudinaryUrl } = require('../middleware/uploadMiddleware');

// ─── GET all services (public) ───────────────────────────────────────────────
exports.getAllServices = async (req, res) => {
  try {
    console.log('📊 [GET ALL SERVICES] Starting query...');
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    console.log('✅ [GET ALL SERVICES] Found:', services.length, 'services');
    res.json({ success: true, data: services });
  } catch (err) {
    console.error('❌ [GET ALL SERVICES] Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET all services for admin (includes inactive) ──────────────────────────
exports.getAllServicesAdmin = async (req, res) => {
  try {
    console.log('📊 [GET ALL SERVICES ADMIN] Starting query...');
    const services = await Service.find().sort({ order: 1 });
    console.log('✅ [GET ALL SERVICES ADMIN] Found:', services.length, 'services');
    res.json({ success: true, data: services });
  } catch (err) {
    console.error('❌ [GET ALL SERVICES ADMIN] Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET single service by slug (public) ─────────────────────────────────────
exports.getServiceBySlug = async (req, res) => {
  try {
    console.log('🔍 [GET BY SLUG] Looking for slug:', req.params.slug);
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      console.log('⚠️ [GET BY SLUG] Service not found');
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    console.log('✅ [GET BY SLUG] Found service:', service.title);
    res.json({ success: true, data: service });
  } catch (err) {
    console.error('❌ [GET BY SLUG] Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET single service by ID (admin) ────────────────────────────────────────
exports.getServiceById = async (req, res) => {
  try {
    console.log('🔍 [GET BY ID] Looking for ID:', req.params.id);
    const service = await Service.findById(req.params.id);
    if (!service) {
      console.log('⚠️ [GET BY ID] Service not found');
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    console.log('✅ [GET BY ID] Found service:', service.title);
    res.json({ success: true, data: service });
  } catch (err) {
    console.error('❌ [GET BY ID] Error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── CREATE service ───────────────────────────────────────────────────────────
exports.createService = async (req, res) => {
  try {
    console.log('🆕 [CREATE SERVICE] Starting creation...');
    console.log('📝 [CREATE SERVICE] Request body keys:', Object.keys(req.body));
    console.log('🖼️ [CREATE SERVICE] Files received:', req.files ? Object.keys(req.files) : 'none');
    
    const body = { ...req.body };

    // Parse JSON strings sent from FormData
    if (typeof body.keyFeatures === 'string') {
      try { 
        body.keyFeatures = JSON.parse(body.keyFeatures);
        // Filter out empty strings
        body.keyFeatures = body.keyFeatures.filter(f => f && f.trim());
        console.log('✅ [CREATE SERVICE] Parsed keyFeatures:', body.keyFeatures.length, 'items');
      } catch (e) { 
        console.log('⚠️ [CREATE SERVICE] Failed to parse keyFeatures, using empty array');
        body.keyFeatures = []; 
      }
    }
    
    if (typeof body.benefits === 'string') {
      try { 
        body.benefits = JSON.parse(body.benefits); 
        console.log('✅ [CREATE SERVICE] Parsed benefits:', body.benefits.length, 'items');
      } catch (e) { 
        console.log('⚠️ [CREATE SERVICE] Failed to parse benefits, using empty array');
        body.benefits = []; 
      }
    }
    
    if (typeof body.faqs === 'string') {
      try { 
        body.faqs = JSON.parse(body.faqs); 
        console.log('✅ [CREATE SERVICE] Parsed faqs:', body.faqs.length, 'items');
      } catch (e) { 
        console.log('⚠️ [CREATE SERVICE] Failed to parse faqs, using empty array');
        body.faqs = []; 
      }
    }

    // Parse boolean - FormData sends strings
    body.isActive = body.isActive === 'true' || body.isActive === true;
    console.log('🔘 [CREATE SERVICE] isActive set to:', body.isActive);

    // Handle image uploads from Cloudinary
    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        body.heroImage = req.files.heroImage[0].path;
        console.log('🖼️ [CREATE SERVICE] Hero image uploaded:', body.heroImage);
      }
      if (req.files.detailImage1 && req.files.detailImage1[0]) {
        body.detailImage1 = req.files.detailImage1[0].path;
        console.log('🖼️ [CREATE SERVICE] Detail image 1 uploaded:', body.detailImage1);
      }
      if (req.files.detailImage2 && req.files.detailImage2[0]) {
        body.detailImage2 = req.files.detailImage2[0].path;
        console.log('🖼️ [CREATE SERVICE] Detail image 2 uploaded:', body.detailImage2);
      }
    }

    console.log('💾 [CREATE SERVICE] Creating service with data:', {
      title: body.title,
      slug: body.slug,
      isActive: body.isActive,
      hasHeroImage: !!body.heroImage,
      keyFeaturesCount: body.keyFeatures?.length || 0,
      benefitsCount: body.benefits?.length || 0,
      faqsCount: body.faqs?.length || 0
    });

    const service = new Service(body);
    await service.save();
    
    console.log('✅ [CREATE SERVICE] Service saved successfully! ID:', service._id);

    await updateServiceLinks();
    console.log('🔗 [CREATE SERVICE] Service links updated');

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    console.error('❌ [CREATE SERVICE] Error:', err.message);
    console.error('❌ [CREATE SERVICE] Error stack:', err.stack);
    
    // Clean up uploaded images if service creation failed
    if (req.files) {
      const cleanup = async () => {
        for (const field of ['heroImage', 'detailImage1', 'detailImage2']) {
          if (req.files[field] && req.files[field][0]) {
            await deleteOldImage(req.files[field][0].path);
          }
        }
      };
      cleanup().catch(console.error);
    }
    
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── UPDATE service ───────────────────────────────────────────────────────────
exports.updateService = async (req, res) => {
  try {
    console.log('✏️ [UPDATE SERVICE] Starting update for ID:', req.params.id);
    
    const existing = await Service.findById(req.params.id);
    if (!existing) {
      console.log('⚠️ [UPDATE SERVICE] Service not found');
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    console.log('📝 [UPDATE SERVICE] Current service:', existing.title);
    const body = { ...req.body };

    // Parse JSON fields
    if (typeof body.keyFeatures === 'string') {
      try { 
        body.keyFeatures = JSON.parse(body.keyFeatures);
        body.keyFeatures = body.keyFeatures.filter(f => f && f.trim());
      } catch { 
        body.keyFeatures = []; 
      }
    }
    
    if (typeof body.benefits === 'string') {
      try { body.benefits = JSON.parse(body.benefits); } catch { body.benefits = []; }
    }
    
    if (typeof body.faqs === 'string') {
      try { body.faqs = JSON.parse(body.faqs); } catch { body.faqs = []; }
    }

    body.isActive = body.isActive === 'true' || body.isActive === true;

    // Handle image updates
    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        await deleteOldImage(existing.heroImage);
        body.heroImage = req.files.heroImage[0].path;
        console.log('🖼️ [UPDATE SERVICE] Hero image updated');
      }
      if (req.files.detailImage1 && req.files.detailImage1[0]) {
        await deleteOldImage(existing.detailImage1);
        body.detailImage1 = req.files.detailImage1[0].path;
        console.log('🖼️ [UPDATE SERVICE] Detail image 1 updated');
      }
      if (req.files.detailImage2 && req.files.detailImage2[0]) {
        await deleteOldImage(existing.detailImage2);
        body.detailImage2 = req.files.detailImage2[0].path;
        console.log('🖼️ [UPDATE SERVICE] Detail image 2 updated');
      }
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    console.log('✅ [UPDATE SERVICE] Service updated successfully');
    await updateServiceLinks();
    console.log('🔗 [UPDATE SERVICE] Service links updated');

    res.json({ success: true, data: service });
  } catch (err) {
    console.error('❌ [UPDATE SERVICE] Error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE service ───────────────────────────────────────────────────────────
exports.deleteService = async (req, res) => {
  try {
    console.log('🗑️ [DELETE SERVICE] Deleting service ID:', req.params.id);
    
    const service = await Service.findById(req.params.id);
    if (!service) {
      console.log('⚠️ [DELETE SERVICE] Service not found');
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    console.log('🗑️ [DELETE SERVICE] Deleting service:', service.title);

    // Delete all associated Cloudinary images
    await deleteOldImage(service.heroImage);
    await deleteOldImage(service.detailImage1);
    await deleteOldImage(service.detailImage2);

    await Service.findByIdAndDelete(req.params.id);
    console.log('✅ [DELETE SERVICE] Service deleted successfully');

    await updateServiceLinks();
    console.log('🔗 [DELETE SERVICE] Service links updated');

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    console.error('❌ [DELETE SERVICE] Error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── REORDER services ─────────────────────────────────────────────────────────
exports.reorderServices = async (req, res) => {
  try {
    console.log('🔄 [REORDER SERVICES] Starting reorder...');
    const { orderedIds } = req.body;
    
    if (!orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'Invalid orderedIds array' });
    }
    
    console.log('📝 [REORDER SERVICES] Processing', orderedIds.length, 'services');
    
    for (let i = 0; i < orderedIds.length; i++) {
      await Service.findByIdAndUpdate(orderedIds[i], { order: i });
    }
    
    await updateServiceLinks();
    console.log('✅ [REORDER SERVICES] Services reordered successfully');
    
    res.json({ success: true, message: 'Services reordered successfully' });
  } catch (err) {
    console.error('❌ [REORDER SERVICES] Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function deleteOldImage(imageUrl) {
  if (!imageUrl || !isCloudinaryUrl(imageUrl)) return;
  try {
    const publicId = getPublicIdFromUrl(imageUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId, 'image');
      console.log('🗑️ [DELETE IMAGE] Deleted from Cloudinary:', publicId);
    }
  } catch (err) {
    console.error('❌ [DELETE IMAGE] Failed to delete from Cloudinary:', err.message);
  }
}

async function updateServiceLinks() {
  console.log('🔗 [UPDATE LINKS] Updating prev/next service links...');
  const services = await Service.find({ isActive: true }).sort({ order: 1 });
  console.log('🔗 [UPDATE LINKS] Processing', services.length, 'active services');
  
  for (let i = 0; i < services.length; i++) {
    services[i].prevService = i > 0 ? services[i - 1].slug : null;
    services[i].nextService = i < services.length - 1 ? services[i + 1].slug : null;
    await services[i].save();
  }
  
  console.log('✅ [UPDATE LINKS] All service links updated');
}