import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Dashboard from './dashboard/index';
import Users from './users/index';
import { routes } from './config';
import config from '../assets/utils/config';
import { useAuth } from '../core/hooks/useAuth';
import helpers from '../core/func/Helpers'
export const getInitialRoutePage = (user) => {
  return user?.user_type === 'superadmin'
    ? config.pages.dashboard
    : config.pages.support;
}

export const isSuperAdmin = (user) => {
  return user?.user_type === 'superadmin'
}

const App = (props) => {
  const { set, user } = useAuth();


  const renderedRoutes = routes.map(AppRoute =>
    <Route key={AppRoute.link} path={AppRoute.link} element={<AppRoute.Component />}> </Route>
  )



  return (
    <Router>
      <Fragment>
        <Routes>
          {user?.user_type === 'superadmin' ?
            <>
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/overview' exact element={<Dashboard />} />
            </> :
            <>
              <Route path='/' exact element={<Users />} />
              <Route path='*' exact element={<Users />} />
            </>
          }
          {renderedRoutes}
          {/* <Route path="*" element={<Navigate to ="/overview" />}/> */}
        </Routes>
      </Fragment>
    </Router>
  );
}
export default App;
