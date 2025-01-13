/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HomeIcon, ProfileIcon } from "../Components/SideBar/icons";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const routes = [
    {
      path: "/home",
      name: "Home",
      icon: <Icon icon="hugeicons:advertisement" width="24" height="24" />,
      hovIcon:<Icon icon="hugeicons:activity-01" width="24" height="24" />
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <Icon icon="hugeicons:advertisement" width="24" height="24" />,
      hovIcon:<Icon icon="hugeicons:activity-01" width="24" height="24" />
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <Icon icon="hugeicons:advertisement" width="24" height="24" />,
      hovIcon:<Icon icon="hugeicons:activity-01" width="24" height="24" />
    },
  ];

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
