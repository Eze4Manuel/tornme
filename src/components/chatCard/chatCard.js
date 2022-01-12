import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Empty, Button} from 'antd';
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
        support_id: props.selectedChat?._id
    }

    // When button is clicked this sends am chat message to the user
    const sendSupportMessage = async () => {
        setLoading(true);
        let reqData = await lib.sendSupportMessages(user?.token, payload);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg);
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Message Sent' })
            props.setMessages([...props?.data, reqData.data]);
        }
        setLoading(false);
    }

    return (
        <div className="chats">
                <>
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
                </>
                
                {/* <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                        height: 200,
                    }}
                    description={
                        <h2>
                            Select Sinlge Chat to View
                        </h2>
                    }
                >
                </Empty> */}
            
        </div>
    )
}

const ChatTile = (props) => {
    const { set, user } = useAuth();

    let style = {
        background: "#b9f6ca",
        fontSize: "16px",
        paddingLeft: "15px",
        color: "#000"
    }

    let style2 = {
        fontSize: "16px",
        paddingLeft: "15px",
        color: "#000"
    }
    return (
        <div className="chat-single-card" style={props.data?.auth_id === user?.auth_id ? { justifyContent: 'flex-end' } : null} >
            <span class={props.data?.auth_id === user?.auth_id ? "talk-bubble tri-left right-top" : "talk-bubble tri-right left-top"} style={props.data?.auth_id === user?.auth_id ? style : style2}>
                <div class="talktext" >
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