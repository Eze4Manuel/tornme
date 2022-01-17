import { useEffect, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import './userPostsCard.scss';
import { Button, Row, Col, Divider, Empty, Collapse } from 'antd';
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import livestream from '../../assets/images/livestream.png'; // Tell webpack this JS file uses this image
import image from '../../assets/images/image.png'; // Tell webpack this JS file uses this image
import image2 from '../../assets/images/image2.png'; // Tell webpack this JS file uses this image
import video from '../../assets/images/video.png'; // Tell webpack this JS file uses this image
import video2 from '../../assets/images/video2.png'; // Tell webpack this JS file uses this image
import video3 from '../../assets/images/video3.png'; // Tell webpack this JS file uses this image
import video4 from '../../assets/images/video4.png'; // Tell webpack this JS file uses this image
import play from '../../assets/images/icons/playicon.png'; // Tell webpack this JS file uses this image
import live from '../../assets/images/icons/livestreamicon.png'; // Tell webpack this JS file uses this image
import { Tabs } from 'antd';
import { useNavigate } from "react-router-dom";
import { LikeOutlined, ShareAltOutlined, FolderViewOutlined } from '@ant-design/icons';
import formValidator from '../../pages/users/formvalidation';
import { EditTextModal, DeleteTextModal } from '../../components/modalComponents/modalComponents';

import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';
import lib from '../../pages/users/lib';

const { Panel } = Collapse;

export const UsersPostCard = (props) => {
    const { TabPane } = Tabs;
    const navigate = useNavigate();

    const callback = (key) => {

    }

    const selectedPost = (record) => {
        navigate('/user-post-detail', { state: { record: props.data } });
    }

    return (
        <div className="userposts">
            <div className="post-cards" style={props.style} >
                <div className="post-cards-top">
                    <Button>{props.data?.account_status === 0 ? 'Not Active' : 'Active'}</Button>
                    <Button style={(props.data?.verified_user_status === 0 || props.data?.verified_user_status === undefined) ? { marginLeft: "6px" } : { background: 'palegreen', color: "#000", marginLeft: "6px" }}>{(props.data?.verified_user_status === 0 || props.data?.verified_user_status === undefined) ? 'Not Verified' : 'Verified'}</Button>
                </div>
                <div className="post-cards-middle">
                    <Row >
                        <Col flex="none">
                            <div style={{ padding: '0 16px' }}>
                                <img alt="..." src={person} />
                            </div>
                        </Col>
                        <Col flex="auto">
                            <ul>
                                <li>
                                    <span>
                                        Name:
                                    </span>
                                    <span>
                                        {props.data?.name}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Username:
                                    </span>
                                    <span>
                                        @{props.data?.username}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Email:
                                    </span>
                                    <span>
                                        {props.data?.email}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Phone number:
                                    </span>
                                    <span>
                                        {props.data?.phone_number}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        City:
                                    </span>
                                    <span>
                                        {props.data?.city}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Country:
                                    </span>
                                    <span>
                                        {props.data?.country}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Gender:
                                    </span>
                                    <span>
                                        {props.data?.gender}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Date registered:
                                    </span>
                                    <span>
                                        {new Date(props.data?.createdAt).toLocaleDateString()}
                                    </span>
                                </li>
                                <li>
                                    <button>
                                        <span><SendOutlined /></span>
                                        <span>Send message</span>
                                    </button>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex={3} style={{ maxWidth: "fit-content" }}>
                            <div className="post-cards-bottom">
                                <h2>@{props.data?.username}</h2>
                                {/* <h6>Fitness coach</h6> */}
                                <p>
                                    {props.data?.bio}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Divider style={{ margin: "0px" }} />
                    <Tabs defaultActiveKey="1" onChange={callback} style={{ padding: "30px" }}>
                        <TabPane tab="Videos/photos" key="1" >
                            <Row >
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video} typeImage={play} onClick={selectedPost} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={livestream} typeImage={live} onClick={selectedPost} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={live} onClick={selectedPost} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video2} typeImage={play} onClick={selectedPost} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={livestream} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video2} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video4} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={play} /> </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Audio" key="2">
                            <Row >
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video2} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={livestream} typeImage={live} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={null} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video3} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={''} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={play} /> </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Live stream" key="3">
                            <Row >
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video3} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={livestream} typeImage={live} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={null} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video4} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={null} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={play} /> </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Text" key="4">
                            <Row style={{height: "600px", overflow: "scroll"}}>
                                {props.contentText.length > 0 ?
                                    props.contentText?.map((elem, ind) => (
                                        <Col style={{ margin: "5px", borderRadius: "5px" }} xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Collapse bordered={false} defaultActiveKey={['0']} >
                                                <Panel header={
                                                    <div style={{ "display": "flex", justifyContent: "space-between", width: "100%" }}>
                                                        <span><b>{elem.text.substring(0, 40)} ...</b></span>
                                                        <span>
                                                            <div>
                                                                <Button style={{ margin: "0px 10px" }} type="text" icon={<LikeOutlined />}>Likes {elem.likes}</Button>
                                                                <Button style={{ margin: "0px 10px" }} type="text" icon={<ShareAltOutlined />}>Shares {elem.shares}</Button>
                                                                <Button style={{ margin: "0px 10px" }} type="text" icon={<FolderViewOutlined />}>Views {elem.views}</Button>
                                                            </div>
                                                        </span>
                                                    </div>
                                                } key={ind}><TextPost data={elem} /> </Panel>
                                            </Collapse>
                                        </Col>
                                    ))
                                    :
                                    <div style={{ "height": "400px", "width": "100%" }}>
                                        <Empty
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span>
                                                    No Content Available
                                                </span>
                                            } >
                                        </Empty>
                                    </div>
                                }
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}


