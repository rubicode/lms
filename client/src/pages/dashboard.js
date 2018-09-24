import React, { Component } from 'react';
import Header from '../components/menuSidebar';

import { bindActionCreators } from 'redux';
import * as todoStudent from '../actions/studentActions';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class Dashboard extends Component {

    componentDidMount() {
        this.props.actions.todoAuth.cek()
    }

    isRole(roleToCheck) {
        const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;

        if (userRole === roleToCheck) {
            return true;
        }

        return false;
    }

    render() {
        if (localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user && JSON.parse(localStorage.getItem('lms')).token)
            return (
                <div id="wrapper">
                    <Header isRole={this.isRole.bind(this)} actions={this.props.actions.todoAuth} data={this.props.state.auth} />

                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Dashboard</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-comments fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">26</div>
                                                <div>New Comments!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a>
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="panel panel-green">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-tasks fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">12</div>
                                                <div>New Tasks!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a>
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="panel panel-yellow">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-shopping-cart fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">124</div>
                                                <div>New Orders!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a>
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="panel panel-red">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-support fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">13</div>
                                                <div>Support Tickets!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a>
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {false &&
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <i className="fa fa-bar-chart-o fa-fw"></i> Area Chart Example
                                        <div className="pull-right">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        Actions
                                            <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu pull-right" role="menu">
                                                        <li><a>Action</a>
                                                        </li>
                                                        <li><a>Another action</a>
                                                        </li>
                                                        <li><a>Something else here</a>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li><a>Separated link</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-body">
                                            <div id="morris-area-chart"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            );
        else
            return (
                <div id="wrapper">
                </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            student: state.student,
            auth: state.auth
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoStudent: bindActionCreators(todoStudent, dispatch),
            todoAuth: bindActionCreators(todoAuth, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);