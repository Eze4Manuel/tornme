import { useState } from 'react';
import { ChatCard, ChatListCard } from '../../components/chatCard/chatCard';
import { Row, Col } from 'antd';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import lib from './lib';


export const Chats = (props) => {
  const { set, user } = useAuth();
  const [, setLoading] = useState(false);

  

  return (
    <Row>
      <Col>
        <ChatListCard
          style={{ "height": "500px" }}
          textColor={{ "color": "#276AFF" }}
          image={btc}
          active={props.chatActive}
          changeSelectedChat={props.changeSelectedChat}
          topLeft={"Chats"}
          data={props.chatMessages}
        />
      </Col>


      <Col flex={1}>
          <ChatCard
            style={{ "height": "500px", maxWidth: "100%" }}
            textColor={{ "color": "#276AFF" }}
            image={btc}
            changeSelectedChat={props.changeSelectedChat}
            topLeft={"Support"}
            selectedChat={props.selectedChat}
            data={props.messages}
            setMessages={props.setMessages}
          /> 
      </Col>
    </Row>
  )
}

export default Chats;