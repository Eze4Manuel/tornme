
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useAuth } from './core/hooks/useAuth';
import Helpers from './core/func/Helpers';
import UnAuthenticated from './pages/login';
import ResetPassword from './pages/resetPassword';
import Authenticated from './pages/index';

import Loading from './components/loading/Loading'
import './App.css';
import ChangePasswordPage from './pages/changePassword';

const App = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  Helpers.loadUserInStore(user);


  // TODO: verify token authenticity
  // wait for resource
  setTimeout(() => {
    setLoading(false)
  }, 2000);

  if (loading) {
    return <Loading />
  }
  console.log("user");
  console.log(user);

  return (
    <>
      {user
        ? <Authenticated user={user} />
        :
        <Router>
          <Routes>
          <Route path='/' exact element={<UnAuthenticated />} />
          <Route path='/login' exact element={<UnAuthenticated />} />
          <Route path='/reset-password' exact element={<ResetPassword />} />
          <Route path='/change-password' exact element={<ChangePasswordPage />} />
          <Route path="*" element={<Navigate to ="/login" />}/>

          </Routes>
        </Router>


      }
    </>
  );
}

export default App;
