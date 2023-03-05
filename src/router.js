import React from "react";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom"

import Login from './containers/Login'
import Dashboard from './containers/Dashboard'

function CustomRouter({ location }) {

  return (
    <Switch>
      <Route exact path="/login" component={ Login } initialPath />
      <Route path="/dashboard" component={ Dashboard } />
      <Redirect from={ '/' } to={ '/login' } />
    </Switch>
  );
}

const mapStateToProps = state => ({ data: state })
export default compose(
  connect( mapStateToProps ),
  withRouter
)( CustomRouter )