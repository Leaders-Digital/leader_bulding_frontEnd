/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Button, Menu, Layout } from "antd";
import '../../Styles/sidebarItem.css'
import SidebarItem from "./SidebarItem"; // Import SidebarItem
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom";
import SystemIcon from "../Icons/SystemIcon";
const { Sider } = Layout;

const Sidebar = ({ routes, collapsed, setCollapsed }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [hoverdItem ,setHoveredItem] =useState(null)
  console.log("Screen Width: " + window.innerWidth);
console.log("Screen Height: " + window.innerHeight);
const handleHover =(key)=>{setHoveredItem(key)}
const handleLeave =()=>{setHoveredItem(null)}
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  
  return (
    <div className="bg-white mt-6 rounded-r-2xl mr-6">
      <Sider
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
            <div className="flex justify-center items-center bg-Golden w-9 h-10 rounded-lg transition-all duration-700">
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
            collapsed ? "top-[800px] left-6" : "top-[153px] left-[300px]"
          } z-10 transition-all duration-300`}
        />
        <div className="p-4 flex justify-between items-center bg-white rounded-t-2xl">
          <h2
            className={`text-xl font-bold text-black bg-white ${
              collapsed ? "hidden" : ""
            }`}
          >
            Logo
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="text-black bg-white"
          
        >

{routes.map((route) => (
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
                color={
                  hoverdItem === route.path
                    ? "#F7D47A" 
                    : route.path === location.pathname
                    ? "#BC983E" 
                    : "#3A3541" 
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
