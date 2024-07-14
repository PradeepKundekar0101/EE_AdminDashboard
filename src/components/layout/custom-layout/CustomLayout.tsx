import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { adminItems, mentorItems } from '../../../utils/menuItems';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../redux/slices/authSlice';

const { Header, Sider, Content } = Layout;

interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = user?.role === 'admin' ? adminItems : mentorItems;

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
  if(!user){
    return <div>
      
    </div>
  }

  return (
    <Layout style={{ maxHeight: '100vh', minHeight: '100vh', overflow: "hidden" }}>
      <Sider>
        <div className='text-2xl text-white text-center mt-4 mb-8 font-bold'>
          EarningEdge<span className='text-[#637CFF]'>.</span>
        </div>
        <Menu 
          theme='dark' 
          mode='inline' 
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            const item = menuItems.find((item:any) => item.key === key || (item.children && item.children.some((child:any) => child.key === key)));
            if (item) handleMenuClick(item);
          }}
        >
          {renderMenuItems(menuItems)}
        </Menu>
        <Button onClick={() => { dispatch(logout()) }} icon={<LogoutOutlined />} className="absolute bottom-2 bg-transparent border-red-300 text-red-300">
          Logout
        </Button>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px', overflowY: "scroll" }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
