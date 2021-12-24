import React, { useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './layout.scss';
import { CaretDownFilled } from '@ant-design/icons';
import logo from '../../assets/images/Logo.svg'; // Tell webpack this JS file uses this image
import person from '../../assets/images/icons/person.png'; // Tell webpack this JS file uses this image
import notification from '../../assets/images/icons/notification.png';
import { LogoutModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from './lib';

const { Header, Content } = Layout;



const Structure = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { set, user } = useAuth();
    const notify = useNotifications();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleLogout = async () => {

        let reqData = await lib.logout(user?.token)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === "ok") {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Logout Success' })
            helpers.logout(set);
        }
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <Layout className="layout">
            {(!props.noHeader) ?
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', padding: '0px' }}>
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
                                {user?.user_type === 'superadmin' ?
                                    <Menu.Item key="overview">
                                        <Link to="/overview">
                                            Overview
                                        </Link>
                                    </Menu.Item>
                                    : null}

                                <Menu.Item key="user">
                                    <Link to="/users">
                                        Users
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="finance">
                                    <Link to="/finance">
                                        Finance
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="support">
                                    <Link to="/support">
                                        Support
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="settings">
                                    <Link to="/settings">
                                        Settings
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="profile">
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col xs={4} sm={4} md={6} lg={5} xl={6}>
                            <Menu mode="horizontal">
                                <Menu.Item key="notification">
                                    <Link to="/support">
                                        <img src={notification} alt="logo" />
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="account">
                                    <LogoutModal isModalVisible={isModalVisible} handleOk={handleLogout} handleCancel={handleCancel} />
                                    <a className="ant-dropdown-link" onClick={e => { e.preventDefault(); showModal() }} style={{ color: '#276AFF' }}>
                                        <img src={person} alt="logo" />
                                        Logout  <CaretDownFilled />
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="admin">

                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                :
                null}
            <Content style={{ padding: '100px 50px' }}>
                {props.children}
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    )
}
export default Structure;

