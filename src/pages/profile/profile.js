import React, { useState, useEffect } from 'react';
import './profile.scss';
import { Row, Col } from 'antd';
import Structure from "../../components/layout/index";
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { useAuth } from '../../core/hooks/useAuth';
import ErrorMessage from '../../components/error/ErrorMessage';
import { Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { useNotifications } from '@mantine/notifications';

import helpers from '../../core/func/Helpers';
import formValidator from './formvalidation';
import lib from './lib';


import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const Profile = (props) => {
    const [form] = Form.useForm();
    const { set, user } = useAuth();
    const [load, setLoading] = useState(false);
    const [loadPass, setLoadingPass] = useState(false);
    const [, setLoader] = useState(false);
    const [data, setData] = useState({});
    const [values, setValues] = useState({});
    const [profilePass, setProfilePass] = useState({});
    const [error, setError] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const notify = useNotifications();


    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(user?.token, user?.auth_id)
            if (reqData.status === "error") {
                // helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setValues(reqData.data);
                setData(reqData.data);
            }
            setLoader(false);
        })();
    }, [user?.token, set, user?.auth_id])


    const changePassword = async () => {

        let builder = formValidator.validateProfilePassword(profilePass, {}, setErrorPass)
        if (!builder) {
            return
        }
        builder.auth_id = data?._id;
        setLoadingPass(true);


        let reqData = await lib.updatePassword(builder, user?.token)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg);
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Password Updated' })
        }
        setLoadingPass(false);
    }


    const updateProfile = async () => {
        let builder = formValidator.validateProfileUpdate(values, data, {}, setError)
        if (!builder) {
            return
        }
        builder.auth_id = data?._id;

        setLoading(true);

        let reqData = await lib.update(builder, user?.token)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg);
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })

        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Updated' })
        }
        setLoading(false);
    }

    return (
        <Structure className="users-post-profile" >
            <div style={{ width: "90%", margin: "auto" }}>
                <PageHeaderComp title="Profile" />
                <div className="profile-top" >

                    {/* Displaying profile image if user is not super Admin */}
                    {user?.user_type !== 'superadmin' ?
                        <Row>
                            <Col>
                                <div>
                                    <div className="profile-image" style={{ backgroundImage: `url(${person})` }}></div>
                                </div>
                            </Col>
                        </Row>
                        : null}

                    <Row>
                        <Col>
                            <div className='profile-form'>
                                <Form form={form} layout="vertical">

                                    {/* Displaying admin profile update if user is  not admin*/}
                                    {user?.user_type !== 'superadmin' ?
                                        <div className="">
                                            {error ? <ErrorMessage message={error} /> : null}
                                            <div className='form-group'>
                                                <Form.Item label="Name" required tooltip="This is a required field">
                                                    <Input onChange={e => setValues(d => ({ ...d, name: e.target.value }))} value={values?.name} placeholder="John" style={{ width: "350px", marginRight: "10px" }} />
                                                </Form.Item>

                                                <Form.Item label="User Name" tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }} >
                                                    <Input onChange={e => setValues(d => ({ ...d, username: e.target.value }))} value={values?.username} placeholder="Doe" style={{ width: "350px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="Email" required tooltip="This is a required field">
                                                    <Input onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values?.email} placeholder="example@gmail.com" style={{ width: "350px", marginRight: "10px" }} />
                                                </Form.Item>

                                                <Form.Item label="Phone Number" tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}>
                                                    <Input onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values?.phone_number} placeholder="0801 234 5678" style={{ width: "350px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className="profile-button">
                                                <Form.Item>
                                                    <ButtonComponent onClick={updateProfile} text="Save Update" />
                                                    {load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                                                </Form.Item>
                                            </div>
                                        </div> :
                                        null}
                                    <div className="profile-password">
                                        <h2>Password</h2>
                                        {errorPass ? <ErrorMessage message={errorPass} /> : null}
                                        <div className='form-group'>
                                            <Form.Item label="Old password" required tooltip="This is a required field">
                                                <Input type="password" onChange={e => setProfilePass(d => ({ ...d, old_password: e.target.value }))} value={profilePass?.old_password} placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                        </div>
                                        <div className='form-group'>
                                            <Form.Item label="New password" required tooltip="This is a required field">
                                                <Input type="password" onChange={e => setProfilePass(d => ({ ...d, new_password: e.target.value }))} value={profilePass?.new_password} placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Confirm New password"
                                                tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }} >
                                                <Input type="password" onChange={e => setProfilePass(d => ({ ...d, confirm_password: e.target.value }))} value={profilePass?.confirm_password} placeholder="*********" style={{ width: "350px", marginRight: "10px" }} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="profile-button">
                                        <Form.Item>
                                            <ButtonComponent onClick={changePassword} text="Change Password" />
                                            {loadPass ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
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