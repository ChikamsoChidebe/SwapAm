import React from 'react';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const ItemCard = ({ item, onViewDetails, onEdit, onDelete, showActions = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <img
        src={getImageUrl(item.images?.[0] || item.imageUrl, item.title || item.itemName)}
        alt={item.title || item.itemName}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => handleImageError(e, item.title || item.itemName)}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{item.title || item.itemName}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        
        {((item.exchange_type === 'sell' || item.exchangeType === 'sell') && (item.price || item.estimatedValue)) && (
          <p className="text-lg font-bold text-[#137C5C] mb-2">
            ₦{item.price || item.estimatedValue}
          </p>
        )}
        
        <div className="flex justify-between items-center mb-3">
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.exchange_type === 'sell' || item.exchangeType === 'sell' ? 'bg-green-100 text-green-800' :
            item.exchange_type === 'swap' || item.exchangeType === 'swap' ? 'bg-blue-100 text-blue-800' :
            item.exchange_type === 'donate' || item.exchangeType === 'donate' ? 'bg-purple-100 text-purple-800' :
            item.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {item.exchange_type || item.exchangeType || item.status}
          </span>
          
          {item.createdAt && (
            <span className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {showActions ? (
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit && onEdit(item)}
              className="flex-1 px-3 py-2 bg-[#137C5C] text-white rounded-lg text-sm hover:bg-[#0f5132]"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete && onDelete(item._id || item.id)}
              className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onViewDetails && onViewDetails(item._id || item.id)}
            className="w-full px-4 py-2 bg-[#fdd835] text-black rounded-lg hover:bg-[#f9c74f] transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;