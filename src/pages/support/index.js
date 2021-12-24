import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { Row, Col } from 'antd';
import { SupportCard } from '../../components/supportCard/supportCard';
import { PersonnelCard } from '../../components/personnelCard/personnelCard';
import { ChatCard } from '../../components/chatCard/chatCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { useAuth } from '../../core/hooks/useAuth';
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import { useNavigate } from 'react-router';
import { useNotifications } from '@mantine/notifications';
import ErrorMessage from '../../components/error/ErrorMessage';
import { Select } from 'antd';

import { CreateAdminModal } from '../../components/modalComponents/modalComponents';

import { Form, Input } from 'antd';

import helpers from '../../core/func/Helpers';
import formValidator from './formvalidation';
import lib from './lib';

import './support.scss';
import '../profile/profile.scss';


import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

const chatSource = [
  { img: btc, userHandle: "@priewereer", time: '23h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
  { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
]


const Support = () => {

  const [active, SetActive] = useState(true);
  const [form] = Form.useForm();
  const [,] = useState('hidden');
  const { set, user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const notify = useNotifications();
  const [personnelData, setPersonnelData] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [personnelActive, setPersonnelActive] = useState(0);
  const [, setLoader] = useState(false);
  const [load, setLoading] = useState(false);
  const [error, setError] = useState('')
  let navigate = useNavigate();


  // data 
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

  const handleFlip = () => {
    SetActive(!active)
  }


  const handleUpdate = async () => {
    if (user?.user_type === 'superadmin' || user?.access_level == 3) {
      let builder = formValidator.validateAdminUpdate(selectedAdmin, personnelData[personnelActive], {}, setError)
      if (!builder) {
        return
      }
      builder.auth_id = selectedAdmin?.auth_id;

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


  const handleDelete = async () => {
    if (user?.user_type === 'superadmin' || user?.access_level == 3) {
      setLoading(true);

      let reqData = await lib.delete(user?.token, selectedAdmin.auth_id)
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
      }
      if (reqData.status === 'ok') {
        helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Admin Account Deleted' })
      }
      setLoading(false);
    } else {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
    }

  }


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAdminCreate = async (values) => {
    if (user?.user_type === 'superadmin' || user?.access_level == 3) {
      setError('');
      try {
        let builder = formValidator.validateCreateAdmin(values, {}, setError);
        if (!builder) return;
        setLoading(true);

        let reqData = await lib.createAdmin(builder, user?.token);
  
        if (reqData.status === "error") {
          helpers.sessionHasExpired(set, reqData.msg);
          helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
          helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Admin account created' })
        }
        setLoading(false);
  
      } catch (err) {
        setLoading(false);
        setError(err?.response?.data?.msg || err?.message)
      }
      setIsModalVisible(false);
    }else {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
    }
    
  };



  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const changeSelectedAdmin = (e) => {
    setSelectedAdmin(personnelData[e]);
    setPersonnelActive(e)
  }


  
  return (
    <Structure className="support">
      <Row justify="space-between">
        <PageHeaderComp title="Support" />
        <ButtonComponent onClick={showModal} style={{ ...styleActive, borderRadius: "6px", width: "200px" }} text="CREATE ADMIN" />

        <CreateAdminModal load={load} error={error} handleOk={handleAdminCreate} handleCancel={handleCancel} isModalVisible={isModalVisible} />

      </Row>


      <div className="support-top">
        <Row>
          <Col flex={2}>
            <ButtonComponent onClick={handleFlip} text="Chats" style={active ? styleActive : styleInactive} />
          </Col>
          <Col flex={2}>
            <ButtonComponent onClick={handleFlip} text="Personel" style={!active ? styleActive : styleInactive} />
          </Col>
        </Row>

        {active ?
          <Row>
            <Col>
              <SupportCard
                style={{ "height": "500px" }}
                textColor={{ "color": "#276AFF" }}
                image={btc}
                topLeft={"Support"}
                data={chatSource}
              />
            </Col>
            <Col flex={1}>
              <ChatCard
                style={{ "height": "500px", maxWidth: "100%" }}
                textColor={{ "color": "#276AFF" }}
                image={btc}
                topLeft={"Support"}
                data={chatSource}
              />
            </Col>
          </Row>
          :
          <>
            <Row>
              <Col>
                <PersonnelCard
                  style={{ "height": "500px" }}
                  textColor={{ "color": "#276AFF" }}
                  image={btc}
                  topLeft={""}
                  data={personnelData}
                  changeSelectedAdmin={changeSelectedAdmin}
                  active={personnelActive}
                />
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
                          <Input onChange={e => setSelectedAdmin(d => ({ ...d, name: e.target.value }))} value={selectedAdmin?.name} placeholder="John" style={{ width: "350px", marginRight: "10px" }} />
                        </Form.Item>

                        <Form.Item label="Username">
                          <Input onChange={e => setSelectedAdmin(d => ({ ...d, username: e.target.value }))} value={selectedAdmin?.username} placeholder="Doe" style={{ width: "350px", marginRight: "10px" }} />
                        </Form.Item>
                      </div>
                      <div className='form-group'>
                        <Form.Item label="Email">
                          <Input onChange={e => setSelectedAdmin(d => ({ ...d, email: e.target.value }))} value={selectedAdmin?.email} placeholder="example@gmail.com" style={{ width: "350px", marginRight: "10px" }} />
                        </Form.Item>

                        <Form.Item label="Phone Number" >
                          <Input onChange={e => setSelectedAdmin(d => ({ ...d, phone_number: e.target.value }))} value={selectedAdmin?.phone_number} placeholder="0801 234 5678" style={{ width: "350px", marginRight: "10px" }} />
                        </Form.Item>
                      </div>

                      <div className='form-group'>
                        <Form.Item label="Permission Level">
                          <Select defaultValue={selectedAdmin?.access_level} style={{ width: "350px" }} onChange={e => setSelectedAdmin(d => ({ ...d, access_level: e }))}>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>                           
                          </Select>
                          
                        </Form.Item>
                      </div>
                    </div>

                    <div className="profile-password">
                      <div className='form-group'>
                        <Form.Item style={{ width: "350px", marginRight: "10px" }}>
                          <ButtonComponent style={styles} onClick={handleUpdate} text="UPDATE" />
                        </Form.Item>
                        {load ? <Spin style={{marginRight: "10px"}} indicator={antIcon} /> : null}
                        <Form.Item style={{ width: "350px", marginRight: "10px" }}>
                          <ButtonComponent style={styles} onClick={handleDelete} text="DELETE ADMIN" />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </>
        }
      </div>
    </Structure>
  )
}
export default Support;


