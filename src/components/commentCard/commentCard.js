import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './commentCard.scss';

export const CommentCard = (props) => {

    return (
        <div className="comment-cards" style={props.style} >

            <div className="comment-cards-middle">
                <div className="comment-cards-middle-commenttile">
                    {props.data.map((data, ind) => (
                        <SupportTile data={data} key={ind} />
                    )
                    )}
                </div>
            </div>
        </div>
    )
}


const SupportTile = (props) => {
    return (
        <div className='comment-tile-card' style={{ backgroundColor: "#EEF3FF" }}>
            <span>
                <span>
                    <img src={props.data.img} alt="logo" />
                </span>
                <span>
                    <span>{props.data.userHandle}</span>
                    <span>
                        {props.data.text}

                    </span>
                    <span style={{marginLeft: "10px"}}><a>Reply</a></span>
                    <span style={{marginLeft: "10px"}}><a>Like</a></span>
                </span>
            </span>

            <span className="comments-cards-middle-text" style={props.textColor}>
                {props.data.time}
            </span>
        </div>
    )
}