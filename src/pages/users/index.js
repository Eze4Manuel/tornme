import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import TableBlock from '../../components/table/table';
import { Menu, Row, Col, Tag } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import { useAuth } from '../../core/hooks/useAuth';
import './users.scss';
import { useNavigate } from "react-router-dom";
import lib from './lib';
import btc from '../../assets/images/icons/btc.png';
import helpers from '../../core/func/Helpers';

const Users = () => {
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


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
      sorter: (a, b) => a.followers - b.followers,
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      sorter: (a, b) => a.earnings - b.earnings,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(stat => {
            let color = 'green'
            if (stat === 0) {
              color = 'volcano';
            }
            if (stat === 1) {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={stat}>
                {(stat == 0) ? 'OFFLINE': 'ONLINE'}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      dataIndex: 'actions',
      render: actions => (
        <>
          {actions.map(action => {
            let color = 'green'
            if (action === 0) {
              color = 'volcano';
            }
            if (action === 1) {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={action}>
                {action == 0 ? 'SUSPENDED': 'ACTIVE'}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const onRowSelected = (record) => {
    navigate('/user-posts', { state: {record: record}, replace: false })
  }

  return (
    <Structure className="users">
      <PageHeaderComp title="Users" />
      <div className="users-top">
        <Row>
          <Col>
            <AnalyticCard
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Your Earnings"}
              bottomText={0.5989}
              menu={menu}
              topRight={"Today"}
              icon={<ReloadIcon />}
            />
          </Col>
          <Col>
            <AnalyticCard
              textColor={{ "color": "#276AFF" }}
              image={btc}
              topLeft={"Content Subscribers"}
              bottomText={0.5989}
            />
          </Col>
        </Row>
      </div>
      <div className="finance-data" style={{ "margin-top": "40px" }}>
        <Row>
          <Col flex={1}>
            <TableBlock  onSelected={onRowSelected} data={dataBundle} columns={columns} title={""} export={true} />
          </Col>
        </Row>
      </div>
    </Structure>
  )
}
export default Users;