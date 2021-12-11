import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';

import { Form, Input} from 'antd';

import './login.scss';

const Login = () => {
    const [error,] = useState('')
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');

    return (
        <Structure className="login">
            <div className="login-center">
                <div className="app-login">
                    <div className="app-login__container">
                        <div className="app-login__content">
                            <PageHeaderComp title="Login" />
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
                                            <Form.Item label="Email" required tooltip="This is a required field" >
                                                <Input placeholder="example@email.com" style={{ padding: "10px", borderRadius: "6px"}}/>
                                            </Form.Item>
                                            <Form.Item label="Password" required tooltip="This is a required field">
                                                <Input placeholder="password" style={{ padding: "10px", borderRadius: "6px"}}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <ButtonComponent text="LOGIN" />
                                                <div className="" style={{marginTop: "30px"}}>
                                                    <PageHeaderComp title="forgot password" style={{ fontSize: "16px", color: "#276AFF" }} />
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Structure>
    )
}
export default Login;