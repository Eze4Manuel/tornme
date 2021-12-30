import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import TableBlock from '../../components/table/table';
import { Row, Col, Tag } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';
import './users.scss';
import { useNavigate } from "react-router-dom";
import lib from './lib';
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
      let reqData = await lib.get(user?.token, 'user');
      
      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setData(reqData.data)
      }
      setLoader(false);
      console.log(reqData.data);

    })();
  }, [user?.token, set])
 
  const dataBundle = data?.map( (e, ind) => {
    return {
      key: e.auth_id,
      name: e.name,
      username: e.username,
      phone_number: e.phone_number,
      earnings: '',
      followers: 32,
      status: [e.account_status],
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
      title: 'Action',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(statu => {
            let color = 'green'
            if (statu === 0) {
              color = 'volcano';
            }
            if (statu === 1) {
              color = 'green';
            }
            return (
              <Tag color={color} key={statu}>
                {statu === 0 ? 'SUSPENDED': 'ACTIVE'}
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