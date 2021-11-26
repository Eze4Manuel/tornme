import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import TableBlock from '../../components/table/table';
import { Menu, Row, Col, Tag } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import './users.scss';

import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image

const Finance = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
    </Menu>
  );


  const dataBundle = [
    {
      key: '1',
      name: 'John Brown',
      username: '@JohnnyBrown',
      phone_number: 32,
      earnings: 50200,
      followers: 32,
      status: ['online'],
      actions: ['suspended'],
    },
    {
      key: '2',
      name: 'Jim Green',
      username: '@JimmyGreen',
      phone_number: 42,
      earnings: 20000,
      followers: 32,
      status: ['online'],
      actions: ['suspended'],

    },
    {
      key: '3',
      name: 'Joe Black',
      username: '@23JohnBlack',
      phone_number: 32,
      earnings: 38400,
      followers: 32,
      status: ['online'],
      actions: ['suspended']
    },
    {
      key: '4',
      name: 'Joe Black',
      username: '@ForteJoeB',
      phone_number: 44,
      earnings: '22000',
      followers: 44,
      status: ['online'],
      actions: ['suspended']
    },
  ];


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
            if (stat === 'suspended') {
              color = 'volcano';
            }
            if (stat === 'online') {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={stat}>
                {stat.toUpperCase()}
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
            if (action === 'suspended') {
              color = 'volcano';
            }
            if (action === 'online') {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={action}>
                {action.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

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
            <TableBlock data={dataBundle} columns={columns} title={"Transactions"} export={true} />
          </Col>
        </Row>
      </div>
    </Structure>
  )
}
export default Finance;