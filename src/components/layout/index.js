import React from 'react';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';
import './layout.scss';
import { CaretDownFilled } from '@ant-design/icons';
import logo from '../../assets/images/Logo.svg'; // Tell webpack this JS file uses this image
import person from '../../assets/images/icons/person.png'; // Tell webpack this JS file uses this image
import notification from '../../assets/images/icons/notification.png'; // Tell webpack this JS file uses this image


const { Header, Content } = Layout;


const menu = (
    <Menu>
        <Menu.Item key="0">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
    </Menu>
);

const Structure = (props) => {

    return (
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0px' }}>
                <Row style={{ width: '100%' }}>
                    <Col xs={20} sm={20} md={6} lg={5} xl={6}>
                        <Menu mode="horizontal">
                            <Menu.Item key="mail">
                                <img src={logo} alt="logo" />

                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col xs={0} sm={0} md={12} lg={14} xl={12} >
                        <Menu mode="horizontal" justify="center">
                            <Menu.Item key="overview">
                                <a href="/overview" target="_blank" rel="noopener noreferrer">
                                    Overview
                                </a>
                            </Menu.Item>
                            <Menu.Item key="finance">
                                <a href="/finance" target="_blank" rel="noopener noreferrer">
                                    Finance
                                </a>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <a href="/users" target="_blank" rel="noopener noreferrer">
                                    Users
                                </a>
                            </Menu.Item>
                            <Menu.Item key="support">
                                <a href="/support" target="_blank" rel="noopener noreferrer">
                                    Support
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col xs={4} sm={4} md={6} lg={5} xl={6}>
                        <Menu mode="horizontal">
                            <Menu.Item key="notification">
                                <a href="/support" target="_blank" rel="noopener noreferrer">
                                    <img src={notification} alt="logo" />
                                </a>
                            </Menu.Item>
                            <Menu.Item key="account">
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color: '#276AFF'}}>
                                        <img src={person} alt="logo" />
                                        Admin  <CaretDownFilled />
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item key="admin">

                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '100px 50px' }}>
                {props.children}
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    )
}


export default Structure;