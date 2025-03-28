import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({route, collapsed}) => {
  return (
    <div className='flex items-center mr-5'>
      <NavLink 
        to={route.path}
        className={({ isActive }) => isActive ? 'text-[#BC983E] font-semibold' : 'text-black'}
        end
      >
        {!collapsed && <span className='mr-5'>{route.name}</span>}
      </NavLink>
    </div>
  );
};

export default SidebarItem;