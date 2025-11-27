import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';

const MySwaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo data
    const demoSwaps = [
      {
        id: 1,
        item: 'Calculus Textbook',
        partner: 'John Doe',
        status: 'pending',
        date: '2024-01-15',
        type: 'swap'
      },
      {
        id: 2,
        item: 'iPhone Charger',
        partner: 'Jane Smith',
        status: 'completed',
        date: '2024-01-10',
        type: 'sell'
      }
    ];
    setSwaps(demoSwaps);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137C5C]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Swaps</h1>
        
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {swaps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No swaps yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {swaps.map((swap) => (
                  <div key={swap.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{swap.item}</h3>
                        <p className="text-sm text-gray-500">with {swap.partner}</p>
                        <p className="text-xs text-gray-400">{swap.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        swap.status === 'completed' ? 'bg-green-100 text-green-800' :
                        swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {swap.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MySwaps;