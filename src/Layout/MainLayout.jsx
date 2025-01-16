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
    <Layout className="h-screen overflow-hidden">
      <Sidebar
        routes={routes}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout className=" flex-1 overflow-hidden">
        <Header className="p-0 bg-white flex justify-between items-center shadow-md lg:block hidden h-16">
          <div className="text-lg">My Application</div>
        </Header>
       <div className="h-28 w-full">
hiiiiiiiiiiiiiiiiiiiiiiiii
       </div>
        <Content className=" p-6 flex-1 overflow-auto bg-white rounded-lg mb-4 mr-7 m-2  ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
