/* eslint-disable no-unused-vars */

import React, { Children, useState } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HomeIcon, ProfileIcon } from "../Components/SideBar/icons";
import routes from "../Routes/DashboardRoutes"
import { UseAuth } from "../Contexts/AuthContext";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
console.log("rouuuuuut",routes)
  const{isAuthenticated}=UseAuth()
  console.log("auth from layout",isAuthenticated)
  return (
    <Layout className="h-screen  bg-[#F4F5F9]">
      <Sidebar
        routes={routes}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout className=" flex-1 ">
        <Header className="p-0 bg-[#F4F5F9] flex justify-between items-center shadow-md lg:block hidden h-16">
          <div className="text-lg">My Application</div>
        </Header>
 
        <Content className=" px-6 flex-1  bg-[#F4F5F9] rounded-lg mt-0 mb-4 mr-5 mt-11 ">

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
