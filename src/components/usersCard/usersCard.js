import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './usersCard.scss';

export const UsersCard = (props) => {

    return (
        <div className="users-card">
            <div className="users-cards-top">
                <span className="users-cards-top-title-left">
                    {props.topLeft}
                </span>
                <span className="users-cards-top-title-right">
                    <div>
                        {props.icon}
                        <Dropdown overlay={props.menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {props.topRightFirst}
                                {props.topRightFirst ?
                                    <CaretDownFilled /> :
                                    null}
                            </a>
                        </Dropdown>
                    </div>
                    <div>
                        {props.icon}
                        <Dropdown overlay={props.menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {props.topRightSecond}
                                {props.topRightSecond ?
                                    <CaretDownFilled /> :
                                    null}
                            </a>
                        </Dropdown>
                    </div>
                </span>
            </div>
            <div className="users-cards-middle">
                <img src={props.image} alt="logo" />
                <b className="users-cards-middle-text" style={props.textColor}>
                    {props.bottomText}
                </b>
            </div>
        </div>
    )
}