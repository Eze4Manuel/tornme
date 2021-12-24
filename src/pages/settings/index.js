import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import { Menu, Row, Col, Tag } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import { useAuth } from '../../core/hooks/useAuth';
import './settings.scss';
import { useNavigate } from "react-router-dom";
import lib from './lib';
import btc from '../../assets/images/icons/btc.png';
import helpers from '../../core/func/Helpers';

const Settings = () => {
  const navigate = useNavigate();
  const { set, user} = useAuth();
  const [,setLoader] = useState(false);
  const [data,setData] = useState([]);
  // data 
  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.get(user?.token);
      
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setData(reqData.data)
      }
      setLoader(false);

    })();
  }, [user?.token, set])


  const menu = (
    <Menu>
      
    </Menu>
  );

  
  const dataBundle = data?.map( (e, ind) => {
    return {
      key: e.auth_id,
      name: e.name,
      username: e.username,
      phone_number: e.phone_number,
      earnings: '',
      followers: 32,
      status: [e.account_status],
      actions: [e.status_visibility_access],
    }
  });

 

  return (
    <Structure className="settings">
      <PageHeaderComp title="Settings" />
      <div className="settings-top">
        <Row>
          <Col>
            <AnalyticCard
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Wallet Percentage"}
              bottomText={0.5989}
              menu={menu}
              topRight={"Today"}
              icon={<ReloadIcon />}
            />
          </Col>
          
        </Row>
      </div>
       
    </Structure>
  )
}
export default Settings;