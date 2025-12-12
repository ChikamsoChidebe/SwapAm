// Utility functions for handling images and placeholders

export const generatePlaceholderImage = (name, size = 200) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Generate color based on name
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  
  // Fill background
  ctx.fillStyle = colors[colorIndex];
  ctx.fillRect(0, 0, size, size);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = `${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size / 2);
  
  return canvas.toDataURL();
};

export const getImageUrl = (imagePath, itemName = 'Item') => {
  if (!imagePath) {
    return generatePlaceholderImage(itemName);
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the backend URL
  const backendUrl = 'https://swapam-backend-9zqk.onrender.com';
  return `${backendUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export const handleImageError = (event, itemName = 'Item') => {
  event.target.src = generatePlaceholderImage(itemName);
};