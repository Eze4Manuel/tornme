import React, {  useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { Row, Col } from 'antd';
// import { SupportCard } from '../../components/supportCard/supportCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image


// import { useAuth } from '../../core/hooks/useAuth';
// import { Select } from 'antd';

// import helpers from '../../core/func/Helpers';
// import lib from './lib';

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


const Notifications = () => {
  const [,] = useState('hidden');
  // const { set, user } = useAuth();
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
                {chatSource.map(elem => (
                  <SupportTile data={elem} />
                ))}
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
    <div className='support-tile-card' style={{ display: "flex", backgroundColor: "#EEF3FF", marginBottom: "10px", padding: "10px", borderRadius: "6px" }}>
      <span style={{ marginRight: "30px" }}>
        <img src={props.data.img} alt="logo" />
      </span>
      <span>
        <p><b>{props.data.userHandle}</b></p>
        <p>{props.data.userHandle}</p>

      </span>


    </div>
  )
}