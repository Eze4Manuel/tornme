import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Dashboard from './dashboard/index';
import { routes } from './config';
import config from '../assets/utils/config';



export const getInitialRoutePage = (user) => {
  return user?.user_type === 'superadmin'
    ? config.pages.dashboard
    : config.pages.support;
}

export const isSuperAdmin = (user) => {
  return user?.user_type === 'superadmin'

}

const App = (props) => {

  const renderedRoutes = routes.map(AppRoute =>
    <Route key={AppRoute.link} path={AppRoute.link} element={<AppRoute.Component />}> </Route>
  )
  return (
    <Router>
      <Fragment>
        <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/overview' exact element={<Dashboard />} />
          {renderedRoutes}
        </Routes>
        
      </Fragment>
    </Router>
  );
}
export default App;
