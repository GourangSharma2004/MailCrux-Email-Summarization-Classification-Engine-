import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiInbox, 
  FiMail, 
  FiStar, 
  FiSend, 
  FiArchive, 
  FiAlertOctagon, 
  FiTrash2, 
  FiUsers, 
  FiTag, 
  FiPieChart,
  FiPlusCircle
} from 'react-icons/fi';
import axios from 'axios';

const Sidebar = ({ isOpen }) => {
  const [categoryCounts, setCategoryCounts] = useState({
    Important: 0,
    Social: 0,
    Promotions: 0,
    Updates: 0,
    Forums: 0,
    Uncategorized: 0
  });

  useEffect(() => {
    const fetchEmailCounts = async () => {
      try {
        const { data } = await axios.get('/api/emails/categories/count');
        setCategoryCounts(data);
      } catch (err) {
        console.error('Failed to fetch email counts', err);
      }
    };

    fetchEmailCounts();
  }, []);

  return (
    <aside 
      className={`
        bg-white fixed inset-y-0 left-0 z-20 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        transition duration-200 ease-in-out
        w-60 flex flex-col border-r border-neutral-200
      `}
    >
      <div className="p-4">
        <NavLink
          to="/compose"
          className="btn-primary flex items-center justify-center rounded-full py-3 px-6 mb-4 w-full"
        >
          <FiPlusCircle className="mr-2" />
          <span>Compose</span>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          <NavItem to="/inbox" icon={<FiInbox />} label="Inbox" count={categoryCounts.total} />
          <NavItem to="/dashboard" icon={<FiPieChart />} label="Dashboard" />

          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Categories
            </h3>
          </div>
          <NavItem 
            to="/inbox?category=Important" 
            icon={<FiStar className="text-important" />} 
            label="Important" 
            count={categoryCounts.Important}
          />
          <NavItem 
            to="/inbox?category=Social" 
            icon={<FiUsers className="text-social" />} 
            label="Social" 
            count={categoryCounts.Social}
          />
          <NavItem 
            to="/inbox?category=Promotions" 
            icon={<FiTag className="text-promotions" />} 
            label="Promotions" 
            count={categoryCounts.Promotions}
          />
          <NavItem 
            to="/inbox?category=Updates" 
            icon={<FiMail className="text-updates" />} 
            label="Updates" 
            count={categoryCounts.Updates}
          />
          <NavItem 
            to="/inbox?category=Forums" 
            icon={<FiAlertOctagon className="text-forums" />} 
            label="Forums" 
            count={categoryCounts.Forums}
          />

          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Manage
            </h3>
          </div>
          <NavItem to="/sent" icon={<FiSend />} label="Sent" />
          <NavItem to="/archive" icon={<FiArchive />} label="Archive" />
          <NavItem to="/spam" icon={<FiAlertOctagon />} label="Spam" />
          <NavItem to="/trash" icon={<FiTrash2 />} label="Trash" />

          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Insights
            </h3>
          </div>
          <NavItem to="/summary" icon={<FiPieChart />} label="Summary" />
        </ul>
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label, count }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex items-center px-4 py-2 text-sm rounded-lg
          ${isActive ? 'bg-primary-light bg-opacity-10 text-primary font-medium' : 'text-neutral-700 hover:bg-neutral-100'}
        `}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{label}</span>
        {count > 0 && (
          <span className="bg-neutral-200 text-neutral-800 text-xs font-medium rounded-full px-2 py-1">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default Sidebar; 