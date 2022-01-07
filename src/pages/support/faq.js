
import { Row, Col, Button } from 'antd';
import './faq.scss';

const chatSource = [
    { userHandle: "@priewereer", text: "Amet minim mollit non deserut uamc ersit aliqua dolor do Amet minim mollit non deserut uamc ersit aliqua dolor doAmet minim  " },
    { userHandle: "@priewereer",  text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
    { userHandle: "@priewereer",  text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
    { userHandle: "@priewereer", text: "Amet minim mollit non deserut uamc ersit aliqua dolor do " },
]

const Faq = () => {
    return (
        <Row>
            <Col flex={1}>
                <div className="support-admin-cards"  >
                    <div className="support-admin-top">
                        {
                            chatSource?.map(item => (
                                <FaqTabTile data={item} />
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
    return (
        <div className='support-admin-card' style={{ backgroundColor: "#EEF3FF" }}>
            <div>
                <h4> props.data.userHandle</h4>
                <p>
                    props.data.text
                </p>
            </div>
            <div>
                <Button style={{ margin: "0px 10px" }} type="dashed">Edit </Button>
                <Button style={{ margin: "0px 10px" }} type="dashed">Delete</Button>
            </div>
        </div>
    )
}