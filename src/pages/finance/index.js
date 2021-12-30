import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import TableBlock from '../../components/table/table';
import { Row, Col, Tag } from 'antd';
import './finance.scss';


const Finance = () => {
   


  const dataBundle = [
    // {
    //   key: '1',
    //   username: 'John Brown',
    //   description: 32,
    //   amount: '50200',
    //   today: 32,
    //   status: ['suspended'],
    // },
    
     
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