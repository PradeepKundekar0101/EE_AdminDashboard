import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Modal } from "antd";
import { adminItems, mentorItems } from "../../../utils/menuItems";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../../../redux/slices/authSlice";
import useUpdateData from "../../../hooks/useUpdateData";

const { Header, Sider, Content } = Layout;

interface IFormData {
  displayName: string;
  location: string;
  title: string;
  aboutMe: string;
  profile: string;
};


interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = user?.role === "admin" ? adminItems : mentorItems;

  // Modal functions
  // const { data, error, putData } = useUpdateData<IFormData, IFormData>('');
  const { putData: updateProfile, error: profileError } = useUpdateData<FormData, Partial<IFormData>>('/user/profile-image');
  const { putData: updateDetails, error: userError } = useUpdateData<Omit<IFormData, 'profile'>, Partial<IFormData>>('/user/update/user-details');


  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const initialFormData = {
    displayName: user?.firstName + " " + user?.lastName,
    location: user?.location || "",
    title: user?.title || "",
    aboutMe: user?.aboutMe || "",
    profile: user?.profile || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const profileChanged = formData.profile instanceof File;
    const otherDetailsChanged = Object.keys(initialFormData).some(
      (key) =>
        key !== 'profile' &&
        initialFormData[key as keyof IFormData] !== formData[key as keyof IFormData]
    );
    setIsChanged(profileChanged || otherDetailsChanged);
  }, [formData, initialFormData]);


  const showModal = () => {
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

const handleOk = async () => {
  try {
    let updatedData: Partial<IFormData> = {};

    // Check if profile image has changed
    if (formData.profile instanceof File) {
      const profileFormData = new FormData();
      profileFormData.append('profile', formData.profile);
      const profileData = await updateProfile(profileFormData);
      updatedData = { ...updatedData, ...profileData };
    }

    // Check if other details have changed
    const detailsChanged = Object.keys(initialFormData).some(key => 
      key !== 'profile' && initialFormData[key as keyof IFormData] !== formData[key as keyof IFormData]
    );

    if (detailsChanged) {
      const { profile, ...detailsData } = formData;
      const newDetails = await updateDetails(detailsData);
      updatedData = { ...updatedData, ...newDetails };
    }

    if (Object.keys(updatedData).length > 0) {
      // Update your Redux store or local state with the new user data
      // dispatch(updateUser(updatedData));
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const handleMenuClick = (item: { key: string; path: string }) => {
    navigate(item.path);
  };

  if (profileError) {
    //@ts-ignore
    message.error(profileError.response?.data?.message || 'An error occurred. Please try again.');
  }
  if (userError) {
    //@ts-ignore
    message.error(userError.response?.data?.message || 'An error occurred. Please try again.');
  }

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
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          icon={<LogoutOutlined />}
          className="absolute bottom-2 bg-transparent border-red-300 text-red-300"
        >
          Logout
        </Button>
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
            <Avatar size={45} icon={<UserOutlined />} />
          </Dropdown>

          <Modal
            title="Edit your profile"
            open={isModalOpen}
            onOk={handleOk}
            okText="Save changes"
            onCancel={handleCancel}
            okButtonProps={{ disabled: !isChanged }}
          >
            <hr />
            <p className="text-xl font-semibold">Public information</p>
            <div className="p-2 bg-stone-100 rounded-md">
              <div>
                <p className="text-base font-semibold">Profile image</p>
                <img
                  src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                  alt=""
                  height={150}
                  width={150}
                />
                <input 
                type="file" 
                name="profile" 
                onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-base font-semibold">Display name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-base font-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-base font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-base font-semibold">About me</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-md"
                ></textarea>
              </div>
            </div>
          </Modal>
        </Header>
        <Content style={{ overflowY: "scroll" }}>
          <div style={{ minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
