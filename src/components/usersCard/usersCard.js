import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './usersCard.scss';
import { Pie, measureTextWidth } from '@ant-design/charts';

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
                            <a href='/#' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
                            <a href='/#' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
                <div className="users-cards-middle-text" style={props.textColor} >
                    <DemoPie data = {props.data}/>
                </div>
                {console.log(props.data)}
                <div className="users-cards-middle-bullets">
                  {
                    props.data.map(e => (
                      <span>
                      <h3>{e.value}</h3>
                      <p>{e.type}</p>
                  </span>
                      ))
                  }
                    
                     
                </div>
            </div>
            
        </div>
    )
}




const DemoPie = (props) => {
    function renderStatistic(containerWidth, text, style) {
      const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
      const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
  
      let scale = 1;
  
      if (containerWidth < textWidth) {
        scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
      }
  
      const textStyleStr = `width:${containerWidth}px;`;
      return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }
  
    const config = {
      appendPadding: 10,
      data: props.data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.74,
      meta: {
        // value: {
        //   formatter: (v) => `${v} ¥`,
        // },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center',
        },
        autoRotate: false,
        content: '{value}',
      },
      statistic: {
        title: {
            offsetY: -4,
            offsetX: -8,
            customHtml: (container, view, datum) => {
            const d = Math.sqrt(Math.pow(100 / 2, 2) + Math.pow(100 / 2, 2));
            const text = datum ? datum.type : 'Total user';
            return renderStatistic(d, text, {
              fontSize: 16,
            });
          },
        },
        content: {
          offsetY: 9,
          style: {
            fontSize: '22px',
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect();
            const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
            return renderStatistic(width, text, {
              fontSize: "22px",
              textAlign: "left"
            });
          },
        },
      },
      // 添加 中心统计文本 交互
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
        {
          type: 'pie-statistic-active',
        },
      ],
    };
    return <Pie {...config} />;
  };
  
  