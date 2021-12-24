
import './users.scss';
import { Row, Col } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import Structure from "../../components/layout/index";
import { GoBackComponent } from '../../components/buttonComponent/buttonComponent';
import person from '../../assets/images/person.png'; // Tell webpack this JS file uses this image
import message from '../../assets/images/icons/message.png'; // Tell webpack this JS file uses this image
import like from '../../assets/images/icons/like.png'; // Tell webpack this JS file uses this image
import share from '../../assets/images/icons/share.png'; // Tell webpack this JS file uses this image

import { CommentCard } from '../../components/commentCard/commentCard';
import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import { SendOutlined } from '@ant-design/icons';

import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import emoji from '../../assets/images/icons/emoji.png'; // Tell webpack this JS file uses this image


const UsersPostDetail = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const goBack = () => {
        let record = {key: state?.record?._id}
        navigate('/user-posts', { state: { record } });
    }

    const supportSource = [
        { img: btc, userHandle: "@priewereer", time: '23h', text: "Kathryn Murphy Aliqua id fugiat nostrud irure ex duis ea quis id quis adnt qui esse pariatur duis deserunt mollit dolore cillum miniAliqua id fugiat nostrud irure ex duis ea quis id quis adnt qui esse pariatur duis deserunt mollit dolore cillum mini     Reply       Like" },
        { img: onlineUser, userHandle: "@priewereer", time: '13h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
        { img: btc, userHandle: "@priewereer", time: '12h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
        { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
        { img: btc, userHandle: "@priewereer", time: '20h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
        { img: newUser, userHandle: "@priewereer", time: '10h', text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " }
    ]

    return (
        <Structure className="users-post-detail" >
            <div style={{ width: "70%", margin: "auto" }}>
                <div style={{ marginLeft: "0px", width: "fit-content" }} >
                    <GoBackComponent text="Go Back" onClick={goBack} />
                </div>

                <div className="detail-top" >
                    <Row>
                        <Col flex={24}>
                            <div className="detail-headers">
                                <span>@marcelosalomao</span>
                                <span>
                                    <span>
                                        2 mins ago
                                    </span>
                                    <span style={{ position: "relative", top: "-5px", marginLeft: "10px" }}>
                                        <b>...</b>
                                    </span>
                                </span>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col flex="auto">
                            <div style={{ width: "" }}>
                                <div className="detail-image" style={{ backgroundImage: `url(${person})` }}></div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex={1}>
                            <div className="detail-bottom-actions">
                                <div >
                                    <span className='detail-icon-block'>
                                        <span>
                                            <img alt="..." src={message} />
                                        </span>
                                        <span>
                                            23
                                        </span>
                                    </span>
                                    <span className='detail-icon-block'>
                                        <span>
                                            <img alt="..." src={like} />
                                        </span>
                                        <span>
                                            304
                                        </span>
                                    </span>
                                    <span className='detail-icon-block'>
                                        <span>
                                            <img alt="..." src={share} />
                                        </span>
                                        <span>
                                            453
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <img alt="..." src={message} />
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                In the eighteenth century the German philosopher Immanuel Kant developed a theory of knowledge in which knowledge about space can be both a priori and synthetic. According to Kant, knowledge about space is synthetic, in that statements about space are not simply true by virtue of the meaning of the words in the statement. In his work, Kant rejected the view that space must be either a substance or relation. Instead he came to the conclusion that space and time are not discovered by humans to be objective features of the world, but imposed by us as part of a organizing see more
                            </p>
                            <p>
                                12 Comments
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CommentCard
                                textColor={{ "color": "#276AFF" }}
                                image={btc}
                                topLeft={"Support"}
                                data={supportSource}
                            />
                            <div className="detail-cards-message">
                                <div className="detail-cards-message-block">
                                    <span>
                                        <img alt="..." src={emoji} />
                                    </span>
                                    <span style={{ width: "100%" }}>
                                        <input type="text" name="message" placeholder="Say something about this video"></input>
                                        <button><SendOutlined /></button>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Structure>
    )
}




export default UsersPostDetail;