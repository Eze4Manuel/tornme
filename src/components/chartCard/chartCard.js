import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './chartCard.scss';
import React from 'react';
import { Line } from '@ant-design/charts';

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
                        <a href='/#' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {props.topRight}
                            {props.topRight ?
                                <CaretDownFilled /> :
                                null}
                        </a>
                    </Dropdown>
                </span>
            </div>
            <div className="chart-cards-middle">
                <div className="chart-cards-middle-text">
                    <DemoLine  data={props.data}/>
                </div>
            </div>
        </div>
    )
}

const DemoLine = (props) => { 
   
  const config = {
    data: props.data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 3,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Line {...config} />;
};

