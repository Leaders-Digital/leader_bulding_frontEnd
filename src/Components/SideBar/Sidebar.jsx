/* eslint-disable no-unused-vars */
 

import React, { useState, useEffect, useRef } from "react";
import { Button, Menu, Layout, Input } from "antd";
import '../../Styles/sidebarItem.css'
import SidebarItem from "./SidebarItem"; // Import SidebarItem
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom";
import SystemIcon from "../Icons/SystemIcon";
import logo from "../../assets/logo_building.png"
const { Sider } = Layout;

const Sidebar = ({ routes, collapsed, setCollapsed }) => {

  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [hoverdItem ,setHoveredItem] =useState(null)
 const siderRef=useRef(null)
const handleHover =(key)=>{setHoveredItem(key)}
const handleLeave =()=>{setHoveredItem(null)}
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);
const getIconColor = (routePath)=>{
  if (hoverdItem === routePath) {
    return "#F7D47A";
  }
  if (routePath === location.pathname) {
    return "#BC983E";
  }
  return "#3A3541";
}
  
  return (
    <div className="bg-white mt-6 rounded-r-2xl mr-6">
      <Sider
      ref={siderRef}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={collapsed ? 56 : 320}
        
        className="bg-white"
        style={{
          backgroundColor: "white",
          borderTopRightRadius: "12px",
          position: "relative",
        }}
      >
        <Button
          type="text"
          icon={
            <div className="flex justify-center items-center bg-Golden w-8 h-8 rounded-lg transition-all duration-700">
              {collapsed ? (
                <Icon
                  icon="hugeicons:arrow-right-01"
                  width="38"
                  height="40"
                  style={{ color: "#000" }}
                />
              ) : (
                <Icon
                  icon="hugeicons:arrow-left-01"
                  width="38"
                  height="40"
                  style={{ color: "#000" }}
                />
              )}
            </div>
          }
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute rounded-lg ${
            collapsed ? "top-[43rem] left-6" : "top-28 left-[300px]"
          } z-10 transition-all duration-300`}
         
        />
        <div className="p-4 flex justify-center items-center bg-white rounded-t-2xl mb-5">
         <img src={logo} alt="logo" className={`${collapsed?"h-6 w-6 ml-2 translate-x-0":"h-28 w-26 hover:filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"}`} />
        </div>
        <div  className=" w-full h-10 flex flex-row items-center justify-center px-4 mt-2">
          {collapsed?<Icon icon="hugeicons:search-01" width="20" height="20"  style={{color: "#3A3541"}}  />:<Input
          placeholder="Search ..."
        
          prefix={<Icon icon="hugeicons:search-01" width="10" height="10"  style={{color: "#3A3541"}}  />}
            className=" ml-4 mb-4"
          />}
          
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="text-black bg-white"
          
        >

{routes[0].children.map((route) => (
  route.children && route.children.length>0 ?(<Menu.SubMenu 
           key={route.path}
           title={
            <div className="flex flex-row items-center space-x-2 "  onMouseEnter={()=>handleHover(route.path)} onMouseLeave={handleLeave}>
              <div className="h-6 w-6"> <SystemIcon
               icon={route.icon}
               color={getIconColor(route.path)}
               
               /></div>
              

{collapsed ? null : <span className="mr-2">{route.name}</span>} 
            </div>
           }
           >
           {route.children.map((child)=>(
             child.name&&
            <Menu.Item key={child.path} title={child.name}>
              <div className=" flex flex-row items-center space-x-2"> <span className="text-black">•</span><SidebarItem route={child} collapsed={collapsed} /> </div>
           

            </Menu.Item>
           ))}
           </Menu.SubMenu>):
           <Menu.Item
           key={route.path}
           onMouseEnter={() => handleHover(route.path)}
           onMouseLeave={handleLeave}
           className="flex flex-row items-center"
         >
           <div className="flex flex-row items-center space-x-3 ">
             <div className="h-6 w-6" >
           <SystemIcon
             icon={route.icon}
             color={getIconColor(route.path)
             }
             
           /></div>
           <SidebarItem route={route} collapsed={collapsed} /></div>

        
           
         </Menu.Item>
          
           
          ))}
        </Menu>
         
      </Sider>
    </div>
  );
};

export default Sidebar;
