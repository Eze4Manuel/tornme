import { Table, Row, Col, Button } from 'antd';
import { useEffect, useState } from 'react';
import { render } from 'sass';

const TableBlock = (props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState(props.data.filter(item => item.chosen).map(item => item.key))
    
    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

      useEffect(()=>{
        setSelectedRowKeys([])
      })
    
      
    return (
        <>
            <Row justify="space-between">
                <Col >
                    <h3>{props.title}</h3>
                </Col>
                <Col>
                {props.export ? <Button type="dashed">Export</Button> : null}
                </Col>
            </Row>
            <Table 
          
            onRow={(record, rowIndex) => {
                return {
                  onClick: event => {props.onSelected(record, rowIndex)}, // click row
                }
            }}
             columns={props.columns} dataSource={props.data} pagination={{ pageSize: 15 }} scroll={{ y: 440 }} />
        </>
    )
}


export default TableBlock;