import ReactDOM from 'react-dom';
import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './chartCard.scss';
import { TinyArea } from '@ant-design/charts';

export const ChartCard = (props) => {

    return (
        <div className="chart-card">
            <div className="chart-cards-top">
                <span className="chart-cards-top-title-left">
                    {props.topLeft}
                </span>
                <span className="chart-cards-top-title-right">
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
            <div className="chart-cards-middle">
                <div className="chart-cards-middle-text" style={props.textColor}>
                    <chart />
                </div>
            </div>
        </div>
    )
}
