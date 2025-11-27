const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    // Test health endpoint
    const health = await axios.get(`${BASE_URL}/../api/health`);
    console.log('✓ Health check:', health.data);

    // Test demo login
    const demo = await axios.post(`${BASE_URL}/auth/demo-login`);
    console.log('✓ Demo login:', demo.data.message);
    
    const token = demo.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test get items
    const items = await axios.get(`${BASE_URL}/items`);
    console.log('✓ Get items:', items.data.items.length, 'items found');

    // Test get categories
    const categories = await axios.get(`${BASE_URL}/items/categories`);
    console.log('✓ Get categories:', categories.data);

    // Test user profile
    const profile = await axios.get(`${BASE_URL}/users/profile`, { headers });
    console.log('✓ User profile:', profile.data.firstName);

    // Test dashboard stats
    const stats = await axios.get(`${BASE_URL}/users/dashboard-stats`, { headers });
    console.log('✓ Dashboard stats:', stats.data);

    // Test user swaps
    const swaps = await axios.get(`${BASE_URL}/swaps/my-swaps`, { headers });
    console.log('✓ User swaps:', swaps.data.length, 'swaps found');

    console.log('\n🎉 All API endpoints working correctly!');
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPI();