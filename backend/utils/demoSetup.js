const User = require('../models/User');

const createDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingDemo = await User.findOne({ email: 'demo@swapam.com' });
    if (existingDemo) {
      console.log('Demo user already exists');
      return existingDemo;
    }

    // Create demo user
    const demoUser = new User({
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@swapam.com',
      password: 'demo123',
      university: 'Demo University',
      studentId: 'DEMO001',
      isVerified: true,
      rating: 4.5,
      totalSwaps: 15,
      campusPoints: 250
    });

    await demoUser.save();
    console.log('Demo user created successfully');
    return demoUser;
  } catch (error) {
    console.error('Error creating demo user:', error);
    throw error;
  }
};

module.exports = { createDemoUser };