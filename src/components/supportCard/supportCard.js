import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './supportCard.scss';

export const SupportCard = (props) => {

    return (
        <div className="support-cards">
            <div className="support-cards-top">
                <span className="support-cards-top-title-left">
                    {props.topLeft}
                </span>
                <span className="support-cards-top-title-right">
                    {props.icon}
                    <Dropdown overlay={props.menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {props.topRight}
                            {props.topRight ?
                                <CaretDownFilled /> :
                                null }
                        </a>
                    </Dropdown>
                </span>
            </div>
            <div className="support-cards-middle">
                <img src={props.image} alt="logo" />
                <b className="support-cards-middle-text" style={props.textColor}>
                    {props.bottomText}
                </b>
            </div>
        </div>
    )
}