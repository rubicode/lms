import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class menuSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editData: {}
        }
    }

    handleCancel() {
        this.props.actions.editPasswordModal(false);
        this.setState({ editData: {} });
    }

    handleChangePasswordModal() {
        this.props.actions.editPasswordModal(true);
        this.setState({ editData: {} });
    }

    handleUpdateData(d) {
        this.setState({
            editData: {
                ...this.state.editData, [d.target.name]: d.target.value
            }
        })
    }

    stripTrailingSlash(url) {
        const array = url.split('/');

        const lastsegment = array[array.length - 1];
        return lastsegment;
    }

    render() {
        const user = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user : { id: null, role: null, firstname: null, lastname: null };
        const getUrl = this.stripTrailingSlash(window.location.href);

        let liChangePassword = [];
        if (user.id > 2 && (user.role === 'student' || user.role === 'instructor' || user.role === 'hiringpartner')) {
            liChangePassword.push(<li key="23">
                <a onClick={this.handleChangePasswordModal.bind(this)}><i className="fa fa-gear fa-fw"></i> Change Password</a>
            </li>)
        }
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top" style={{ marginBottom: 0 }}>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="dashboard">LMS</a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <a><i className="fa fa-user fa-fw"></i> {user.firstname + '  (' + user.role + ')'}</a>
                                </li>
                                {liChangePassword}
                                <li className="divider"></li>
                                <li>
                                    <a onClick={this.props.actions.logoutUser.bind(this)}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav" id="side-menu">
                                <li className="sidebar-search">
                                    <div className="input-group custom-search-form">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <a href="dashboard" className={(getUrl === 'dashboard') ? "active" : ""}><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                                </li>
                                <li>
                                    <a href="student" className={(getUrl === 'student') ? "active" : ""}><i className="fa fa-user fa-fw"></i> Student</a>
                                </li>
                                {!this.props.isRole('hiringpartner') &&
                                    <li>
                                        <a href="challenge" className={(getUrl === 'challenge') ? "active" : ""}><i className="fa fa-gamepad fa-fw"></i> Challenge</a>
                                    </li>
                                }
                                {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                                    <li>
                                        <a href="category" className={(getUrl === 'category') ? "active" : ""}><i className="fa fa-th fa-fw"></i> Category</a>
                                    </li>
                                }
                                {(this.props.isRole('admin')) &&
                                    <li>
                                        <a href="users" className={(getUrl === 'users') ? "active" : ""}><i className="fa fa-user fa-fw"></i> Users</a>
                                    </li>
                                }
                                {(this.props.isRole('admin')) &&
                                    <li>
                                        <a href="instructor" className={(getUrl === 'instructor') ? "active" : ""}><i className="fa fa-user fa-fw"></i> Instructor</a>
                                    </li>
                                }
                                {(this.props.isRole('admin')) &&
                                    <li>
                                        <a href="hiringpartner" className={(getUrl === 'hiringpartner') ? "active" : ""}><i className="fa fa-user fa-fw"></i> Hiring Partner</a>
                                    </li>
                                }
                                {false &&
                                    <li>
                                        <a><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span className="fa arrow"></span></a>
                                        <ul className="nav nav-second-level">
                                            <li>
                                                <a href="chart" className={(getUrl === 'chart') ? "active" : ""} >Charts</a>
                                            </li>
                                        </ul>
                                    </li>
                                }
                                {false &&
                                    <li>
                                        <a><i className="fa fa-files-o fa-fw"></i> Sample Pages<span className="fa arrow"></span></a>
                                        <ul className="nav nav-second-level">
                                            <li>
                                                <a>Blank Page</a>
                                            </li>
                                            <li>
                                                <a href="login">Login Page</a>
                                            </li>
                                        </ul>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <Modal show={this.props.data.modal} onHide={this.handleCancel.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="has-error">
                                <p className="help-block">{this.props.data.message || ''}</p>
                            </div>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input className="form-control" name="oldPassword" value={this.state.editData.oldPassword || ''} onChange={this.handleUpdateData.bind(this)} />
                                <p className="help-block"></p>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input className="form-control" name="newPassword" value={this.state.editData.newPassword || ''} onChange={this.handleUpdateData.bind(this)} />
                                <p className="help-block"></p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.props.actions.editPassword(user.id, this.state.editData.oldPassword, this.state.editData.newPassword) }} className="btn btn-primary" type="submit" >Save</button>
                        <button onClick={() => { this.handleCancel() }} className="btn btn-warning" type="button" >Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default menuSidebar;
