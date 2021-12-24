import React, { useEffect, useState } from 'react';

import Structure from "../../components/layout/index";
import { Row, Col, Menu, Modal } from 'antd';
import { } from '../../components/supportCard/supportCard';
import { UsersPostCard } from '../../components/userPostsCard/userPostsCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { useNavigate } from "react-router-dom";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import { ChangePassword } from '../changePassword/index';
import './users.scss';
import { useLocation } from "react-router-dom";
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import person from '../../assets/images/icons/person.png'; // Tell webpack this JS file uses this image
import { GoBackComponent, ActionButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { SuspendAccountModal, DeleteAccountModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import ErrorMessage from '../../components/error/ErrorMessage';

import lib from './lib';
import formValidator from './formvalidation';
import helpers from '../../core/func/Helpers';
import { Form, Input } from 'antd';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const UsersPosts = (props, history) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [, setLoader] = useState(false);
  const [userData, setuserData] = useState({});
  const { set, user } = useAuth();


  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.getUserDetail(user?.token, state?.record?.key);

      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setuserData(reqData.data)
      }
      setLoader(false);
    })()
  }, [user?.token,]);

  const goBack = () => {
    navigate('/users')
  }

  return (
    <Structure className="users">
      <div style={{ marginLeft: "0px", width: "fit-content" }} >
        <GoBackComponent text="Go Back" onClick={goBack} />
      </div>
      <div className="users-top">
        <Row>
          <Col flex={20}>
            <UsersPostCard data={userData} />
          </Col>
          <Col flex={1}>
            <div className="sidebar">
              <SideBarFeatures />
              <SideBarActions user_id={userData?._id} />
            </div>
          </Col>
        </Row>
      </div>
    </Structure>
  )
}
export default UsersPosts;



const SideBarFeatures = () => {
  const menu = (
    <Menu>

    </Menu>
  );

  return (
    <div className="sidebar-features">
      <div className='sidebar-features-card'>
        <AnalyticCard
          textColor={{ "color": "#276AFF" }}
          image={newUser}
          topLeft={"Followers"}
          bottomText={589}
          menu={menu}

        />
      </div>
      <div className='sidebar-features-card'>
        <AnalyticCard
          textColor={{ "color": "#3F7290" }}
          image={newUser}
          topLeft={"Following"}
          bottomText={4735}
          menu={menu}
        />
      </div>

      <div className='sidebar-features-card'>
        <AnalyticCard
          textColor={{ "color": "#FF7A00" }}
          image={btc}
          topLeft={"Earnings"}
          bottomText={0.89}
          menu={menu}
        />
      </div>
      <div className='sidebar-features-card'>
        <AnalyticCard
          textColor={{ "color": "#09A479" }}
          image={onlineUser}
          topLeft={"Total Post"}
          bottomText={1453}
          menu={menu}
        />
      </div>

      <div className='sidebar-features-card'>
        <AnalyticCard
          textColor={{ "color": "#276AFF" }}
          image={person}
          topLeft={"Wallet Balance"}
          bottomText={0.5989}
          menu={menu}
        />
      </div>

    </div>
  )
}

const SideBarActions = (props) => {
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] = useState(false);
  const [isSuspendedAccountModalVisible, setIsSuspendedAccountModalVisible] = useState(false);
  const [isResetAccountModalVisible, setIsResetAccountModalVisible] = useState(false);
  const [error, setError] = useState('')
  const { state } = useLocation();

  const { set, user } = useAuth();
  const [load, setLoading] = useState(false);
  const [, setLoader] = useState(false);
  const notify = useNotifications();
  const navigate = useNavigate();

  const showDeleteAccountModal = () => {
    setIsDeleteAccountModalVisible(true);
  };
  const showSuspendedAccountModal = () => {
    setIsSuspendedAccountModalVisible(true);
  };
  const showResetAccountModal = () => {
    setIsResetAccountModalVisible(true);
  };



  const handleDeleteAccountOk = async () => {
    setLoading(true)
    let reqData = await lib.deleteUser(user?.token, props.user_id);

    if (reqData.status === "error") {
      helpers.sessionHasExpired(set, reqData.msg);
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData?.data?.msg })

    }
    if (reqData.status === 'ok') {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Deleted' })
      navigate('/users')
    }
    setLoading(false);
    setIsDeleteAccountModalVisible(false);

  }
  const handleSuspendedAccountOk = () => {
    setIsSuspendedAccountModalVisible(false);
  }



  const handleResetAccountOk = async (val) => {

    let builder = formValidator.validateResetUserPassword(val, {}, setError)
    if (!builder) return

    builder.auth_id = state?.record?.key;
    setLoading(true);
    
    let reqData = await lib.resetUserPassword(builder, user?.token)
    if (reqData.status === "error") {
      helpers.sessionHasExpired(set, reqData.msg)
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
    }
    if (reqData.status === 'ok') {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Updated' })
    }
    setLoading(false);
    setIsResetAccountModalVisible(false);
  }


  const handleDeleteAccountCancel = () => {
    console.log('delete cancel');
    setIsDeleteAccountModalVisible(false);
  }
  const handleSuspendedAccountCancel = () => {
    setIsSuspendedAccountModalVisible(false);
  }
  const handleResetAccountCancel = () => {
    setIsResetAccountModalVisible(false);
  }

  return (
    <>
      <div className="sidebar-action">
        <h4 className="sidebar-header">Actions </h4>
        <div className='sidebar-action-button'>
          <ActionButtonComponent text={"SUSPEND ACCOUNT"} color="#276AFF" bgColor="#ECF2FF" onClick={showSuspendedAccountModal} />
        </div>

        <div className='sidebar-action-button'>
          <ActionButtonComponent text={"RESET PASSWORD"} color="#276AFF" bgColor="#ECF2FF" onClick={showResetAccountModal} />
        </div>

        <div className='sidebar-action-button'>
          <ActionButtonComponent text={"DELETE ACCOUNT"} onClick={showDeleteAccountModal} />
        </div>

        <DeleteAccountModal load={load} isModalVisible={isDeleteAccountModalVisible} handleOk={handleDeleteAccountOk} handleCancel={handleDeleteAccountCancel} />
        <SuspendAccountModal load={load} isModalVisible={isSuspendedAccountModalVisible} handleOk={handleSuspendedAccountOk} handleCancel={handleSuspendedAccountCancel} />

        <ChangeUserPassword load={load} isModalVisible={isResetAccountModalVisible} handleOk={handleResetAccountOk} handleCancel={handleResetAccountCancel} error={error} />


      </div>
    </>
  )
}




const ChangeUserPassword = ({ isModalVisible, handleOk, handleCancel, error, load }) => {
  const [form] = Form.useForm();
  const [formLayout,] = useState('vertical');
  const [loading, setLoading] = useState('vertical');
  const [values, setValues] = useState('');
  const { set, user } = useAuth();
  const notify = useNotifications();




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