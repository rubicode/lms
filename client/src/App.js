import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Hiringpartner from './pages/hiringpartner';
import Instructor from './pages/instructor';
import Student from './pages/student';
import Challenge from './pages/challenge';
import Category from './pages/category';
import Login from './pages/login';
import ForgotPassword from './pages/forgotPassword'
import Registration from './pages/registration';
import NotFound from './pages/notFound';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {

  isRole(roleToCheck) {
    const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;

    if (userRole === roleToCheck) {
      return true;
    }

    return false;
  }

  render() {
    window.oncontextmenu = function () {
      return false;
    }

    window.onkeydown = function (e) {
      // if (!e) e = event;
      if (e.keyCode === 52 && e.keyCode === 17 && e.keyCode === 16) {
        return false;
      } else if (e.ctrlKey && e.altKey && e.keyCode === 115) {
        return false;
      } else if (e.shiftKey && e.keyCode === 9) {
        return false;
      } else if (e.ctrlKey && e.keyCode === 67) {
        return false;
      } else if (e.ctrlKey && e.keyCode === 83) {
        return false;
      }

    }

    window.onkeyup = function (e) {
      if (e.keyCode === 42) {
        return false;
      } else if (e.keyCode === 44) {
        return false;
      }
    }

    // window.onblur = function (e) {
    //   document.body.style.display = 'none'
    // }
    // window.onfocus = function (e) {
    //   document.body.style.display = 'block'
    // }

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
            {(this.isRole('admin')) &&
              <Route exact path='/users' component={Users} />
            }
            {(this.isRole('admin')) &&
              <Route exact path='/hiringpartner' component={Hiringpartner} />
            }
            {(this.isRole('admin')) &&
              <Route exact path='/instructor' component={Instructor} />
            }
            <Route exact path='/student' component={Student} />
            {!this.isRole('hiringpartner') &&
              <Route exact path='/challenge' component={Challenge} />
            }
            {(this.isRole('instructor') || this.isRole('admin')) &&
              <Route exact path='/category' component={Category} />
            }
            <Route exact path='/login' component={Login} />
            <Route exact path='/forgot_password' component={ForgotPassword} />
            <Route exact path='/registration' component={Registration} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

