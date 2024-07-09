import React from 'react';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import AppFooter from './AppFooter';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

const { Header, Content } = Layout;

const MainWrapper = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const items = [
    {
      key: 1,
      label: "Users",
      onClick: () => { navigate('/dashboard/users') }
    },
    {
      key: 2,
      label: 'Draws',
      onClick: () => { navigate('/dashboard/draws') }
    },
    {
      key: 3,
      label: 'Setting',
      onClick: () => { navigate('/dashboard/setting') }
    },
    {
      key: 4,
      label: 'Profile',
      onClick: () => { navigate('/dashboard/profile') }
    },
    {
      key: 5,
      label: token ? 'Logout' : 'Login',
      onClick: () => { token ? signOut() : navigate('/login') }
    }
  ];

  return (
    <>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Flex className="demo-logo" style={{marginRight: 20}} vertical align='center'>
            <NavLink to={'/'}><img style={{ width: 150 }} src={'/logo.png'} /></NavLink>
          </Flex>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              justifyContent: 'flex-end'
            }}
          />
        </Header>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {
              location.pathname.slice(1).split('/').map((route, key) => (
                <Breadcrumb.Item key={key} className='text-uppercase'>{route}</Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 'calc(100vh - 190px)',
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <AppFooter />
      </Layout>
      <ToastContainer />
    </>
  );
};
export default MainWrapper;