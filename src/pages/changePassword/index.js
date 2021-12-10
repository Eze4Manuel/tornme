import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';

import { Form, Input, Button, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './changePassword.scss';

const ChangePasswordPage = () => {
    

    return (
        <Structure className="login">
            <div className="login-center">
                <div className="app-login">
                   <ChangePassword />
                </div>
            </div>
        </Structure>
    )
}
export default ChangePasswordPage;


export const ChangePassword = () => {
    const [values, setValues] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    return(
        <div className="app-login__container" style={{textAlign: "center", borderRadius:"8px"}}>
        <div className="app-login__content" style={{textAlign: "center", borderRadius:"12px"}}>
            <PageHeaderComp title="Change Password" />
            <div className="app-login__error">
                {error ? <ErrorMessage message={error} /> : null}
            </div>
            <div className="p-fluid p-formgrid p-grid p-mx-5">
                <div style={{ width: '100%', marginTop: "35px" }} className="container">
                    <div className="row">
                        <Form
                            layout={"vertical"}
                            form={form}
                            initialValues={{
                                layout: formLayout,
                            }}
                        >
                            <Form.Item label="Old password" required tooltip="This is a required field" >
                                <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                                    placeholder="input password"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item label="New password" required tooltip="This is a required field" >
                                <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                                    placeholder="input password"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item label="Confirm new password" required tooltip="This is a required field" >
                                <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                                    placeholder="input password"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <ButtonComponent text="UPDATE PASSWORD" />
                                
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}