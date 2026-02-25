require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Blog = require('./src/models/Blog');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not set in .env file!');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('✅ MongoDB Connected:', mongoose.connection.host);
};

const seed = async () => {
  await connectDB();

  // ── Create admin user ──────────────────────────────────────────────────────
  try {
    const adminExists = await User.findOne({ email: 'admin@blog.com' });

    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@blog.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Admin user created!');
      console.log('   📧 Email:    admin@blog.com');
      console.log('   🔑 Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists (admin@blog.com)');
    }
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
  }

  // ── Seed sample blog posts ─────────────────────────────────────────────────
  try {
    const existingCount = await Blog.countDocuments();

    if (existingCount === 0) {
      const sampleBlogs = [
        {
          title: 'Innovative Solutions for every Business Success',
          desc: 'Whether you\'re looking to streamline operations, enhance customer experiences, or explore new market opportunities, our tailored solutions are designed to empower your business.',
          desc1: 'As businesses unlock growth opportunities in the digital age, harnessing the power of cloud computing has become essential.',
          desc2: 'In this blog, we will delve into the strategies, best practices, and key factors that accelerate business growth.',
          category: 'Corporate',
          tags: ['Corporate', 'Business'],
          status: 'Tutorial',
          author: 'Admin',
          author_role: 'admin',
          isPublished: true,
          isFeatured: true,
        },
        {
          title: 'Harnessing Digital Transform a Roadmap for Businesses',
          desc: 'The curve. Whether you\'re looking to streamline operations or explore new market opportunities.',
          category: 'Business',
          tags: ['Business', 'Design'],
          status: 'TIPS',
          author: 'Admin',
          author_role: 'admin',
          isPublished: true,
          isFeatured: false,
        },
        {
          title: 'Mastering Change Management Lessons for Businesses',
          desc: 'Our tailored solutions are designed to empower your business to achieve unparalleled success.',
          category: 'Consulting',
          tags: ['Design', 'Marketing', 'Strategy'],
          status: 'TIPS',
          author: 'Admin',
          author_role: 'admin',
          isPublished: true,
          isFeatured: false,
        },
      ];

      await Blog.insertMany(sampleBlogs);
      console.log(`✅ Seeded ${sampleBlogs.length} sample blog posts`);
    } else {
      console.log(`ℹ️  Skipping blog seed (${existingCount} blogs already exist)`);
    }
  } catch (err) {
    console.error('❌ Failed to seed blogs:', err.message);
  }

  await mongoose.disconnect();
  console.log('\n✅ Seeding complete! You can now login at http://localhost:5173');
  console.log('   📧 admin@blog.com  |  🔑 admin123\n');
  process.exit(0);
};

seed().catch(err => {
  console.error('❌ Fatal seeding error:', err.message);
  process.exit(1);
});