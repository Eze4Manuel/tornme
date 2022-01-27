import React, { useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { Row, Col, Empty } from 'antd';
import { useLocation } from "react-router"
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import { NotificationModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from './lib';
import './notifications.scss';
import '../profile/profile.scss';


const chatSource = [
  { img: btc, userHandle: "@priewereer", time: '23h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
  { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
]


const Notifications = (props) => {
  const [,] = useState('hidden');
  const location = useLocation();
  const notify = useNotifications();
  const [elem, setElem] = useState({});
  const [load, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  const { set, user } = useAuth();
  // const [, setLoader] = useState(false);

  // // data 
  // useEffect(() => {
  //   (async () => {
  //     setLoader(true)
  //     let reqData = await lib.get(null, user?.token, 'admin')
  //     if (reqData.status === "error") {
  //       helpers.sessionHasExpired(set, reqData.msg)
  //     }
  //     if (reqData.status === 'ok') {

  //     }
  //     setLoader(false);
  //   })();
  // }, [user?.token, set])

  const handleNotifiactionOk = async (notification_id) => {

    setLoading(true);
    let reqData = await lib.deleteNotification(notification_id, user?.token);
    if (reqData.status === "error") {
      helpers.sessionHasExpired(set, reqData.msg)
    }
    if (reqData.status === 'ok') {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Notification Deleted' })
    }
    setLoading(false);
    console.log(reqData);
    setIsNotificationModalVisible(false);
  }
  const handleNotifiactionCancel = () => {
    setIsNotificationModalVisible(false);
  }


  const handleNotificationClick = (elem) => {
    setElem(elem)
    setIsNotificationModalVisible(true);
  }


  return (
    <Structure className="support" >
      <div style={{ width: "70%", margin: "auto" }}>
        <Row justify="space-between">
          <PageHeaderComp title="Notifications" />
        </Row>
        <div className="support-top">
          <Row>
            <Col flex={1}>
              <div style={{ background: "#fff", padding: "20px" }}>
                {
                  location?.state.notifics?.length > 0 ?
                  <>
                  {location?.state.notifics?.map((elem, ind) => (
                    <SupportTile data={elem} key={ind} handleNotificationClick={handleNotificationClick} />
                  ))}
                  <NotificationModal data={elem} handleOk={handleNotifiactionOk} handleCancel={handleNotifiactionCancel} setIsNotificationModalVisible={setIsNotificationModalVisible} load={load} isNotificationModalVisible={isNotificationModalVisible} error={error} />
                  </>                  
                  :
                    <Empty description = {
                      <span>
                        No Notification
                      </span>
                    } />
                }                
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Structure>
  )
}
export default Notifications;



const SupportTile = (props) => {
  return (
    <div onClick={() => props.handleNotificationClick(props.data)} className='support-tile-card' style={{ display: "flex", backgroundColor: "#EEF3FF", marginBottom: "10px", padding: "10px", borderRadius: "6px" }}>
      <span>
        <p><b>{props.data.title}</b></p>
        <p>{props.data.message}</p>
      </span>
    </div>
  )
}