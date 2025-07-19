// src/components/SidebarLayout.jsx
import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const SidebarLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" style={{ color: "#fff", padding: "16px", fontSize: "18px" }}>
          Hospital System
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin">Admin Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/doctor" icon={<UserOutlined />}>
            <Link to="/doctor">Doctor Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/patient" icon={<FileTextOutlined />}>
            <Link to="/patient">Patient History</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
