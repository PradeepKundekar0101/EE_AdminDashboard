import React, { ReactNode } from 'react'
import { Layout, Menu } from 'antd'
import Audio from '../../../assets/images/sidebar/audio.svg'
import Applications from '../../../assets/images/sidebar/applications.svg'
import NewProducts from '../../../assets/images/sidebar/new-products.svg'
import YourTickets from '../../../assets/images/sidebar/your-tickets.svg'
import Security from '../../../assets/images/sidebar/security.svg'
import YourFinances from '../../../assets/images/sidebar/your-finances.svg'
import NearMe from '../../../assets/images/sidebar/near-me.svg'

const { Header, Sider, Content } = Layout

interface CustomLayoutProps {
  children: ReactNode
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className='text-2xl text-white text-center mt-4 mb-8 font-bold'>
          EarningEdge<span className='text-[#637CFF]'>.</span>
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item
            key='1'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={Audio} />
              </div>
            }
            color='red'
          >
            Audio devices
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={NearMe} />
              </div>
            }
          >
            Locations
          </Menu.Item>
          <Menu.Item
            key='3'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={NewProducts} />
              </div>
            }
          >
            New products
          </Menu.Item>
          <Menu.Item
            key='4'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={Security} />
              </div>
            }
          >
            Security
          </Menu.Item>
          <Menu.Item
            key='5'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={YourFinances} />
              </div>
            }
          >
            Your finances
          </Menu.Item>
          <Menu.Item
            key='6'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={YourTickets} />
              </div>
            }
          >
            Your tickets
          </Menu.Item>
          <Menu.Item
            key='7'
            icon={
              <div className='h-[24px] w-[24px] grid place-content-center'>
                <img src={Applications} />
              </div>
            }
          >
            Applications
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default CustomLayout
