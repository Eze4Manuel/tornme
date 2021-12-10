import { SendOutlined } from '@ant-design/icons';
import './userPostsCard.scss';

export const UsersPostCard = (props) => {
    return (
        <div className="userposts">
            <div className="post-cards" style={props.style} >
                <div className="post-cards-top">
                    <span className="post-cards-top-title-left">
                        Chat with <a>{props.data[0].userHandle}</a>
                    </span>
                </div>
                <div className="post-cards-middle">
                    <div className="post-cards-middle-posttile">
                        {props.data.map((data, ind) => (
                            <ChatTile data={data} key={ind} />
                        )
                        )}
                    </div>
                </div>
            </div>
            <div className="post-cards-message">
                <div className="post-cards-message-block">
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
        <div className="post-single-card">
            <span className='post-single-card-image'>
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