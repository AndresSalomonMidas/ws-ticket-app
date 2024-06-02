import { useContext } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/login">Login</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/queue">Queue</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: <Link to="/create-ticket">Create ticket</Link>,
  },
];

const MainLayout = () => {
  const { isSidebarOpen } = useContext(SidebarContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsedWidth={0} breakpoint="md" hidden={!isSidebarOpen}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
