import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { Row, Col } from 'antd';
// Tell webpack this JS file uses this image
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import Chats from './chats'
import Faq from './faq';
import SupportTab from './supportTab';
import Personnel from './personnel';
import { CreateAdminModal } from '../../components/modalComponents/modalComponents';
import { CreateFaqModal, } from '../../components/modalComponents/modalComponents';
import helpers from '../../core/func/Helpers';
import formValidator from './formvalidation';
import lib from './lib';
import './support.scss';
import '../profile/profile.scss';



const Support = () => {
  const [active, SetActive] = useState('chats');
  const { set, user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
  const [, setIsSupportModalVisible] = useState(false);
  const notify = useNotifications();
  const [personnelData, setPersonnelData] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [, setLoader] = useState(false);
  const [load, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [supportData, setSupportData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [selectedChat, setSelectedChat] = useState([])
  const [chatMessages, setChatMessages] = useState([])

  // Fetching Personnel data 
  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.get(null, user?.token, 'admin')
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
      }
      if (reqData.status === 'ok') {
        setPersonnelData(reqData.data)
        setSelectedAdmin(reqData.data[0])
      }
      setLoader(false);
    })();
  }, [user?.token, set])


  // Getting Chat data
  useEffect(() => {
    (async () => {
      let reqData = await lib.getAdminChats(user?.auth_id, user?.token)
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
      }
      if (reqData.status === 'ok') {
        setChatMessages(reqData.data)
        setSelectedChat(reqData.data[0]);
      }
    })();
  }, [user?.token, set])

  const styleActive = {
    color: "#ffffff",
    fontWeight: "800",
    background: "#276AFF",
    border: "none",
    paddingTop: "12px",
    paddingBottom: "12px",
    width: "100%",
    borderRadius: "0px"
  }
  const styleInactive = {
    color: "#276AFF",
    background: "#ffffff",
    fontWeight: "800",
    border: "none",
    paddingTop: "12px",
    paddingBottom: "12px",
    width: "100%",
    borderRadius: "0px"
  }



  // Switches tabs
  const handleFlip = (tab) => {
    SetActive(tab)
  }

  // Toggles create admin modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Toggles create Faq modal
  const showFaqModal = () => {
    setIsFaqModalVisible(true);
  };
 
  const faqCreate = async (value) => {
    let builder = formValidator.validateFaqCreate(value, {}, setError)
    if (!builder) return
    setLoading(true);

    let reqData = await lib.createFaq(builder, user?.token)
    if (reqData.status === "error") {
      helpers.sessionHasExpired(set, reqData.msg)
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
    }
    if (reqData.status === 'ok') {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Created' })
      setIsSupportModalVisible(false);
    }
    setLoading(false);
  };

  const faqCancel = () => {
    setIsFaqModalVisible(false)
  }; 

  const handleAdminCreate = async (values) => {

    // Only superadmin and admin with access level 3
    if (user?.access_level === 3 || user?.user_type === 'superadmin') {
      setError('');
      try {
        let builder = formValidator.validateCreateAdmin(values, {}, setError);
        if (!builder) return;
        setLoading(true);
        console.log(builder);

        let reqData = await lib.createAdmin(builder, user?.token);

        if (reqData.status === "error") {
          helpers.sessionHasExpired(set, reqData.msg);
          helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
          helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Account created' })
        }
        setLoading(false);

      } catch (err) {
        setLoading(false);
        setError(err?.response?.data?.msg || err?.message)
      }
      // setIsModalVisible(false);
    } else {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Structure className="support">
      <Row justify="space-between">
        <PageHeaderComp title="Support" />
        {active === 'personnel' ? <ButtonComponent onClick={showModal} style={{ ...styleActive, borderRadius: "6px", width: "200px" }} text="CREATE ACCOUNT" /> : null}
        {active === 'faq' ?
          <ButtonComponent onClick={showFaqModal} style={{ ...styleActive, borderRadius: "6px", width: "200px" }} text="CREATE FAQ" />
          : null
        }
        <CreateAdminModal load={load} error={error} handleOk={handleAdminCreate} handleCancel={handleCancel} isModalVisible={isModalVisible} />
        <CreateFaqModal load={load} error={error} handleOk={faqCreate} handleCancel={faqCancel} isFaqModalVisible={isFaqModalVisible} />
      </Row>
      <div className="support-top">
        <Row>
          <Col flex={2}>
            <ButtonComponent onClick={() => handleFlip('chats')} text="Chats" style={active === 'chats' ? styleActive : styleInactive} />
          </Col>
          <Col flex={2}>
            <ButtonComponent onClick={() => handleFlip('support')} text="Support" style={active === 'support' ? styleActive : styleInactive} />
          </Col>
          <Col flex={2}>
            <ButtonComponent onClick={() => handleFlip('faq')} text="Faq" style={active === 'faq' ? styleActive : styleInactive} />
          </Col>
          <Col flex={2}>
            <ButtonComponent onClick={() => handleFlip('personnel')} text="Personnel" style={active === 'personnel' ? styleActive : styleInactive} />
          </Col>
        </Row>
        <>
          {
            // Conditionally rendering module blocks 
            active === 'chats' ?
              <Chats chatMessages={chatMessages} setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
              : active === 'support' ?
                <SupportTab setSupportData={setSupportData} supportData={supportData} personnelData={personnelData} />
                : active === 'faq' ?
                  <Faq setFaqData={setFaqData} faqData={faqData} personnelData={personnelData} />
                  :
                  <Personnel personnelData={personnelData} selectedAdmin={selectedAdmin} setSelectedAdmin={setSelectedAdmin} />
          }
        </>
      </div>
    </Structure>
  )
}
export default Support;


