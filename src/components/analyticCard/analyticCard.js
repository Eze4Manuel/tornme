import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './analyticCard.scss';

export const AnalyticCard = (props) => {

    return (
        <div className="custom-cards">
            <div className="custom-cards-top">
                <span className="custom-cards-top-title-left">
                    {props.topLeft}
                </span>
                <span className="custom-cards-top-title-right">
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
            <div className="custom-cards-middle">
                <img src={props.image} alt="logo" />
                <b className="custom-cards-middle-text" style={props.textColor}>
                    {props.bottomText}
                </b>
            </div>
        </div>
    )
}