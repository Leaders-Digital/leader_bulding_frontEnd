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
    <Layout className="min-h-screen">
      <Sidebar
        routes={routes}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout>
        <Header className="p-0 bg-white flex justify-between items-center shadow-md lg:block hidden">
          <div className="text-lg">My Application</div>
        </Header>

        <Content className="m-6 p-6 min-h-[280px] bg-white rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
