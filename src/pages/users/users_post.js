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

import lib from './lib';
import helpers from '../../core/func/Helpers';


const UsersPosts = (props, history) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [,setLoader] = useState(false);
  const [ userData, setuserData ] = useState({});
  const { set, user} = useAuth();

  
  useEffect(()=>{
    (async () => {
      setLoader(true)
      let reqData = await lib.getUserDetail(user?.token, state.record.key);
      
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
    <Structure className="support">
      <GoBackComponent text="Go Back" onClick={goBack} />
      <div className="support-top">
        <Row>
          <Col flex={20}>
            <UsersPostCard data={userData}/>
          </Col>
          <Col flex={1}>
            <div className="sidebar">
              <SideBarFeatures />
              <SideBarActions />
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

const SideBarActions = () => {
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] = useState(false);
  const [isSuspendedAccountModalVisible, setIsSuspendedAccountModalVisible] = useState(false);
  const [isResetAccountModalVisible, setIsResetAccountModalVisible] = useState(false);

  const showDeleteAccountModal = () => {
    setIsDeleteAccountModalVisible(true);
  };
  const showSuspendedAccountModal = () => {
    setIsSuspendedAccountModalVisible(true);
  };
  const showResetAccountModal = () => {
    setIsResetAccountModalVisible(true);
  };



  const handleDeleteAccountOk = () => {
    setIsDeleteAccountModalVisible(false);

  }
  const handleSuspendedAccountOk = () => {
    setIsSuspendedAccountModalVisible(false);

  }
  const handleResetAccountOk = () => {
    setIsResetAccountModalVisible(false);

  }


  const handleDeleteAccountCancel = () => {
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

        <DeleteAccountModal isModalVisible={isDeleteAccountModalVisible} handleOk={handleDeleteAccountOk} handleCancel={handleDeleteAccountCancel} />
        <SuspendAccountModal isModalVisible={isSuspendedAccountModalVisible} handleOk={handleSuspendedAccountOk} handleCancel={handleSuspendedAccountCancel} />

        <Modal visible={isResetAccountModalVisible} onOk={handleResetAccountOk} onCancel={handleResetAccountCancel} footer={null} style={{textAlign: "center", borderRadius:"8px"}}>
          <ChangePassword />
        </Modal>
      </div>
    </>
  )
}


