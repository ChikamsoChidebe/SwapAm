const User = require('../models/User');
const Item = require('../models/Item');

const seedData = async () => {
  try {
    // Create demo users
    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@university.edu',
        password: 'password123',
        university: 'State University',
        isVerified: true,
        rating: 4.5,
        totalSwaps: 12,
        campusPoints: 150
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@university.edu',
        password: 'password123',
        university: 'State University',
        isVerified: true,
        rating: 4.8,
        totalSwaps: 8,
        campusPoints: 120
      }
    ]);

    // Create demo items
    await Item.insertMany([
      {
        title: 'Calculus Textbook',
        description: 'Used calculus textbook in good condition',
        category: 'Books',
        condition: 'good',
        exchangeType: 'swap',
        location: 'Campus Library',
        owner: users[0]._id,
        wantedItems: ['Physics textbook']
      },
      {
        title: 'iPhone Charger',
        description: 'Brand new iPhone charger, never used',
        category: 'Electronics',
        condition: 'new',
        exchangeType: 'sell',
        price: 25,
        location: 'Dorm Building A',
        owner: users[1]._id
      }
    ]);

    console.log('✓ Demo data seeded successfully');
  } catch (error) {
    console.error('❌ Seed data failed:', error);
  }
};

module.exports = { seedData };