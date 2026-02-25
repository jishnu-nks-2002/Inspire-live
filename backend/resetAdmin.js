require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected:', mongoose.connection.host);

  // Delete existing admin
  await User.deleteOne({ email: 'admin@blog.com' });
  console.log('Old admin deleted');

  // Create fresh
  await User.create({
    name: 'Super Admin',
    email: 'admin@blog.com',
    password: 'admin123',
    role: 'admin',
    isActive: true,
  });
  console.log('✅ New admin created: admin@blog.com / admin123');

  await mongoose.disconnect();
  process.exit(0);
}

reset().catch(err => { console.error(err); process.exit(1); });