import React, { useState } from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
import { adminItems, mentorItems } from "../../../utils/menuItems";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { logout } from "../../../redux/slices/authSlice";
import EditProfile from "../../modals/edit-profile";

const { Header, Sider, Content } = Layout;

interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = user?.role === "admin" ? adminItems : mentorItems;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = (item: { key: string; path: string }) => {
    navigate(item.path);
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  if (!user) {
    return <div></div>;
  }

  const items: MenuProps["items"] = [
    {
      label: "Username: " + user.firstName + " " + user.lastName,
      key: "0",
    },
    {
      label: "Email: " + user.email,
      key: "1",
    },
    {
      label: (
        <button className="" onClick={showModal}>
          Edit profile
        </button>
      ),
      key: "3",
    },
    {
      label: <button className="text-red-500 font-bold">Logout</button>,
      key: "4",
      onClick: () => {dispatch(logout());navigate("/login")},
    },
  ];

  return (
    <Layout
      style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "hidden" }}
    >
      <Sider className="bg-dark-blue" style={{ background: "#262633" }}>
        <div className="text-2xl text-white text-center mt-4 mb-8 font-bold">
          EarningEdge<span className="text-[#637CFF]">.</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            const item = menuItems.find(
              (item: any) =>
                item.key === key ||
                (item.children &&
                  item.children.some((child: any) => child.key === key))
            );
            if (item) handleMenuClick(item);
          }}
          style={{ background: "#262633" }}
        >
          {renderMenuItems(menuItems)}
        </Menu>

      </Sider>

      <Layout>
        <Header
          className="flex justify-end items-center pr-4"
          style={{ background: "#fff" }}
        >
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="cursor-pointer"
          >
            <Avatar size={40}  src={user.profile_image_url || "/avatar.png"}  />
          </Dropdown>
        </Header>
        <Content style={{ overflowY: "scroll" }}>
          <div style={{ minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>

      <EditProfile
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Layout>
  );
};

export default CustomLayout;