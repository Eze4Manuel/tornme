import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';

import { Form, Input, Button, Radio } from 'antd';

import './resetPassword.scss';

const ResetPassword = () => {
    const [values, setValues] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');

    return (
        <Structure className="login">
            <div className="login-center">
                <div className="app-login">
                    <div className="app-login__container">
                        <div className="app-login__content">
                            <PageHeaderComp title="Reset Password" />
                            <p>A 4-digits code would be sent to your phone number</p>
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
                                            <Form.Item label="Email or Phone number" required tooltip="This is a required field" >
                                                <Input placeholder="" style={{ padding: "10px", borderRadius: "6px" }} />
                                            </Form.Item>

                                            <Form.Item>
                                                <ButtonComponent text="SEND CODE" />
                                                <div className="" style={{ marginTop: "30px" }}>
                                                    <p>Have an account? <a style={{color: "#276AFF", fontWeight: "bold"}}>Sign in</a></p>

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
export default ResetPassword;