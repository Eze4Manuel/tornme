import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { Link } from 'react-router-dom';
import formValidator from './formvalidation';
import helpers from '../../core/func/Helpers';
import { useAuth } from '../../core/hooks/useAuth';
import notification from '../../assets/images/icons/notification.png'; 
import { useNotifications } from '@mantine/notifications';
import lib from './lib';

import { Form, Input } from 'antd';

import './resetPassword.scss';

const ResetPassword = (props) => {
    const [error, setError] = useState('')
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [loading, setLoading] = useState('vertical');
    const [values, setValues] = useState('');
    const { set, user } = useAuth();
    const notify = useNotifications();

    const handleSubmit = async ()  => {
        setError('');
        setLoading(true);
        try {
            let builder = formValidator.resetPassword(values, {}, setError);
            if (!builder) return;

            console.log(user?.token);
            console.log(builder);
            let reqData = await lib.resetpassword(user?.token, builder)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === "ok") {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Password Reset' })
                helpers.logout(set);
            }

            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err?.response?.data?.msg || err?.message)
        }
    }

    return (
        <Structure className="login" noHeader={true}>
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
                                                <Input onChange={e => setValues(d => ({ ...d, login: e.target.value }))} value={values.login} placeholder="" style={{ padding: "10px", borderRadius: "6px" }} />
                                            </Form.Item>

                                            <Form.Item>
                                                <ButtonComponent onClick={handleSubmit} text="SEND CODE" />
                                                <div className="" style={{ marginTop: "30px" }}>
                                                    <p>Have an account? <Link to='/login' style={{ color: "#276AFF", fontWeight: "bold" }}>Sign in</Link></p>

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