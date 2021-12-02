import { SendOutlined } from '@ant-design/icons';
import './chatCard.scss';

export const ChatCard = (props) => {
    return (
        <div className="chats">
            <div className="chat-cards" style={props.style} >
                <div className="chat-cards-top">
                    <span className="chat-cards-top-title-left">
                        Chat with <a>{props.data[0].userHandle}</a>
                    </span>
                </div>
                <div className="chat-cards-middle">
                    <div className="chat-cards-middle-chattile">
                        {props.data.map((data, ind) => (
                            <ChatTile data={data} key={ind} />
                        )
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-cards-message">
                <div className="chat-cards-message-block">
                   <span>
                       <input type="text" name="message" placeholder="Type a message..."></input>
                       <button><SendOutlined /></button>
                   </span>
                </div>
            </div>
        </div>
    )
}


const ChatTile = (props) => {
    return (
        <div className="chat-single-card">
            <span className='chat-single-card-image'>
                <img src={props.data.img} alt="logo" />
            </span>
            <span class="talk-bubble tri-right left-top">
                <div class="talktext">
                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                </div>
            </span>
        </div>
    )
}