import React, { useState } from 'react';

export default function AgentMap() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  // Mock agent data with real locations
  const agents = [
    {
      id: 1,
      name: 'Adebayo Ogundimu',
      phone: '+234 801 234 5678',
      location: 'University of Lagos, Akoka',
      coordinates: { lat: 6.5158, lng: 3.3894 },
      rating: 4.8,
      completedDeliveries: 156,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      status: 'available',
      specialties: ['Electronics', 'Books'],
      responseTime: '15 mins'
    },
    {
      id: 2,
      name: 'Fatima Ibrahim',
      phone: '+234 802 345 6789',
      location: 'University of Ibadan, Ibadan',
      coordinates: { lat: 7.3775, lng: 3.9470 },
      rating: 4.9,
      completedDeliveries: 203,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      status: 'busy',
      specialties: ['Clothing', 'Furniture'],
      responseTime: '30 mins'
    },
    {
      id: 3,
      name: 'Chinedu Okoro',
      phone: '+234 803 456 7890',
      location: 'Ahmadu Bello University, Zaria',
      coordinates: { lat: 11.1515, lng: 7.6898 },
      rating: 4.7,
      completedDeliveries: 89,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      status: 'available',
      specialties: ['Sports Equipment', 'Electronics'],
      responseTime: '20 mins'
    },
    {
      id: 4,
      name: 'Blessing Eze',
      phone: '+234 804 567 8901',
      location: 'University of Nigeria, Nsukka',
      coordinates: { lat: 6.8587, lng: 7.3967 },
      rating: 4.6,
      completedDeliveries: 134,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      status: 'available',
      specialties: ['Books', 'Study Materials'],
      responseTime: '25 mins'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Campus Delivery Agents</h2>
          <p className="text-gray-600">Trusted agents available for secure item delivery</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {agents.filter(a => a.status === 'available').length} Available Now
          </span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-64 sm:h-80 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 font-medium">Interactive Campus Map</p>
            <p className="text-sm text-gray-400">Real-time agent locations</p>
          </div>
        </div>
        
        {/* Agent Markers */}
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transform transition-transform hover:scale-110 ${
              agent.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 2) * 20}%`
            }}
            onClick={() => setSelectedAgent(agent)}
          >
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-full h-full rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
              agent.status === 'available' ? 'bg-green-400' : 'bg-yellow-400'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Agent List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAgent?.id === agent.id ? 'border-[#137C5C] bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  agent.status === 'available' ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{agent.name}</h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{agent.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{agent.location}</p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {agent.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{agent.completedDeliveries} deliveries</span>
                  <span className={`font-medium ${
                    agent.status === 'available' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {agent.status === 'available' ? `Available • ${agent.responseTime}` : 'Busy'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Agent Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Contact Agent</h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedAgent.avatar}
                alt={selectedAgent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{selectedAgent.name}</h4>
                <p className="text-sm text-gray-600">{selectedAgent.location}</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-700">{selectedAgent.rating} • {selectedAgent.completedDeliveries} deliveries</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-[#137C5C] text-white py-3 px-4 rounded-lg hover:bg-[#0f5132] transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {selectedAgent.phone}
              </button>
              
              <button className="w-full border border-[#137C5C] text-[#137C5C] py-3 px-4 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Send Message
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Response Time:</strong> {selectedAgent.responseTime}<br/>
                <strong>Specialties:</strong> {selectedAgent.specialties.join(', ')}<br/>
                <strong>Status:</strong> <span className={selectedAgent.status === 'available' ? 'text-green-600' : 'text-yellow-600'}>
                  {selectedAgent.status === 'available' ? 'Available Now' : 'Currently Busy'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}