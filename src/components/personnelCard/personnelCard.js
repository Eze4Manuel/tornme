import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './personnelCard.scss';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image

export const PersonnelCard = (props) => {

    return (
        <div className="personnel-cards" style={props.style} >        
            <div className="personnel-cards-middle">
                <div className="personnel-cards-middle-personneltile">
                    {props.data.map((data, ind) => (
                        <PersonnelTile data={data} changeSelectedAdmin={props.changeSelectedAdmin} id={ind} active={props.active} key={ind} />
                    )
                    )}
                </div>
            </div>
        </div>
    )
}


const PersonnelTile = (props) => {
     return (
        <div className='personnel-tile-card' onClick={()=> props.changeSelectedAdmin(props.id)} style={props.id == props.active ? {backgroundColor: "#b3bde6"} : {backgroundColor: "#EEF3FF"}}>
            <span>
                <img src={btc} alt="logo" />
            </span>
            <span>
                <p>{props.data.username}</p>
                <p>
                    Level {props.data.access_level}
                </p>
            </span>
        </div>
    )
}