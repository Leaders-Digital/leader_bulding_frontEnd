/* eslint-disable no-unused-vars */

import React, { Children, useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HomeIcon, ProfileIcon } from "../Components/SideBar/icons";
import routes from "../Routes/DashboardRoutes"
import { UseAuth } from "../Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import ProspectHeader from "../Components/Headers/prospectHeader";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [outletKey, setOutletKey] = useState(Date.now());
  const location = useLocation();

  
  useEffect(() => {
    
    setOutletKey(Date.now());
    
    
   
  }, [location.pathname]);

  return (
    <Layout className="h-screen  bg-[#F4F5F9] overflow-y-auto">
      <Sidebar
        routes={routes}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout className=" flex-1 ">
        <Header className={`p-0 bg-transparent w-[93rem] mt-3 flex justify-between items-center shadow-md lg:block hidden transition-all duration-300 h-16 ${collapsed?`ml-7`:``}`}>
        <ProspectHeader/>
        </Header>
 
        <Content className=" px-6 flex-1  bg-[#F4F5F9] rounded-lg mt-0 mb-4 mr-5 mt-5 ">
          {/* Using a dynamic key forces unmount/remount */}
          <Outlet key={outletKey} />
        </Content>

      </Layout>
      <ToastContainer
       position="top-right" 
       autoClose={3000} 
       newestOnTop  
       closeOnClick 
       rtl={false} 
       pauseOnFocusLoss 
       draggable 
       pauseOnHover 
      />
    </Layout>
  );
};

export default MainLayout;
