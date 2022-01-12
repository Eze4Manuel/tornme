import { useEffect, useState } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import { AssignAdminSupportModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from './lib';
import './supportTab.scss';

const SupportTab = (props) => {
    const { set, user } = useAuth();
    // Getting support data
    useEffect(() => {
        (async () => {
            let reqData = await lib.getSupport(user?.token, user?.auth_id)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                props.setSupportData(reqData.data);
            }
        })();
    }, [user?.token, set])
    return (
        <Row>
            <Col flex={1}>
                <div className="support-admin-cards"  >
                    <div className="support-admin-top">
                        {
                            props.supportData.length > 0 ?
                                props.supportData?.map(item => (
                                    <SupportTabTile data={item} personnelData={props.personnelData} />
                                ))
                                :
                                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "500px"}}>
                                    <Spin size="large" />
                                </div>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default SupportTab;


const SupportTabTile = (props) => {
    const [load, setLoading] = useState(false);
    const [error, setError] = useState('')
    const notify = useNotifications();
    const { set, user } = useAuth();
    const [isAssignAdminSupportModalVisible, setIsAssignAdminSupportModalVisible] = useState(false);

    // Toggles Support admin assign modal
    const showAssignAdminSupportModal = () => {
        setIsAssignAdminSupportModalVisible(true);
    };
    // Closes Delete Modal
    const supportAssignAdminCancel = () => {
        setIsAssignAdminSupportModalVisible(false)
    };
    // Assign Support
    const handleAssignAdminSupport = async (admin_id, support_id) => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            setLoading(true);
            let reqData = await lib.assignSupport(admin_id, support_id, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Assigned' })
                setIsAssignAdminSupportModalVisible(false)
            }
            setLoading(false);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    };

    return (
        <div className='support-admin-card' style={{ backgroundColor: "#EEF3FF" }}>
            <div>
                <h4> {props.data.subject}</h4>
                <p>
                    {props.data.description}
                </p>
            </div>
            <div>
                <Button style={{ margin: "0px 10px" }} type="dashed">Chat </Button>
                <Button onClick={showAssignAdminSupportModal} style={{ margin: "0px 10px" }} type={props.data?.assigned_to === undefined ? 'dashed' : 'primary'} ghost={props.data?.assigned_to !== undefined ? true : false}>{props.data?.assigned_to === undefined ? "Assign" : "Re-assign"}</Button>
            </div>
            <AssignAdminSupportModal data={props.personnelData} support_id={props.data._id} load={load} error={error} handleOk={handleAssignAdminSupport} handleCancel={supportAssignAdminCancel} isAssignAdminSupportModalVisible={isAssignAdminSupportModalVisible} />
        </div>
    )
}