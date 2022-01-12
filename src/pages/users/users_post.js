import React, { useEffect, useState } from 'react';

import Structure from "../../components/layout/index";
import { Row, Col, Menu } from 'antd';
import { UsersPostCard } from '../../components/userPostsCard/userPostsCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { useNavigate } from "react-router-dom";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import './users.scss';
import { useLocation } from "react-router-dom";
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import person from '../../assets/images/icons/person.png'; // Tell webpack this JS file uses this image
import { GoBackComponent, ActionButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { SuspendAccountModal, DeleteAccountModal, ChangeUserPasswordModal, VerifyAccountModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import formValidator from './formvalidation';
import helpers from '../../core/func/Helpers';

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
  }, [user?.token, set, state?.record?.key]);

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
              <SideBarActions data={userData} />
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
  const [isVerifyAccountModalVisible, setIsVerifyAccountModalVisible] = useState(false);

  
  const [error, setError] = useState('')
  const { state } = useLocation();

  const { set, user } = useAuth();
  const [load, setLoading] = useState(false);
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
  const showVerifyAccountModal = () => {
    setIsVerifyAccountModalVisible(true);
  };
 

  const handleDeleteAccountOk = async () => {
    setLoading(true)
    let reqData = await lib.deleteUser(user?.token, props.data?._id);

    if (reqData.status === "error") {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData?.data?.msg })
      helpers.sessionHasExpired(set, reqData.msg);
    }
    if (reqData.status === 'ok') {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Deleted' })
      setIsDeleteAccountModalVisible(false);
      navigate('/users')
    }
    setLoading(false);
  }

  const handleSuspendedAccountOk = () => {
    setIsSuspendedAccountModalVisible(false);
  }

  const handleVerifyAccountOk = async () => {
    if(user?.user_type === 'superadmin' || user?.access_level !== 3 ){
      let payload = {
        auth_id:  props.data?._id,
        verified_user_status: 1
      };
      setLoading(true);
      let reqData = await lib.verifyUserAccount( payload, user?.token)
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
        helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
      }
      if (reqData.status === 'ok') {
        helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account Updated' })
        // setIsVerifyAccountModalVisible(false);
      }
      setLoading(false);
    }else{
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'You are not authorized to perform this action' })

    }
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
      setIsResetAccountModalVisible(false);
    }
    setLoading(false);
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
  const handleVerifyAccountCancel = () => {
    setIsVerifyAccountModalVisible(false);
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
          <ActionButtonComponent text={"MAKE VERIFIED"} color="#276AFF" bgColor="#ECF2FF" onClick={showVerifyAccountModal} />
        </div>

        <div className='sidebar-action-button'>
          <ActionButtonComponent text={"DELETE ACCOUNT"} onClick={showDeleteAccountModal} />
        </div>

        <DeleteAccountModal load={load} isModalVisible={isDeleteAccountModalVisible} handleOk={handleDeleteAccountOk} handleCancel={handleDeleteAccountCancel} />
        <SuspendAccountModal load={load} isModalVisible={isSuspendedAccountModalVisible} handleOk={handleSuspendedAccountOk} handleCancel={handleSuspendedAccountCancel} />
        <VerifyAccountModal load={load} isModalVisible={isVerifyAccountModalVisible} handleOk={handleVerifyAccountOk} handleCancel={handleVerifyAccountCancel} />
        <ChangeUserPasswordModal load={load} isModalVisible={isResetAccountModalVisible} handleOk={handleResetAccountOk} handleCancel={handleResetAccountCancel} error={error} />
      </div>
    </>
  )
}



