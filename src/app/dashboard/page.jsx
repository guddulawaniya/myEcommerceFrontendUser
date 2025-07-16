'use client';

import Sidebar from './sidebar/page'; 
import Header from './header/page';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [orderStats, setOrderStats] = useState({
    ongoing: 0,
    delivered: 0,
    cancelled: 0,
    total: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const res = {
        ongoing: 2,
        delivered: 5,
        cancelled: 1,
        total: 8,
      };
      setOrderStats(res);
    }
    fetchStats();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100"> {/* Changed from flex to relative */}
      {/* Sidebar with higher z-index */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative lg:ml-64"> {/* Adjust margin to match sidebar width */}
        {/* Header with lower z-index */}
        <Header />
        
        {/* Main Content */}
        <main className="pt-16 px-4"> {/* Added padding-top for header */}
          {/* Your content here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;