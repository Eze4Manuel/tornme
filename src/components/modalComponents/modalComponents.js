// Tell webpack this JS file uses this image
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { } from '../../components/buttonComponent/buttonComponent';
import { GoBackComponent, ButtonComponent, GoBackButtonComponent } from '../../components/buttonComponent/buttonComponent';
import btc from '../../assets/images/icons/logout.png'; // Tell webpack this JS file uses this image
import { useAuth } from '../../core/hooks/useAuth';
import ErrorMessage from '../../components/error/ErrorMessage';

import { CaretDownFilled } from '@ant-design/icons';

import { Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export const LogoutModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout" style={{borderRadius: "10px"}}>
                    <PageHeaderComp title="Logout" />
                    <img className="modal_block_img" src={btc} />
                    <p>This action will log log you out of your account</p>
                    <ButtonComponent onClick={handleOk} text="LOGOUT" />
                    <GoBackComponent text="Go Back" onClick={handleCancel} />
                </div>
            </Modal>
        </>
    )
}


export const DeleteAccountModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Account?" />
                    <p>This action would delete this account and remove your posts from the system</p>
                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    <a onClick={handleOk}>
                        <PageHeaderComp title={"YES, DELETE ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const SuspendAccountModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Suspend Account?" />

                    <p>This action would suspend this account and user would not be able to access account</p>

                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    <a onClick={handleCancel}>
                        <PageHeaderComp title={"YES, SUSPEND ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const CreateAdminModal = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const { set, user } = useAuth();
    const [values, setValues] = useState({});

 
    const styles = {
        color: "#276AFF",
        background: "#ffffff",
        fontWeight: "800",
        border: "1px solid #276AFF",
        paddingTop: "12px",
        paddingBottom: "12px",
        width: "100%",
        borderRadius: "6px"
    }
    
    return (
        <Modal width={800} footer={false} title="" visible={props.isModalVisible} >
            <div className='profile-form'>
                <PageHeaderComp title="Create Admin" />
                <Form
                    form={form}
                    layout="vertical"
                >
                    <div className="" >
                    {props.error ? <ErrorMessage message={props.error} /> : null}

                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Name">
                                <Input placeholder="John" onChange={e => setValues(d => ({...d, name: e.target.value}))} value={values.name}   style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>

                            <Form.Item label="Username">
                                <Input placeholder="Doe" onChange={e => setValues(d => ({...d, username: e.target.value}))} value={values.username}   style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Email">
                                <Input placeholder="example@gmail.com" onChange={e => setValues(d => ({...d, email: e.target.value}))} value={values.email}   style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>

                            <Form.Item label="Phone Number" >
                                <Input placeholder="0801 234 5678" onChange={e => setValues(d => ({...d, phone_number: e.target.value}))} value={values.phone_number}   style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>

                        <div className='form-group' style={{ marginLeft: "10px" }}>
                            <Form.Item label="Password">
                                <Input placeholder="*********" onChange={e => setValues(d => ({...d, password: e.target.value}))} value={values.password}   style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                            
                        </div>

                    </div>

                    <div className="profile-password">
                        <div className='form-group' style={{ display: "flex", justifyContent: "space-around" }}>
                            <Form.Item style={{ marginRight: "10px", marginTop: "18px" }}>
                                <ButtonComponent onClick={()=> props.handleOk(values)} text="CREATE ADMIN" />
                            </Form.Item>

                            <Form.Item style={{ marginRight: "10px" }}>
                                <GoBackComponent text="Go Back" onClick={props.handleCancel} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>

    )
}
