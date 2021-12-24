import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import formValidator from './formvalidation';
import helpers from '../../core/func/Helpers';
import { useAuth } from '../../core/hooks/useAuth';
import notification from '../../assets/images/icons/notification.png'; 
import { useNotifications } from '@mantine/notifications';
import lib from './lib';

import { Form, Input } from 'antd';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './resetPassword.scss';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ResetPassword = (props) => {
    const [error, setError] = useState('')
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [load,setLoading] = useState(false);
    const [values, setValues] = useState('');
    const { set, user } = useAuth();
    const notify = useNotifications();
    let navigate = useNavigate();

    const handleSubmit = async ()  => {
        setError('');
        try {
            let builder = formValidator.resetPassword(values, {}, setError);
            if (!builder) return;
            setLoading(true);

            let reqData = await lib.resetpassword(user?.token, builder)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === "ok") {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Password Reset' })
                navigate('/verify-phone')
            }
            console.log(reqData);
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
                                                {load ? <Spin style={{marginBottom: "10px"}} indicator={antIcon} /> : null}
                                                <br />
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