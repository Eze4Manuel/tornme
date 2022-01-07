import { Table, Row, Col, Button, Popconfirm, message } from 'antd';
import { useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {CSVLink} from 'react-csv';

const TableBlock = (props) => {

  useEffect(() => {
    // setSelectedRowKeys([])
  })

  function confirm(e) {
    console.log(e);
    
    message.success('Click on Yes');
  }
  
  function cancel(e) {
    exportExcel();
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

  const exportExcel = () => {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(props.data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, `OrdersList`);
    });
}

  return (
    <>
      <Row justify="space-between">
        <Col >
          <h3>{props.title}</h3>
        </Col>
        <Col>
        

          <Popconfirm
            title="Select Export Data Form"
            icon={<QuestionCircleOutlined style={{ color: 'skyblue' }} />}
            onConfirm={confirm}
            onCancel={cancel}
            
            okText={<CSVLink  filename={"tornme-users.csv"} data={props.data} >As CSV</CSVLink> }
            cancelText="As EXCEL"
          >
            {props.export ? <Button type="dashed">Export</Button> : null}
          </Popconfirm>

          
        </Col>
      </Row>
      <Table
        id="table-to-xls"
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { props.onSelected(record, rowIndex) }, // click row
          }
        }}
        columns={props.columns} dataSource={props.data} pagination={{ pageSize: 15 }} scroll={{ y: 440 }} />
    </>
  )
}


export default TableBlock;