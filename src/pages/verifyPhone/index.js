import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState, useRef } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

import helpers from '../../core/func/Helpers';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import { Form, Input } from 'antd';
import './verifyPhone.scss';


import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const VerifyPhone = () => {
    const [error, setError] = useState('')
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [load, setLoading] = useState(false);
    const [values, setValues] = useState({});
    const [disabled, setDisabled] = useState(false);
    const { set, user } = useAuth();
    const notify = useNotifications();
    const countDownRef = useRef();
    const countnumber = 5000

    const handleClick = async () => {
        setError('');
        let otp = values.verify_phone_1 + values.verify_phone_2 + values.verify_phone_3 + values.verify_phone_4;

        if (!otp) {
            setError("Input OTP");
            return;
        }
        setDisabled(true);

        setTimeout(() => {
            countDownRef.current?.start();
            setError('');
            setDisabled(false);
        }, countnumber)
            setLoading(true);

        try {

            let reqData = await lib.verifyPhone(user?.token, { otp })
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
                setError(reqData.msg);
            }
            if (reqData.status === "ok") {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Password Changed Success' })
                helpers.logout(set);
            }
            setLoading(false);
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
                            <PageHeaderComp title="Verify Phone" />
                            <p>Enter the 4-digits code sent to
                                your number?</p>
                            <div className="app-login__error">
                                {error ? <ErrorMessage message={error} /> : null}
                            </div>
                            <div className="p-fluid p-formgrid p-grid p-mx-5">
                                <div style={{ width: '100%', marginTop: "35px" }} className="container">
                                    <div className="row">
                                        <Form layout={"vertical"} form={form} initialValues={{ layout: formLayout }} >
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <Form.Item >
                                                    <Input
                                                        disabled={disabled}
                                                        onChange={e => setValues(d => ({ ...d, verify_phone_1: e.target.value }))}
                                                        maxLength={1} placeholder="" style={{ width: "60px", height: "60px", padding: "10px", borderRadius: "6px", fontSize: "30px", textAlign: "center", fontWeight: "bold" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input
                                                        disabled={disabled}
                                                        onChange={e => setValues(d => ({ ...d, verify_phone_2: e.target.value }))}
                                                        maxLength={1} placeholder="" style={{ width: "60px", height: "60px", padding: "10px", borderRadius: "6px", fontSize: "30px", textAlign: "center", fontWeight: "bold" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input
                                                        disabled={disabled}
                                                        onChange={e => setValues(d => ({ ...d, verify_phone_3: e.target.value }))}
                                                        maxLength={1} placeholder="" style={{ width: "60px", height: "60px", padding: "10px", borderRadius: "6px", fontSize: "30px", textAlign: "center", fontWeight: "bold" }} />
                                                </Form.Item>
                                                <Form.Item >
                                                    <Input
                                                        disabled={disabled}
                                                        onChange={e => setValues(d => ({ ...d, verify_phone_4: e.target.value }))}
                                                        maxLength={1} placeholder="" style={{ width: "60px", height: "60px", padding: "10px", borderRadius: "6px", fontSize: "30px", textAlign: "center", fontWeight: "bold" }} />
                                                </Form.Item>
                                            </div>
                                            <Form.Item>
                                                {(countDownRef.current?.isCompleted() ? setDisabled(false) : null)}
                                                <p>Resend in <b>
                                                    <Countdown ref={countDownRef} precision={0} autoStart={false} date={Date.now() + countnumber} /></b></p>
                                                {load ? <Spin indicator={antIcon} /> : null}
                                                <br />
                                                <ButtonComponent text="SUBMIT" onClick={handleClick} />
                                                <div className="" style={{ marginTop: "30px" }}>
                                                    <p>Have an account? <Link to="/"   style={{ color: "#276AFF", fontWeight: "bold" }}>Sign in</Link></p>
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