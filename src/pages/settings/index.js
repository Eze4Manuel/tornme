import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { ButtonComponent,  } from '../../components/buttonComponent/buttonComponent';
import Structure from "../../components/layout/index";
import { CaretDownFilled } from '@ant-design/icons';
import { Row, Col,  } from 'antd';
import { Modal, } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';
import './settings.scss';
import lib from './lib';
import btc from '../../assets/images/icons/btc.png';
import helpers from '../../core/func/Helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import { Form, Input } from 'antd';
import { useNotifications } from '@mantine/notifications';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const Settings = () => {
  const { set, user } = useAuth();
  const [load, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const notify = useNotifications();
  const [error, setError] = useState('');

  // data 
  useEffect(() => {
    (async () => {
      let reqData = await lib.getWalletSttings(user?.token);

      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setData(reqData.data)
      }
    })();
  }, [user?.token, set])



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (val) => {
    if (user?.user_type === 'superadmin') {
      let temp = parseInt(val.percentage);

      if (Number.isInteger(temp)) {
        setError("");
        temp = temp / 100;

        setLoading(true)

        let reqData = await lib.updateWallet(user?.token, {percentage: temp.toString() })
        if (reqData.status === "error") {
          helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
          helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Wallet Settings Updated' })
        }
        setLoading(false);
      }else{
        setError("Input must be a number");
      }

    } else {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <Structure className="settings">
      <PageHeaderComp title="Settings" />
      <div className="settings-top">
        <Row>
          <Col>
            <AnalyticCardWallet
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Wallet Percentage"}
              bottomText={data?.percentage ? data?.percentage * 100 + "%" : 0}
              topRight={"Update"}
              onClick={showModal}
            />
          </Col>
        </Row>
      </div>

      <UpdateWalletModal load={load} error={error} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </Structure>
  )
}
export default Settings;



const AnalyticCardWallet = (props) => {

  return (
    <div className="custom-cards">
      <div className="custom-cards-top">
        <span className="custom-cards-top-title-left">
          {props.topLeft}
        </span>
        <span className="custom-cards-top-title-right" onClick={props.onClick}>
          {props.icon}
          <a href='javascriot:void(0)' className="ant-dropdown-link" >
            {props.topRight}
            {props.topRight ?
              <CaretDownFilled /> :
              null}
          </a>
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


const UpdateWalletModal = (props) =>{
  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  return (
    <Modal visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel} footer={false} style={{borderRadius: "6px"}}>
    <div className="modal_block_logout" style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
      <PageHeaderComp title="Update Wallet" />

      <Form form={form} layout="vertical" >
        <div className="" >
          {props.error ? <ErrorMessage message={props.error} /> : null}

          <div className='form-group' >
            <Form.Item label="Set Percentage">
              <Input placeholder="10" onChange={e => setValues(d => ({ ...d, percentage: e.target.value }))} value={values.percentage} style={{ width: "350px", marginRight: "10px" }} />
            </Form.Item>
          </div>
        </div>

        <div className="profile-password">
          <div className='form-group' style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {props.load ? <Spin style={{margin: "auto"}} indicator={antIcon} /> : null}

            <Form.Item style={{margin: "auto", marginTop: "18px" }}>
              <ButtonComponent onClick={() => props.handleOk(values)} text="UPDATE" />
            </Form.Item>
          </div>
        </div>
      </Form>
      <br />
    </div>
  </Modal>
  )
}