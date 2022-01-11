import { useState, useEffect } from 'react';
import { ChatCard, ChatListCard } from '../../components/chatCard/chatCard';
import { Row, Col } from 'antd';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import lib from './lib';


export const Chats = (props) => {
  const { set, user } = useAuth();
  const [chatActive, setChatActive] = useState(0);
  const [load, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

 


  // This gets called when admin switches between support assigned to him
  const changeSelectedChat = async (selected) => {
    props.setSelectedChat(props.chatMessages[selected]);
    setChatActive(selected);
    setLoading(true);
    
      // Fetching support chats for specific support message
      let reqData = await lib.getUserSupportChats(props.selectedChat?._id, user?.token)
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg)
      }
      if (reqData.status === 'ok') {
        setMessages(reqData.data)
      }
      console.log(reqData);
      setLoading(false);
  }

  return (
    <Row>
      <Col>
        <ChatListCard
          style={{ "height": "500px" }}
          textColor={{ "color": "#276AFF" }}
          image={btc}
          active={chatActive}
          changeSelectedChat={changeSelectedChat}
          topLeft={"Chats"}
          data={props.chatMessages}
        />
      </Col>
      <Col flex={1}>
        <ChatCard
          style={{ "height": "500px", maxWidth: "100%" }}
          textColor={{ "color": "#276AFF" }}
          image={btc}
          changeSelectedChat={changeSelectedChat}
          topLeft={"Support"}
          data={messages}
        />
      </Col>
    </Row>
  )
}

export default Chats;