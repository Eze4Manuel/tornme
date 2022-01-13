import { SendOutlined } from '@ant-design/icons';
import './userPostsCard.scss';
import { Button, Row, Col, Divider } from 'antd';
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
                    <Button style={props.data?.verified_user_status === 0 ? {marginLeft: "6px"} : {background: 'palegreen', color: "#000", marginLeft: "6px"}}>{props.data?.verified_user_status === 0 ? 'Not Verified' : 'Verified'}</Button>
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
                                        Phone number:
                                    </span>
                                    <span>
                                        {props.data?.phone_number}
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
                                <h6>Fitness coach</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. e fermentum. Auctor mi laoreet purient aliquet mi sed. see moreLorem ipsum dolor sit amet, consectetur adipiscing elit. e fermentum. Auctor mi laoreet parturient aliquet mi sed. see moreLorem ipsum dolor sit amet, consectetur adipiscing elit. e fermentum. Auctor mi laoreet parturient aliquet mi sed. see more
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
                            <Row >
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video4} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={livestream} typeImage={live} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image2} typeImage={null} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={video3} typeImage={play} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={null} /> </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}><Post img={image} typeImage={play} /> </Col>
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