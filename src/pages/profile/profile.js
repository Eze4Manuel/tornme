import React, { useState } from 'react';
import './profile.scss';
import { Row, Col } from 'antd';
import Structure from "../../components/layout/index";
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';

import { Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';




const Profile = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');

    return (
        <Structure className="users-post-profile" >
            <div style={{ width: "90%", margin: "auto" }}>
                <PageHeaderComp title="Profile" />
                <div className="profile-top" >
                    <Row>
                        <Col>
                            <div>
                                <div className="profile-image" style={{ backgroundImage: `url(${person})` }}></div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className='profile-form'>
                                <Form
                                    form={form}
                                    layout="vertical"
                                >
                                    <div className="">
                                        <div className='form-group'>
                                            <Form.Item label="First Name" required tooltip="This is a required field">
                                                <Input placeholder="John" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Last Name"
                                                tooltip={{
                                                    title: 'Tooltip with customize icon',
                                                    icon: <InfoCircleOutlined />,
                                                }}
                                            >
                                                <Input placeholder="Doe" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                        </div>
                                        <div className='form-group'>
                                            <Form.Item label="Email" required tooltip="This is a required field">
                                                <Input placeholder="example@gmail.com" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Phone Number"
                                                tooltip={{
                                                    title: 'Tooltip with customize icon',
                                                    icon: <InfoCircleOutlined />,
                                                }}
                                            >
                                                <Input placeholder="0801 234 5678" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="profile-password">
                                        <h2>Password</h2>
                                        <div className='form-group'>
                                            <Form.Item label="Old password" required tooltip="This is a required field">
                                                <Input placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>


                                        </div>
                                        <div className='form-group'>
                                            <Form.Item label="New password" required tooltip="This is a required field">
                                                <Input placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Confirm New password"
                                                tooltip={{
                                                    title: 'Tooltip with customize icon',
                                                    icon: <InfoCircleOutlined />,
                                                }}
                                            >
                                                <Input placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div className="profile-button">
                                        <Form.Item>
                                            <ButtonComponent text="Save Update" />
                                        </Form.Item>
                                    </div>

                                </Form>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </Structure>
    )
}

export default Profile;