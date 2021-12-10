import React, { useState } from 'react';


import Structure from "../../components/layout/index";
import { Row, Col, Menu, Modal } from 'antd';
import { } from '../../components/supportCard/supportCard';
import { UsersPostCard } from '../../components/userPostsCard/userPostsCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { useNavigate } from "react-router-dom";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import { ChangePassword } from '../changePassword/index';
import './users.scss';
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import person from '../../assets/images/icons/person.png'; // Tell webpack this JS file uses this image
import { GoBackComponent, ActionButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { SuspendAccountModal, DeleteAccountModal } from '../../components/modalComponents/modalComponents';

const supportSource = [
  { img: btc, userHandle: "@priewereer", time: '23h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
  { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
]

const UsersPosts = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/users')
  }

  return (
    <Structure className="support">
      <GoBackComponent text="Go Back" onClick={goBack} />
      <div className="support-top">
        <Row>
          <Col flex={7}>
            <UsersPostCard
              style={{}}
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Support"}
              data={supportSource}
            />
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
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
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
          bottomText={1, 453}
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