const Post = (props) => {
    return (
        <div className="post-single-card" onClick={props.onClick} style={{ cursor: "pointer" }}>
            <div className='post-single-card-background' style={{ backgroundImage: `url(${props.img})` }} key={{ shoe: "ede" }}>
            </div>
            <div className="post-single-card-image">
                {<img alt='' src={props.typeImage} /> ?? null}
            </div>
        </div>
    )
}


const TextPost = (props) => {
    const [load, setLoading] = useState(false);
    const [error, setError] = useState('')
    const notify = useNotifications();
    const { set, user } = useAuth();
    const [isTextEditModalVisible, setIsTextEditModalVisible] = useState(false);
    const [isTextDeleteModalVisible, setIsTextDeleteModalVisible] = useState(false);

    // Closes Edit Modal
    const textEditCancel = () => {
        setIsTextEditModalVisible(false)
    }
    // Toggles edit Support modal
    const showEditTextModal = () => {
        setIsTextEditModalVisible(true);
    };

    // Handles edit success cLick
    const handleTextEdit = async (value) => {
            console.log(value);
            let builder = formValidator.validateContentUpdate(value, props.data, {}, setError)
            if (!builder) {
                return
            }

            builder.post_id = props.data?._id
            setLoading(true);
            let reqData = await lib.updateContent(builder, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Content Updated' })
                setIsTextEditModalVisible(false)
            }
            console.log(reqData);
            setLoading(false);
        
    }

    // Handles delete success cLick
    const handleTextDelete = async () => {
        console.log(props.data?._id);
            setLoading(true);
            let reqData = await lib.deleteContent(props.data?._id, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
            }
            if (reqData.status === 'ok') {
                helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Content Deleted' })
                setIsTextDeleteModalVisible(false)
            }
            setLoading(false);
            console.log(reqData);
    }

    // Closes Delete Modal
    const textDeleteCancel = () => {
        setIsTextDeleteModalVisible(false)
    }
    // Toggles delete Support modal
    const showDeleteTextModal = () => {
        console.log('dele');
        setIsTextDeleteModalVisible(true);
    };

    return (
        <div className='support-admin-card' style={{ display: "flex", flexDirection:"column", justifyContent: "space-between", backgroundColor: " ", padding: "10px" }}>
            <div>
                {props.data.text}
            </div>
            <div style={{minWidth: "200px", textAlign: 'end'}}>
                <Button  onClick={showEditTextModal}  style={{ margin: "0px 10px" }} type="link">Edit</Button>
                <Button  onClick={showDeleteTextModal}  style={{ margin: "0px 10px" }} type="link">Delete</Button>
            </div>
            <EditTextModal data={props.data} load={load} error={error} handleOk={handleTextEdit} handleCancel={textEditCancel} isTextModalVisible={isTextEditModalVisible} />
            <DeleteTextModal data={props.data} load={load} error={error} handleOk={handleTextDelete} handleCancel={textDeleteCancel} isTextModalVisible={isTextDeleteModalVisible} />
        </div>
    )
}
