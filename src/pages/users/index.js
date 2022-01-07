import React, { useEffect, useState } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import TableBlock from '../../components/table/table';
import { Row, Col, Tag, message, Input, Space, Button } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';
import './users.scss';
import { useNavigate } from "react-router-dom";
import lib from './lib';
import helpers from '../../core/func/Helpers';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Search } = Input;

const Users = () => {
  const navigate = useNavigate();
  const { set, user} = useAuth();
  const [,setLoader] = useState(false);
  const [data,setData] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState(false);
  const [searchText, setSearchText] = useState(false);
 
  
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


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0])
                setSearchedColumn(dataIndex)
                
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          // if (visible) {
          //   setTimeout(() => this.searchInput.select(), 100);
          // }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      


  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
      ...getColumnSearchProps('username')
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      ...getColumnSearchProps('phone_number')
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
      ...getColumnSearchProps('earnings'),
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
 

  const onSearch = async (value) => {
    setLoader(true)
    let reqData = await lib.get(user?.token, 'user', value)
    setLoader(false)
    if (reqData.status === 'ok' && reqData?.data?.length > 0) {
        setData(reqData.data)
    } else {
      message.error('Oops, No User Of Such');
    }
}




  return (
    <Structure className="users">
      <PageHeaderComp title="Users" />
      <Search placeholder="input search text" size="large" onSearch={onSearch} style={{ width: "40%" }} />
      <div className="finance-data" style={{ "margin-top": "0px" }}>

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