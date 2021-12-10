import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';

import { Form, Input, Button, Radio } from 'antd';

import './verifyPhone.scss';

const VerifyPhone = () => {
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
                            <PageHeaderComp title="Verify Phone" />
                            <p>Enter the 4-digits code sent to  0801 234 5678
                                Edit number?</p>
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
                                            <div style={{ display: "flex", justifyContent: "space-around"}}>
                                                <Form.Item >
                                                    <Input placeholder="" style={{ width: "60px", height:"60px", padding: "10px", borderRadius: "6px" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input placeholder="" style={{ width: "60px", height:"60px", padding: "10px", borderRadius: "6px" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input placeholder="" style={{ width: "60px", height:"60px", padding: "10px", borderRadius: "6px" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input placeholder="" style={{ width: "60px", height:"60px", padding: "10px", borderRadius: "6px" }} />
                                                </Form.Item>
                                            </div>

                                            <Form.Item> 
                                                <p>Resend in <b>0:50</b></p>
                                                <ButtonComponent text="SUBMIT" />
                                                <div className="" style={{ marginTop: "30px" }}>
                                                    <p>Have an account? <a style={{ color: "#276AFF", fontWeight: "bold" }}>Sign in</a></p>

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
export default VerifyPhone;