

import { Link, useLocation } from 'react-router-dom'

const SidebarItem = ({route,collapsed}) => {
  
  const location= useLocation()

  return (
 
    <div className='flex items-center mr-5 '>

      <Link  to={route.path}>
      {!collapsed && <span className='mr-5'>{route.name}</span>}
      </Link>
    </div>
   
  )
}

export default SidebarItem