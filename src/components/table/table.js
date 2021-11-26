import { Table, Row, Col, Button } from 'antd';
import { render } from 'sass';

const TableBlock = (props) => {
    return (
        <>
            <Row justify="space-between">
                <Col >
                    <h3>{props.title}</h3>
                </Col>
                <Col>
                <Button type="dashed">Export</Button>

                </Col>
            </Row>
            <Table columns={props.columns} dataSource={props.data} pagination={{ pageSize: 15 }} scroll={{ y: 440 }} />
        </>
    )
}


export default TableBlock;