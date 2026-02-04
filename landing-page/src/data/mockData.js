// Mock data for SwapAm showcase
export const mockItems = [
  // Clothing Items
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition. Perfect for casual outings and layering. Size M.",
    category: "Clothing",
    condition: "Excellent",
    exchange_type: "swap",
    price: 8500,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"],
    owner: { id: 1, first_name: "Adebayo", last_name: "Johnson" },
    status: "available",
    views: 45,
    likes: [2, 3, 5],
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Elegant Black Dress",
    description: "Beautiful black cocktail dress, worn only once. Perfect for formal events. Size S.",
    category: "Clothing",
    condition: "Excellent",
    exchange_type: "sell",
    price: 12000,
    images: ["https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop"],
    owner: { id: 2, first_name: "Fatima", last_name: "Ibrahim" },
    status: "available",
    views: 67,
    likes: [1, 4, 6, 7],
    created_at: "2024-01-14T14:20:00Z"
  },
  {
    id: 3,
    title: "Nike Air Force 1 Sneakers",
    description: "White Nike Air Force 1 sneakers, size 42. Gently used, great for everyday wear.",
    category: "Clothing",
    condition: "Good",
    exchange_type: "swap",
    price: 15000,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"],
    owner: { id: 3, first_name: "Chinedu", last_name: "Okoro" },
    status: "available",
    views: 89,
    likes: [1, 2, 5, 8, 9],
    created_at: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    title: "Ankara Print Shirt",
    description: "Colorful Ankara print shirt, handmade. Perfect for cultural events. Size L.",
    category: "Clothing",
    condition: "Excellent",
    exchange_type: "sell",
    price: 6500,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"],
    owner: { id: 4, first_name: "Blessing", last_name: "Eze" },
    status: "available",
    views: 34,
    likes: [3, 6],
    created_at: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "MacBook Pro 2021",
    description: "MacBook Pro 13-inch, M1 chip, 8GB RAM, 256GB SSD. Excellent condition with charger.",
    category: "Electronics",
    condition: "Excellent",
    exchange_type: "sell",
    price: 450000,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"],
    owner: { id: 5, first_name: "Olumide", last_name: "Adeyemi" },
    status: "available",
    views: 234,
    likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    created_at: "2024-01-11T12:00:00Z"
  },
  {
    id: 6,
    title: "Engineering Mathematics Textbook",
    description: "Comprehensive engineering mathematics textbook. 5th edition, excellent condition.",
    category: "Books",
    condition: "Excellent",
    exchange_type: "swap",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop"],
    owner: { id: 6, first_name: "Funmi", last_name: "Adesanya" },
    status: "available",
    views: 45,
    likes: [1, 5, 9],
    created_at: "2024-01-10T10:20:00Z"
  }
];

export const mockCategories = [
  { id: 1, name: 'All Categories' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Electronics' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Furniture' },
  { id: 6, name: 'Sports' },
  { id: 7, name: 'Other' }
];