import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './topUserCard.scss';

export const TopUserCard = (props) => {

    return (
        <div className="topuser-cards">
            <div className="topuser-cards-top">
                <span className="topuser-cards-top-title-left">
                    {props.topLeft}
                </span>
                <span className="topuser-cards-top-title-right">
                    {props.icon}
                    <Dropdown overlay={props.menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {props.topRight}
                            {props.topRight ?
                                <CaretDownFilled /> :
                                null}
                        </a>
                    </Dropdown>
                </span>
            </div>
            <div className="topuser-cards-middle">
                <div className="topuser-cards-middle-subtitle">
                    <span>Username</span>
                    <span>Followers</span>
                </div>
                <div className="topuser-cards-middle-usertile">
                    {props.data.map((data, ind) => (
                        <UserTile data={data} key={ind}/>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}


const UserTile = (props) => {

    return (
        <div className='user-tile-card'>
            <span>
                <img src={props.data.img} alt="logo" />
                <span>{props.data.userHandle}</span>
            </span>
            <span className="users-cards-middle-text" style={props.textColor}>
                {props.data.followers}
            </span>
        </div>
    )
}