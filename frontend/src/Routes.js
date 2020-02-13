import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";

const Routes = () => {
  const { token } = useContext(AuthContext);
  return (
    <Switch>
      {token && (
        <>
          <Redirect from='/' to='/events' exact />
          <Redirect from='/login' to='/events' exact />
          <Redirect from='/signup' to='/events' exact />
          <Route path='/bookings' component={BookingsPage} />
          <Route path='/events' component={EventsPage} />
        </>
      )}
      {!token && (
        <>
          <Redirect from='/' to='/login' exact />
          <Redirect from='/bookings' to='/login' exact />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/events' component={EventsPage} />
        </>
      )}
    </Switch>
  );
};

export default Routes;
