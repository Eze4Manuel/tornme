import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { Row, Col } from 'antd';
import { SupportCard } from '../../components/supportCard/supportCard';
import { ChatCard } from '../../components/chatCard/chatCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import './support.scss';

const supportSource = [
  { img: btc, userHandle: "@priewereer", time: '23h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
  { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
  { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
]

const Finance = () => {

  return (
    <Structure className="support">
      <PageHeaderComp title="Support" />
      <div className="support-top">
        <Row>
          <Col>
            <SupportCard
              style={{"height": "500px" }}
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Support"}
              data={supportSource}
            />
          </Col>
          <Col flex={1}>
            <ChatCard
              style={{"height": "500px"}}
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Support"}
              data={supportSource}
            />
          </Col>
        </Row>
      </div>
    </Structure>
  )
}
export default Finance;