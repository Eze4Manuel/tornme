import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import TableBlock from '../../components/table/table';
import { Menu, Row, Col, Tag } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import './finance.scss';

import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image

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
      username: 'John Brown',
      description: 32,
      amount: '50200',
      today: 32,
      status: ['suspended'],
    },
    {
      key: '2',
      username: 'Jim Green',
      description: 42,
      amount: '20000',
      today: 42,
      status: ['online'],
    },
    {
      key: '3',
      username: 'Joe Black',
      description: 32,
      amount: '38400',
      today: 32,
      status: ['suspended'],
    },
    {
      key: '4',
      username: 'Joe Black',
      description: 44,
      amount: '22000',
      today: 44,
      status: ['success'],

    },
    {
      key: '5',
      username: 'Joe Black',
      description: 52,
      amount: '45000',
      today: 52,
      status: ['online'],
    },

    {
      key: '6',
      username: 'John Brown',
      description: 32,
      amount: '50200',
      today: 32,
      status: ['suspended'],
    },
    {
      key: '7',
      username: 'Jim Green',
      description: 42,
      amount: '20000',
      today: 42,
      status: ['online'],
    },
    {
      key: '8',
      username: 'Joe Black',
      description: 32,
      amount: '38400',
      today: 32,
      status: ['suspended'],
    },
    {
      key: '9',
      username: 'Joe Black',
      description: 44,
      amount: '22000',
      today: 44,
      status: ['success'],

    },
    {
      key: '10',
      username: 'Joe Black',
      description: 52,
      amount: '45000',
      today: 52,
      status: ['online'],
    },
  ];


const columns = [
  {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
  },
  {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
  },
  {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
  },

  {
      title: 'Day',
      key: 'today',
      dataIndex: 'today',
      filters: [
          {
              text: 'Yesterday',
              value: 35,
          },
          {
              text: 'Last week',
              value: 45,
          },

      ],
      onFilter: (value, record) => record.today < value,

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
];

  return (
    <Structure className="finance">
      <PageHeaderComp title="Finance" />
      <div className="finance-top">
        <Row>
          <Col flex={1}>
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

        </Row>
      </div>
      <div className="finance-data" style={{"margin-top": "40px"}}>
        <Row>
          <Col flex={1}>
            <TableBlock data={dataBundle} columns = {columns} title={"Transactions"} export={true}/>
          </Col>
        </Row>
      </div>
    </Structure>
  )
}
export default Finance;