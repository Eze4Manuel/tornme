import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Empty, } from 'antd';
import helpers from '../../core/func/Helpers';
import lib from '../../pages/support/lib';
import { useNotifications } from '@mantine/notifications';
import { useAuth } from '../../core/hooks/useAuth';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './chatCard.scss';
import '../supportCard/supportCard.scss';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const ChatCard = (props) => {
    const [values, setValues] = useState({});
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [load, setLoading] = useState(false);

    let payload = {
        message: values.message,
        support_id: props.data?._id
    }
    
    // When button is clicked this sends am chat message to the user
    const sendSupportMessage = async () => {
        setLoading(true);
        let reqData = await lib.sendSupportMessages(user?.token, payload);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Message Sent' })
        }
        setLoading(false);
    }

    return (
        <div className="chats">
            <div className="chat-cards" style={props.style} >                
                <div className="chat-cards-middle">
                    <div className="chat-cards-middle-chattile">
                        {props.data?.length !== 0 ?
                            props.data.map((data, ind) => (
                                <ChatTile data={data} changeSelectedChat={props.changeSelectedChat} active={props.active} key={ind} ind={ind} />
                            ))
                            :
                            props.load ? <Spin style={{ marginLeft: "10px" }} indicator={antIcon} /> : null
                        }
                    </div>
                </div>
            </div>
            <div className="chat-cards-message">
                <div className="chat-cards-message-block">
                    <span>
                        <input type="text" name="message" onChange={e => setValues(d => ({ ...d, message: e.target.value }))} value={values.message} placeholder="Type a message..."></input>
                        <button onClick={sendSupportMessage}><SendOutlined /></button>
                    </span>
                </div>
            </div>
        </div>
    )
}

const ChatTile = (props) => {
    return (
        <div className="chat-single-card">
            <span class="talk-bubble tri-right left-top">
                <div class="talktext">
                    <p>{props.data.message}</p>
                </div>
            </span>
        </div>
    )
}


export const ChatListCard = (props) => {
    return (
        <div style={{ minWidth: "300px" }}>
            <div className="support-cards" >
                <div className="support-cards-middle">
                    <div className="support-cards-middle-supporttile">
                        {props.data?.length !== 0 ?
                            props.data.map((data, ind) => (
                                <ChatListTile data={data} changeSelectedChat={props.changeSelectedChat} active={props.active} key={ind} ind={ind} />
                            ))
                            :
                            <Empty />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export const ChatListTile = (props) => {
    return (
        <div className='support-tile-card' onClick={() => props.changeSelectedChat(props.ind)} style={(props.active !== props.ind) ? { backgroundColor: "#EEF3FF", padding: "10px" } : { backgroundColor: "#b3bdec", padding: "10px" }}>
            <span>
                <p>{props.data.subject}</p>
                <p>
                    {props.data.description}
                </p>
            </span>

            <span className="supports-cards-middle-text" style={props.textColor}>
                {props.data.time}
            </span>
        </div>
    )
}