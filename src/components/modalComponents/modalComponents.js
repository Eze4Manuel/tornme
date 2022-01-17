// Tell webpack this JS file uses this image
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { } from '../../components/buttonComponent/buttonComponent';
import { GoBackComponent, ButtonComponent, GoBackButtonComponent } from '../../components/buttonComponent/buttonComponent';
import btc from '../../assets/images/icons/logout.png'; // Tell webpack this JS file uses this image
import ErrorMessage from '../../components/error/ErrorMessage';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { List, Select } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { TextArea } = Input;

export const LogoutModal = ({ isModalVisible, handleOk, handleCancel, load }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout" style={{ borderRadius: "10px" }}>
                    <PageHeaderComp title="Logout" />
                    <img alt="" className="modal_block_img" src={btc} />
                    <p>This action will log log you out of your account</p>
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <ButtonComponent onClick={handleOk} text="LOGOUT" />
                    <GoBackComponent text="Go Back" onClick={handleCancel} />
                </div>
            </Modal>
        </>
    )
}


export const DeleteAccountModal = ({ isModalVisible, handleOk, handleCancel, load }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Account?" />
                    <p>This action would delete this account and remove your posts from the system</p>
                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <a href='javascript:void(0)' onClick={handleOk}>
                        <PageHeaderComp title={"DELETE ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const SuspendAccountModal = ({ isModalVisible, handleOk, handleCancel, load }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Suspend Account?" />

                    <p>This action would suspend this account and user would not be able to access account</p>

                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <a href='javascript:void(0)' onClick={handleCancel}>
                        <PageHeaderComp title={"YES, SUSPEND ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const VerifyAccountModal = ({ verification_status, isModalVisible, handleOk, handleCancel, load }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title={verification_status === 0 ? "Verify Account?" : "Unverify Account"} />

                    <p>This action would suspend this account and user would not be able to access account</p>

                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <a href='javascript:void(0)' onClick={() => handleOk(verification_status)}>
                        <PageHeaderComp title={verification_status === 0 ? "VERIFY ACCOUNT" : "UNVERIFY ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const CreateAdminModal = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const [values, setValues] = useState({});
    const [info, setInfo] = useState('');

    function handleChange(value) {
        if (value === 'user' || value === 'anonymous') setInfo('Email will be used if phone number is supplied')
        else setInfo('');
        setValues(d => ({ ...d, user_type: value }))
        console.log(`selected ${value}`);
    }

    return (
        <Modal width={800} footer={false} title="" visible={props.isModalVisible} >
            <div className='profile-form'>
                <PageHeaderComp title="Create Account" />
                <Form form={form} layout="vertical">
                    <div className="" >
                        {props.error ? <ErrorMessage message={props.error} /> : null}

                        <div className='form-group' style={{ display: "flex", justifyContent: 'start', paddingLeft: "15px" }}>
                            <Form.Item label="Account Type">
                                <Select defaultValue="Select" style={{ width: 120 }} onChange={handleChange} style={{ width: "350px", marginRight: "10px" }} >
                                    <Option value="admin">Admin</Option>
                                    <Option value="anonymous">Anonymous</Option>
                                    <Option value="user">User</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="First Name">
                                <Input placeholder="John" onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} value={values.first_name} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>

                            <Form.Item label="Middle Name">
                                <Input placeholder="Doe" onChange={e => setValues(d => ({ ...d, middle_name: e.target.value }))} value={values.middle_name} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Last Name">
                                <Input placeholder="Mole" onChange={e => setValues(d => ({ ...d, last_name: e.target.value }))} value={values.last_name} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>

                            <Form.Item label="Username">
                                <Input placeholder="Doe" onChange={e => setValues(d => ({ ...d, username: e.target.value }))} value={values.username} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Email">
                                <Input placeholder="example@gmail.com" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values.email} style={{ width: "350px", marginRight: "10px" }} />
                                {info.length > 0 ? <p style={{ color: "blue", fontSize: "12px" }}>{info}</p> : null}
                            </Form.Item>
                            <Form.Item label="Phone Number" >
                                <Input placeholder="0801 234 5678" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values.phone_number} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ marginLeft: "10px" }}>
                            <Form.Item label="Password">
                                <Input placeholder="*********" type="password" onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values.password} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="profile-password">
                        <div className='form-group' style={{ display: "flex", justifyContent: "space-around" }}>
                            <Form.Item style={{ marginRight: "10px", marginTop: "18px" }}>
                                <ButtonComponent onClick={() => props.handleOk(values)} text="CREATE ACCOUNT" />
                                {props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                            </Form.Item>
                            <Form.Item style={{ marginRight: "10px" }}>
                                <GoBackComponent text="Go Back" onClick={props.handleCancel} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}



