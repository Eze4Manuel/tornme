import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import formValidator from './formvalidation';
import { EditFaqModal, DeleteFaqModal } from '../../components/modalComponents/modalComponents';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from './lib';
import './faq.scss';

const Faq = (props) => {
    const { set, user } = useAuth();

    // Getting support data
    useEffect(() => {
        (async () => {
            let reqData = await lib.getFaq(user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                props.setFaqData(reqData.data);
            }
        })();
    }, [user?.token, set])

    return (
        <Row>
            <Col flex={1}>
                <div className="support-admin-cards"  >
                    <div className="support-admin-top">
                        {
                            props.faqData?.map(item => (
                                <FaqTabTile data={item} personnelData={props.personnelData} />
                            ))
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}


export default Faq;




const FaqTabTile = (props) => {
    const [load, setLoading] = useState(false);
    const [error, setError] = useState('')
    const notify = useNotifications();
    const { set, user } = useAuth();
    const [isFaqEditModalVisible, setIsFaqEditModalVisible] = useState(false);
    const [isFaqDeleteModalVisible, setIsFaqDeleteModalVisible] = useState(false);

    // Closes Edit Modal
    const faqEditCancel = () => {
        setIsFaqEditModalVisible(false)
    }
    // Toggles edit Support modal
    const showEditFaqModal = () => {
        setIsFaqEditModalVisible(true);
    };

    // Handles edit success cLick
    const handleFaqEdit = async (value) => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            let builder = formValidator.validateSupportUpdate(value, props.data, {}, setError)
            if (!builder) {
                return
            }
            builder.setting_id = props.data?._id
            setLoading(true);
            let reqData = await lib.updateFaq(builder, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Updated' })
                setIsFaqEditModalVisible(false)
            }
            setLoading(false);
            console.log(reqData);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    // Handles delete success cLick
    const handleFaqDelete = async () => {
        if (user?.user_type === 'superadmin' || user?.access_level === 3) {
            setLoading(true);
            let reqData = await lib.deleteFaq(props.data?._id, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support Deleted' })
                setIsFaqDeleteModalVisible(false)
            }
            setLoading(false);
            console.log(reqData);
        } else {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: 'Insufficient Access on this Operation' })
        }
    }

    // Closes Delete Modal
    const faqDeleteCancel = () => {
        setIsFaqDeleteModalVisible(false)
    }
    // Toggles delete Support modal
    const showDeleteFaqModal = () => {
        setIsFaqDeleteModalVisible(true);
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
                <Button onClick={showEditFaqModal} style={{ margin: "0px 10px" }} type="dashed">Edit</Button>
                <Button onClick={showDeleteFaqModal} style={{ margin: "0px 10px" }} type="dashed">Delete</Button>
            </div>
            <EditFaqModal data={props.data} load={load} error={error} handleOk={handleFaqEdit} handleCancel={faqEditCancel} isFaqModalVisible={isFaqEditModalVisible} />
            <DeleteFaqModal data={props.data} load={load} error={error} handleOk={handleFaqDelete} handleCancel={faqDeleteCancel} isFaqModalVisible={isFaqDeleteModalVisible} />
        </div>
    )
} 