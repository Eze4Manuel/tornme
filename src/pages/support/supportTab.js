import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import formValidator from './formvalidation';
import { EditSupportModal, DeleteSupportModal, AssignAdminSupportModal } from '../../components/modalComponents/modalComponents';
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
            let reqData = await lib.getSupports(user?.token)
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
                            props.supportData?.map(item => (
                                <SupportTabTile data={item} personnelData={props.personnelData} />
                            ))
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
    const [isSupportEditModalVisible, setIsSupportEditModalVisible] = useState(false);
    const [isSupportDeleteModalVisible, setIsSupportDeleteModalVisible] = useState(false);
    const [isAssignAdminSupportModalVisible, setIsAssignAdminSupportModalVisible] = useState(false);

    // Closes Edit Modal
    const supportEditCancel = () => {
        setIsSupportEditModalVisible(false)
    }
    // Toggles edit Support modal
    const showEditSupportModal = () => {
        setIsSupportEditModalVisible(true);
    };

    // Handles edit success cLick
    const handleSuppoortEdit = async (value) => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            let builder = formValidator.validateSupportUpdate(value, props.data, {}, setError)
            if (!builder) {
                return
            }
            builder.setting_id = props.data?._id
            setLoading(true);
            let reqData = await lib.updateSupport(builder, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Updated' })
                setIsSupportEditModalVisible(false)
            }
            setLoading(false);
            console.log(reqData);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    // Handles delete success cLick
    const handleSuppoortDelete = async () => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            setLoading(true);
            let reqData = await lib.deleteSupport(props.data?._id, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Deleted' })
                setIsSupportDeleteModalVisible(false)
            }
            setLoading(false);
            console.log(reqData);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    // Closes Delete Modal
    const supportDeleteCancel = () => {
        setIsSupportDeleteModalVisible(false)
    }
    // Toggles delete Support modal
    const showDeleteSupportModal = () => {
        setIsSupportDeleteModalVisible(true);
    };


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
            console.log(reqData);
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
                <Button onClick={showAssignAdminSupportModal} style={{ margin: "0px 10px" }} type="dashed">Assign</Button>
                <Button onClick={showEditSupportModal} style={{ margin: "0px 10px" }} type="dashed">Edit</Button>
                <Button onClick={showDeleteSupportModal} style={{ margin: "0px 10px" }} type="dashed">Delete</Button>
            </div>
            <EditSupportModal data={props.data} load={load} error={error} handleOk={handleSuppoortEdit} handleCancel={supportEditCancel} isSupportModalVisible={isSupportEditModalVisible} />
            <DeleteSupportModal data={props.data} load={load} error={error} handleOk={handleSuppoortDelete} handleCancel={supportDeleteCancel} isSupportModalVisible={isSupportDeleteModalVisible} />
            <AssignAdminSupportModal data={props.personnelData} support_id={props.data._id} load={load} error={error} handleOk={handleAssignAdminSupport} handleCancel={supportAssignAdminCancel} isAssignAdminSupportModalVisible={isAssignAdminSupportModalVisible} />
        </div>
    )
}