export const CreateFaqModal = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const [values, setValues] = useState({});

    return (
        <Modal width={800} footer={false} title="" visible={props.isFaqModalVisible} >
            <div className='profile-form'>
                <div style={{ textAlign: 'center' }}>
                    <PageHeaderComp title="Create Support" />
                </div>
                <Form form={form} layout="vertical">
                    <div className="" >
                        {props.error ? <ErrorMessage message={props.error} /> : null}
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Subject">
                                <Input placeholder="subject" onChange={e => setValues(d => ({ ...d, subject: e.target.value }))} value={values.subject} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Description">
                                <TextArea placeholder="description" onChange={e => setValues(d => ({ ...d, description: e.target.value }))} value={values.description} rows={6} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="profile-password">
                        <div className='form-group' style={{ display: "flex", justifyContent: "space-around" }}>
                            <Form.Item style={{ marginRight: "10px", marginTop: "18px" }}>
                                <ButtonComponent onClick={() => props.handleOk(values)} text="CREATE SUPPORT" />
                                {props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                            </Form.Item>
                            <Form.Item style={{ marginRight: "10px" }}>
                                <GoBackComponent text="Go Back" onClick={props.handleCancel} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}


export const EditFaqModal = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const [values, setValues] = useState(props.data);
    return (
        <Modal width={800} footer={false} title="" visible={props.isSupportModalVisible} >
            <div className='profile-form'>
                <div style={{ textAlign: 'center' }}>
                    <PageHeaderComp title="Update Support" />
                </div>
                <Form form={form} layout="vertical" >
                    <div className="" >
                        {props.error ? <ErrorMessage message={props.error} /> : null}
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Subject">
                                <Input placeholder="subject" onChange={e => setValues(d => ({ ...d, subject: e.target.value }))} value={values.subject} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Description">
                                <TextArea placeholder="description" onChange={e => setValues(d => ({ ...d, description: e.target.value }))} value={values.description} rows={6} style={{ width: "350px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="profile-password">
                        <div className='form-group' style={{ display: "flex", justifyContent: "space-around" }}>
                            <Form.Item style={{ marginRight: "10px", marginTop: "18px" }}>
                                <ButtonComponent onClick={() => props.handleOk(values)} text="UPDATE SUPPORT" />
                                {props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                            </Form.Item>
                            <Form.Item style={{ marginRight: "10px" }}>
                                <GoBackComponent text="Go Back" onClick={props.handleCancel} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}


export const AssignAdminSupportModal = (props) => {

    return (
        <Modal bodyStyle={{ height: "500px", overflow: "scroll" }} width={800} footer={[<Button type='primary' key="back" onClick={props.handleCancel}> Close </Button>,]} title="" visible={props.isAssignAdminSupportModalVisible} >
            <div className='profile-form'>
                <div style={{ textAlign: 'left', display: "flex", flexDirection: "space-between" }}>
                    <PageHeaderComp title="Assign Support" />
                    {props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                </div>


                <List
                    itemLayout="horizontal"
                    dataSource={props.data}
                    renderItem={(item, ind) => (
                        <List.Item
                            actions={[<a onClick={() => props.handleOk(props.data[ind]?.auth_id, props.support_id)} key="list-loadmore-more">Assign</a>]}>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={`Access Level ${item.access_level}`}
                            />
                        </List.Item>
                    )}
                />
                <br />
            </div>
        </Modal>
    )
}



export const DeleteFaqModal = ({ isFaqModalVisible, handleOk, handleCancel, load }) => {
    console.log();
    return (
        <>
            <Modal width={400} visible={isFaqModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Support?" />
                    <p>This action would delete this support and remove it from the system</p>
                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <span onClick={handleOk}>
                        <PageHeaderComp title={"YES, DELETE SUPPORT"} style={{ color: "#747474" }} />
                    </span>
                </div>
            </Modal>
        </>
    )
}



export const ChangeUserPasswordModal = ({ isModalVisible, handleOk, handleCancel, error, load }) => {
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [values, setValues] = useState('');

    return (
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} style={{ textAlign: "center", borderRadius: "8px" }}>
            <div className="app-login__content" style={{ textAlign: "center", borderRadius: "12px" }}>
                <PageHeaderComp title="Change Password" />
                <div className="app-login__error">
                    {error ? <ErrorMessage message={error} /> : null}
                </div>
                <div className="p-fluid p-formgrid p-grid p-mx-5">
                    <div style={{ width: '100%', marginTop: "35px" }} className="container">
                        <div className="row">
                            <Form layout={"vertical"} form={form} initialValues={{ layout: formLayout, }}>
                                {/* <Form.Item label="Old password" required tooltip="This is a required field" >
                        <Input.Password style={{ padding: "10px", borderRadius: "6px" }}
                          placeholder="input password"
                          onChange={e => setValues(d => ({ ...d, old_password: e.target.value }))}
                          value={values.old_password}
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item> */}
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
                                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                                    <br />
                                    <ButtonComponent onClick={() => handleOk(values)} text="UPDATE PASSWORD" />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export const EditTextModal = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const [values, setValues] = useState(props.data);


    const handleChange = (value, name) => {
        console.log({[name]: value});
        console.log(value);
        if(name === 'post_tag'){
            setValues(d => ({ ...d, [name]: value.join(',') }))
        }else{
            setValues(d => ({ ...d, [name]: value }))
        }
        
    }

    const postTag = [
        'Food',
        'Music',
        'Fitness'
    ]
    const children = []
    for (let i = 0; i < postTag.length; i++) {
        children.push(<Option key={i + i} value={postTag[i].toLowerCase()}>{postTag[i]}</Option>);
    }
    return (
        <Modal width={800} footer={false} title="" visible={props.isTextModalVisible} >
            <div className='profile-form'>
                <div style={{ textAlign: 'center' }}>
                    <PageHeaderComp title="Update Content" />
                </div>
                <Form form={form} layout="vertical" >
                    <div className="">
                        {props.error ? <ErrorMessage message={props.error} /> : null}
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Content Text">
                                <TextArea placeholder="text" onChange={e => setValues(d => ({ ...d, text: e.target.value }))} value={values.text} rows={6} style={{ width: "600px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        {console.log(values.post_tag)}
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Post Tag">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={values.post_tag.length !== 0 ? values.post_tag?.split(",").toString() : []}
                                    onChange={e => handleChange(e, 'post_tag')}
                                    style={{ width: "300px", marginRight: "10px" }}
                                >
                                    {children}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Access Status">
                                <Select defaultValue={values.access_status == 0 ? "Free" : "Paid" ?? "Free"} style={{ width: 120 }} onChange={e => handleChange(e, 'access_status')} style={{ width: "300px", marginRight: "10px" }}>
                                    <Option value="0">Free</Option>
                                    <Option value="1">Paid</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Status">
                                <Select defaultValue={values.comment_status == 0 ? "Active" : "Archive" ?? "Select Status"} style={{ width: 120 }} onChange={e => handleChange(e, 'status')} style={{ width: "300px", marginRight: "10px" }}>
                                    <Option value="0">Active</Option>
                                    <Option value="1">Archive</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Comment Status">
                                <Select defaultValue={values.comment_status == 0 ? "Disable" : "Enable" ?? "Select Comment Status"} style={{ width: 120 }} onChange={e => handleChange(e, 'comment_status')} style={{ width: "300px", marginRight: "10px" }}>
                                    <Option value="0">Disable</Option>
                                    <Option value="1">Enable</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='form-group' style={{ display: "flex", justifyContent: 'center' }}>
                            <Form.Item label="Text Card Color">
                                <Select defaultValue={values.text_card_color ?? "White"} style={{ width: 120 }} onChange={e => handleChange(e, 'text_card_color')} style={{ width: "300px", marginRight: "10px" }}>
                                    <Option value="white">White</Option>
                                    <Option value="black">Black</Option>
                                    <Option value="blue">Blue</Option>
                                    <Option value="green">Green</Option>
                                    <Option value="red">Red</Option>
                                    <Option value="orange">Orange</Option>
                                    <Option value="yellow">Yellow</Option>
                                    <Option value="pink">Pink</Option>
                                    <Option value="azure">Azure</Option>
                                    <Option value="purple">Purple</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="">
                                <Input placeholder="John"   style={{ width: "310px", visibility: "hidden" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="profile-password">
                        <div className='form-group' style={{ display: "flex", justifyContent: "space-around" }}>
                            <Form.Item style={{ marginRight: "10px", marginTop: "18px" }}>
                                <ButtonComponent onClick={() => props.handleOk(values)} text="UPDATE CONTENT" />
                                {props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null}
                            </Form.Item>
                            <Form.Item style={{ marginRight: "10px" }}>
                                <GoBackComponent text="Go Back" onClick={props.handleCancel} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export const DeleteTextModal = ({ isTextModalVisible, handleOk, handleCancel, load }) => {
    return (
        <>
            <Modal width={400} visible={isTextModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Content?" />
                    <p>This action would delete this content and remove it from the system</p>
                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    {load ? <Spin style={{ marginBottom: "10px" }} indicator={antIcon} /> : null}
                    <br />
                    <span onClick={handleOk}>
                        <PageHeaderComp title={"YES, DELETE CONTENT"} style={{ color: "#747474" }} />
                    </span>
                </div>
            </Modal>
        </>
    )
}