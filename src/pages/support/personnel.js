import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { PersonnelCard } from '../../components/personnelCard/personnelCard';
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import ErrorMessage from '../../components/error/ErrorMessage';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { ChangeUserPasswordModal, DeleteAdminModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import btc from '../../assets/images/icons/btc.png';
import helpers from '../../core/func/Helpers';
import formValidator from './formvalidation';
import { Form, Input, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import lib from './lib';
import './support.scss';
import '../profile/profile.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

const Personnel = (props) => {
    const [form] = Form.useForm();
    const [error, setError] = useState('')
    const [load, setLoading] = useState(false);
    const [personnelActive, setPersonnelActive] = useState(0);
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [isDeleteAdminModalVisible, setIsDeleteAdminModalVisible] = useState(false);

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
 
    const changeSelectedAdmin = (e) => {
        props.setSelectedAdmin(props.personnelData[e]);
        setPersonnelActive(e)
    }
    
    const handleUpdate = async () => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            let builder = formValidator.validateAdminUpdate(props.selectedAdmin, props.personnelData[personnelActive], {}, setError)
            if (!builder) {
                return
            }
            builder.auth_id = props.selectedAdmin?.auth_id;

            setLoading(true);
            let reqData = await lib.update(builder, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Updated' })
            }
            setLoading(false);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }
    const handleDelete = () => {
        setIsDeleteAdminModalVisible(true);
    }


    const handleDeleteAdminCancel = () => {
        setIsDeleteAdminModalVisible(false);
    }
    const handleDeleteAdminOk = async () => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            setLoading(true);

            let reqData = await lib.delete(user?.token, props.selectedAdmin?.auth_id)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Admin Account Deleted' })
            }
            setLoading(false);
            setIsDeleteAdminModalVisible(false);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    const showChangePassword = () => {
        setIsChangePasswordModalVisible(true)
    }

    const handlePasswordChangeOk = async (val) => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            let builder = formValidator.validateResetUserPassword(val, {}, setError)
            if (!builder) return

            builder.auth_id = props.selectedAdmin.auth_id
            setLoading(true);
            let reqData = await lib.resetUserPassword(builder, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Updated' })
                setIsChangePasswordModalVisible(false);
            }
            setLoading(false);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    const handlePasswordChangeCancel = () => {
        setIsChangePasswordModalVisible(false)
    }

    return (
        <>
            <Row>
                <Col>
                    <PersonnelCard style={{ "height": "500px" }} textColor={{ "color": "#276AFF" }} image={btc} topLeft={""} data={props.personnelData} changeSelectedAdmin={changeSelectedAdmin} active={personnelActive} />
                </Col>
                <Col flex={1}>
                    <div className='profile-form'>
                        <div>
                            <div className="profile-image" style={{ backgroundImage: `url(${person})` }}></div>
                        </div>
                        <Form form={form} layout="vertical">
                            {error ? <ErrorMessage message={error} /> : null}
                            <div className="">
                                <div className='form-group'>
                                    <Form.Item label="Name">
                                        <Input onChange={e => props.setSelectedAdmin(d => ({ ...d, name: e.target.value }))} value={props.selectedAdmin?.name} placeholder="John" style={{ width: "350px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Username">
                                        <Input onChange={e => props.setSelectedAdmin(d => ({ ...d, username: e.target.value }))} value={props.selectedAdmin?.username} placeholder="Doe" style={{ width: "350px", marginRight: "10px" }} />
                                    </Form.Item>
                                </div>
                                <div className='form-group'>
                                    <Form.Item label="Email">
                                        <Input onChange={e => props.setSelectedAdmin(d => ({ ...d, email: e.target.value }))} value={props.selectedAdmin?.email} placeholder="example@gmail.com" style={{ width: "350px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Phone Number" >
                                        <Input onChange={e => props.setSelectedAdmin(d => ({ ...d, phone_number: e.target.value }))} value={props.selectedAdmin?.phone_number} placeholder="0801 234 5678" style={{ width: "350px", marginRight: "10px" }} />
                                    </Form.Item>
                                </div>
                                {user?.user_type === 'superadmin' ?
                                    <div className='form-group'>
                                        <Form.Item label="Permission Level">
                                            <Select defaultValue={props.selectedAdmin?.access_level} value={props.selectedAdmin?.access_level} style={{ width: "350px" }} onChange={e => props.setSelectedAdmin(d => ({ ...d, access_level: e }))}>
                                                <Option value="2">2</Option>
                                                <Option value="3">3</Option>
                                            </Select>
                                        </Form.Item>
                                    </div> :
                                    null
                                }
                            </div>

                            <div className="profile-password">
                                <div className='form-group'>
                                    <Form.Item style={{ width: "200px", marginRight: "10px" }}>
                                        <ButtonComponent style={styles} onClick={handleUpdate} text="UPDATE" />
                                    </Form.Item>
                                    {load ? <Spin style={{ marginRight: "10px" }} indicator={antIcon} /> : null}
                                    <Form.Item style={{ width: "200px", marginRight: "10px" }}>
                                        <ButtonComponent style={styles} onClick={handleDelete} text="DELETE ADMIN" />
                                    </Form.Item>
                                    <Form.Item style={{ width: "200px", marginRight: "10px" }}>
                                        <ButtonComponent style={styles} onClick={showChangePassword} text="CHANGE PASSWORD" />
                                    </Form.Item>
                                    <ChangeUserPasswordModal load={load} isModalVisible={isChangePasswordModalVisible} handleOk={handlePasswordChangeOk} handleCancel={handlePasswordChangeCancel} error={error} />
                                    <DeleteAdminModal load={load} isDeleteAdminModalVisible={isDeleteAdminModalVisible} handleOk={handleDeleteAdminOk} handleCancel={handleDeleteAdminCancel} error={error} />
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}


export default Personnel;