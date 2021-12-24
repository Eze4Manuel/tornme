import Structure from "../../components/layout/index";
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import ErrorMessage from '../../components/error/ErrorMessage';
import formValidator from './formvalidation';

import helpers from '../../core/func/Helpers';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';


import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './changePassword.scss';

const ChangePasswordPage = () => {

    
    return (
        <Structure className="login" noHeader={true}>
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
    const [error, setError ] = useState('')
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [loading, setLoading] = useState('vertical');
    const [values, setValues] = useState('');
    const { set, user } = useAuth();
    const notify = useNotifications();

    

    const handleClick = async ()  => {
        setError('');
        setLoading(true);
        try {
            let builder = formValidator.changePassword(values, {}, setError);
            if (!builder) return;   
            console.log(builder);

            let reqData = await lib.changePassword(user?.token, builder)
            if (reqData.status === "error") {
                // helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === "ok") {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Password Changed Success' })
                helpers.logout(set);
            }

            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err?.response?.data?.msg || err?.message)
        }
    }
    return(
        <div className="app-login__container" style={{textAlign: "center", borderRadius:"8px"}}>
        <div className="app-login__content" style={{textAlign: "center", borderRadius:"12px"}}>
            <PageHeaderComp title="Change Password"/>
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
                                    onChange={e => setValues(d => ({ ...d, old_password: e.target.value }))}
                                    value={values.old_password} 
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item label="New password" required tooltip="This is a required field" >
                                <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                                    placeholder="input password"
                                    onChange={e => setValues(d => ({ ...d, new_password: e.target.value }))}
                                    value={values.new_password} 
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item label="Confirm new password" required tooltip="This is a required field" >
                                <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                                    placeholder="input password"
                                    onChange={e => setValues(d => ({ ...d, confirm_password: e.target.value }))}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <ButtonComponent onClick={handleClick} text="UPDATE PASSWORD" />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}