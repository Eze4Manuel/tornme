import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { useNavigate } from 'react-router';
import request from '../../assets/utils/http-request';  
import { useAuth } from '../../core/hooks/useAuth';
import Helpers from '../../core/func/Helpers';
import formValidator from './formvalidation';
import { Form, Input} from 'antd';

import './login.scss';

const Login = () => {
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const [values, setValues] = useState({});
    const [,setLoading] = useState(false);
    const [error, setError] = useState('')
    const { set, } = useAuth();
    let navigate = useNavigate();


    const handleSubmit = async ()  => {
        
        setError('')
        setLoading(true)
        try {
            let builder = formValidator.validatelogin(values, {}, setError);
            if(!builder) return;

            let reqData = await (await request.post('/auth/admin-login', builder)).data
            setLoading(false)
            if (reqData.status === 'error') {
                setError(reqData?.msg)
            }
            if (reqData.status === 'ok' && ['admin', 'superadmin'].indexOf(reqData?.data?.user_type) === -1) {
                setError("You do not have the right authorization for this resource")
            } else {
                Helpers.loadUserInStore(reqData?.data)
                set(reqData?.data);
                navigate('/');
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err?.response?.data?.msg || err?.message)
        }
    }

    return (
        <Structure className="login" noHeader={true}>
            <div className="login-center">
                <div className="app-login">
                    <div className="app-login__container">
                        <div className="app-login__content">
                            <PageHeaderComp title="Login" />
                            <div className="app-login__error">
                                {error ? <ErrorMessage message={error} /> : null}
                            </div>
                            <div className="p-fluid p-formgrid p-grid p-mx-5">
                                <div style={{ width: '100%', marginTop: "35px" }} className="container">
                                    <div className="row">
                                        <Form
                                            layout={"vertical"}
                                            form={form}
                                            initialValues={{
                                                layout: formLayout,
                                            }}
                                        >
                                            <Form.Item label="Email" required tooltip="This is a required field" >
                                                <Input placeholder="example@email.com" onChange={e => setValues(d => ({...d, login: e.target.value}))} value={values.login}  style={{ padding: "10px", borderRadius: "6px"}}/>
                                            </Form.Item>
                                            <Form.Item label="Password" required tooltip="This is a required field">
                                                <Input placeholder="password" onChange={e => setValues(d => ({...d, password: e.target.value}))} autoFocus value={values.password}  style={{ padding: "10px", borderRadius: "6px"}}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <ButtonComponent text="LOGIN" onClick={handleSubmit} />
                                                <div className="" style={{marginTop: "30px"}}>
                                                    <PageHeaderComp onClick={()=> navigate('/forgot-password')} title="forgot password" style={{ fontSize: "16px", color: "#276AFF", cursor: "pointer" }} />
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Structure>
    )
}
export default Login;