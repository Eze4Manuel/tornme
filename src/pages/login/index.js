import Structure from "../../components/layout/index";
import ErrorMessage from '../../components/error/ErrorMessage';
import React, { useState } from 'react';

import './login.scss';

const Login = () => {
  const [values, setValues] = useState({ username: '', password: ''})
  const [error, setError] = useState('')

  return (
    <Structure className="login">
      <div className="login-center">
      <div className="app-login">
            <div className="app-login__container">
                <div className="app-login__content">
                    <h3 className="text-center">Login</h3>
                    <div className="app-login__error">
                        {error ? <ErrorMessage message={error} /> : null}
                    </div>
                    <div className="p-fluid p-formgrid p-grid p-mx-5">
                            <div style={{width: '350px'}} className="container">
                            <div className="row">
                                    {/* <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="login">Username or Phone Number</label><br />
                                            <InputText style={{width: '100%'}} id="login" name="login" onChange={e => setValues(d => ({...d, login: e.target.value}))} autoFocus value={values.login} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="username/phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="password">Password</label><br />
                                            <Password style={{ width: '100%', height: '35px'}} id="password" name="password" type="text" toggleMask value={values.password} onChange={e => setValues(d => ({...d, password: e.target.value}))} placeholder="**********" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mt-2">
                                            <Button style={{width: '100%'}} color="#fff" label="Login"/>
                                        </div>
                                    </div> */}
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