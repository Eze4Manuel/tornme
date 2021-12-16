// Tell webpack this JS file uses this image
import { Modal, Button } from 'antd';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { } from '../../components/buttonComponent/buttonComponent';
import { GoBackComponent, ButtonComponent, GoBackButtonComponent } from '../../components/buttonComponent/buttonComponent';
import btc from '../../assets/images/icons/logout.png'; // Tell webpack this JS file uses this image

export const LogoutModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Logout" />
                    <img className="modal_block_img" src={btc} />
                    <p>This action will log log you out of your account</p>
                    <ButtonComponent onClick={handleOk} text="LOGOUT" />
                    <GoBackComponent text="Go Back" onClick={handleCancel} />
                </div>
            </Modal>
        </>
    )
}


export const DeleteAccountModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Account?" />
                    <p>This action would delete this account and remove your posts from the system</p>
                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    <a onClick={handleOk}>
                        <PageHeaderComp title={"YES, DELETE ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}


export const SuspendAccountModal = ({ isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{ textAlign: "center", borderRadius: "20px" }}>
                <div className="modal_block_logout">
                    <PageHeaderComp title="Delete Account?" />

                    <p>This action would suspend this account and user would not be able to access account</p>

                    <GoBackButtonComponent text="No, Go Back" onClick={handleCancel} />
                    <br />
                    <a onClick={handleCancel}>
                        <PageHeaderComp title={"YES, SUSPEND ACCOUNT"} style={{ color: "#747474" }} />
                    </a>
                </div>
            </Modal>
        </>
    )
}

