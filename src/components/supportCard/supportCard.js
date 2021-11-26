import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './supportCard.scss';

export const SupportCard = (props) => {

    return (
        <div className="support-cards" style={props.style} >
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
                                null}
                        </a>
                    </Dropdown>
                </span>
            </div>
            <div className="support-cards-middle">

                <div className="support-cards-middle-supporttile">
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
        <div className='support-tile-card' style={{backgroundColor: "#EEF3FF"}}>
            <span>
                <img src={props.data.img} alt="logo" />
            </span>
            <span>
                <p>{props.data.userHandle}</p>
                <p>
                    {props.data.text}
                </p>
            </span>

            <span className="supports-cards-middle-text" style={props.textColor}>
                {props.data.time}
            </span>
        </div>
    )
}