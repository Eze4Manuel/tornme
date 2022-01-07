import { useEffect, useState } from 'react';
import { SupportCard } from '../../components/supportCard/supportCard';
import { ChatCard } from '../../components/chatCard/chatCard';
import { Row, Col } from 'antd';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png';

import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from './lib';
import { StretchHorizontallyIcon } from '@modulz/radix-icons';


const chatSource = [
  { img: btc, userHandle: "@priewereer", time: '23h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
  { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
]

export const Chats = (props) => {
  const { set, user } = useAuth();
  const [chatMessages, setChatMessages] = useState([])

  // Getting support data
  useEffect(() => {
    (async () => {
      let reqData = await lib.getChats(null, user?.token)
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
      }
      if (reqData.status === 'ok') {
        setChatMessages(reqData.data)
        console.log(reqData);
      }
    })();
  }, [user?.token, set])


  return (
    <Row>
      <Col>
        <SupportCard
          style={{ "height": "500px" }}
          textColor={{ "color": "#276AFF" }}
          image={btc}
          topLeft={"Chats"}
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
  )
}

export default Chats;