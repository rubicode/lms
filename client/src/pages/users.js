import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../components/menuSidebar';

import Item from './usersList';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import * as todoStudent from '../actions/studentActions';
import * as todoInstructor from '../actions/instructorActions';
import * as todoHiringpartner from '../actions/hiringpartnerActions';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countLoad: 0,
            typeAction: '',
            errorForm: '',
            editData: {},
            optionInput: [],
            showModal: false
        }
    }

    isRole(roleToCheck) {
        const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;

        if (userRole === roleToCheck) {
            return true;
        }

        return false;
    }

    componentDidMount() {
        this.props.actions.todoAuth.cek()
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.props.actions.todoUsers.loadUsers(this.state.countLoad, 20);
        this.setState({
            countLoad: this.state.countLoad + 20
        })
        this.props.actions.todoStudent.student();
        this.props.actions.todoInstructor.instructor();
        this.props.actions.todoHiringpartner.hiringpartner();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {
        var target = 0
        // if (event.srcElement)
        //     target = event.srcElement.body || 0
        // else
            target = document.documentElement || 0;

        
        let scrollTop = target.scrollTop;

        if (Math.ceil(scrollTop) + window.innerHeight === document.body.clientHeight) {
            const data = this.props.state.users.data
            if (this.state.countLoad === data.length) {
                this.props.actions.todoUsers.loadUsers(this.state.countLoad, 20);

                this.setState({
                    countLoad: this.state.countLoad + 20
                })
            }
        }
    }

    handleAddData() {
        this.setState({
            typeAction: 'add',
            errorForm: '',
            editData: {},
            showModal: true
        })
    }

    handleGetData(d) {
        this.setState({
            typeAction: 'edit',
            errorForm: '',
            editData: d,
            showModal: true
        })
    }

    handleGetDataUserID(d) {
        let data = [];
        if (d.role === 'student')
            data = this.props.state.student;
        if (d.role === 'instructor')
            data = this.props.state.instructor;
        if (d.role === 'hiringpartner')
            data = this.props.state.hiringpartner;
        this.setState({
            typeAction: 'user',
            errorForm: '',
            editData: d,
            optionInput: data,
            showModal: true
        })
    }

    handleGetDataPassword(d) {
        this.props.actions.todoUsers.editUsersPasswordModal(true)
        this.setState({
            typeAction: 'password',
            editData: d
        })
    }

    handleDelete(d) {
        this.setState({
            typeAction: 'delete',
            errorForm: '',
            editData: d,
            showModal: true
        })
    }

    handleUpdateData(d) {
        this.setState({
            editData: {
                ...this.state.editData, [d.target.name]: d.target.value
            }
        })
    }

    handleActionForm() {
        var email = this.state.editData.email;
        var password = this.state.editData.password;
        var newPassword = this.state.editData.newPassword;
        var role = this.state.editData.role;
        var firstname = this.state.editData.firstname;
        var lastname = this.state.editData.lastname;
        var id_user = this.state.editData.id_user || '00000000';
        if (this.state.typeAction === 'add')
            if (!password) {
                this.setState({
                    errorForm: 'Please enter all value'
                })
                return;
            }

        if (this.state.typeAction === 'edit' || this.state.typeAction === 'add')
            if (!email || !role || !firstname) {
                this.setState({
                    errorForm: 'Please enter all value'
                })
                return;
            }

        if (this.state.typeAction === 'user')
            if (!id_user) {
                this.setState({
                    errorForm: 'Please enter name user'
                })
                return;
            }


        if (this.state.typeAction === 'add')
            this.props.actions.todoUsers.addUsers(email.trim(), password.trim(), role.trim(), firstname.trim(), lastname);
        if (this.state.typeAction === 'edit' || this.state.typeAction === 'user')
            this.props.actions.todoUsers.editUsers(this.state.editData.id, email.trim(), role.trim(), firstname.trim(), lastname, id_user.trim());
        if (this.state.typeAction === 'delete')
            this.props.actions.todoUsers.deleteUsers(this.state.editData.id);
        if (this.state.typeAction === 'password')
            this.props.actions.todoUsers.newPassword(this.state.editData.id, newPassword);


        if (this.state.typeAction === 'password') {
        } else {
            this.setState({
                typeAction: '',
                errorForm: '',
                editData: {},
                showModal: false
            })
        }
    }

    handleCancel() {
        this.props.actions.todoUsers.editUsersPasswordModal(false)
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false
        })
    }


    render() {
        const data = this.props.state.users.data;

        let no = 0;
        let dataNodes = data.map(function (data) {
            if (data) {
                let cek = [];
                if (data.role === 'student')
                    cek = this.props.state.student;
                if (data.role === 'instructor')
                    cek = this.props.state.instructor;
                if (data.role === 'hiringpartner')
                    cek = this.props.state.hiringpartner;

                let idObject = cek.findIndex(x => x.id === data.id_user)
                if (idObject === -1)
                    cek = false;
                else
                    cek = true;

                return (<Item key={1 + no++} key_in={1 + no++} data={data} check={cek} handleGetData={this.handleGetData.bind(this)} handleDelete={this.handleDelete.bind(this)} handleGetDataUserID={this.handleGetDataUserID.bind(this)} handleGetDataPassword={this.handleGetDataPassword.bind(this)} />)
            }
        }.bind(this));

        const opt = this.state.optionInput;
        let optionInput = opt.map(function (key) {
            if (key)
                return (<option key={key.id} value={key.id} >{key.name}</option>)
        });

        if (localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user && JSON.parse(localStorage.getItem('lms')).token)
            return (
                <div id="wrapper">
                    <Header isRole={this.isRole.bind(this)} actions={this.props.actions.todoAuth} data={this.props.state.auth} />

                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Users</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Table Users
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>email</th>
                                                    <th>firstname</th>
                                                    <th>lastname</th>
                                                    <th>role</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataNodes}
                                            </tbody>
                                        </table>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.handleAddData() }}>Add</button>
                                    </div>
                                    <Modal show={this.state.showModal} onHide={this.handleCancel.bind(this)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Users</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {((this.state.typeAction === 'add' || this.state.typeAction === 'edit')) &&
                                                <div>
                                                    <div className="has-error">
                                                        <p className="help-block">{this.state.errorForm}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input className="form-control" name="email" value={this.state.editData.email || ''} onChange={this.handleUpdateData.bind(this)} />
                                                        <p className="help-block"></p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Firstname</label>
                                                        <input className="form-control" name="firstname" value={this.state.editData.firstname || ''} onChange={this.handleUpdateData.bind(this)} />
                                                        <p className="help-block"></p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Lastname</label>
                                                        <input className="form-control" name="lastname" value={this.state.editData.lastname || ''} onChange={this.handleUpdateData.bind(this)} />
                                                        <p className="help-block"></p>
                                                    </div>
                                                    {this.state.typeAction === 'add' &&
                                                        <div className="form-group">
                                                            <label>Password</label>
                                                            <input className="form-control" name="password" value={this.state.editData.password || ''} onChange={this.handleUpdateData.bind(this)} />
                                                            <p className="help-block"></p>
                                                        </div>
                                                    }
                                                    <div className="form-group">
                                                        <label>Role</label>
                                                        <select className="form-control" name="role" value={this.state.editData.role || ''} onChange={this.handleUpdateData.bind(this)} >
                                                            <option value="">--select role--</option>
                                                            <option value="student">student</option>
                                                            <option value="admin">admin</option>
                                                            <option value="instructor">instructor</option>
                                                            <option value="hiringpartner">hiringpartner</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            }
                                            {this.state.typeAction === 'delete' &&
                                                <p className="help-block">Are you sure delete {this.state.editData.email}</p>
                                            }
                                            {this.state.typeAction === 'user' &&
                                                <div>
                                                    <div className="form-group">
                                                        <label>Role</label>
                                                        <input className="form-control" name="role" value={this.state.editData.role || ''} disabled />
                                                        <p className="help-block"></p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Name User</label>
                                                        <select className="form-control" name="id_user" value={this.state.editData.id_user || ''} onChange={this.handleUpdateData.bind(this)} >
                                                            <option value="">--select role--</option>
                                                            {optionInput}
                                                        </select>
                                                    </div>
                                                </div>
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>
                                            {this.state.typeAction !== 'delete' &&
                                                <button onClick={() => { this.handleActionForm() }} className="btn btn-primary" type="submit" >Save</button>
                                            }
                                            {this.state.typeAction === 'delete' &&
                                                <button onClick={() => { this.handleActionForm() }} className="btn btn-primary" type="submit" >Delete</button>
                                            }
                                            <button onClick={() => { this.handleCancel() }} className="btn btn-warning" type="button" >Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal show={this.props.state.users.password.modal} onHide={this.handleCancel.bind(this)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Change Password</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>
                                                <div className="has-error">
                                                    <p className="help-block">{this.props.state.users.password.message || ''}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label>New Password</label>
                                                    <input className="form-control" name="newPassword" value={this.state.editData.newPassword || ''} onChange={this.handleUpdateData.bind(this)} />
                                                    <p className="help-block"></p>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={() => { this.handleActionForm() }} className="btn btn-primary" type="submit" >Save</button>
                                            <button onClick={() => { this.handleCancel() }} className="btn btn-warning" type="button" >Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
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
            users: state.users,
            student: state.student,
            instructor: state.instructor,
            hiringpartner: state.hiringpartner,
            auth: state.auth
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoUsers: bindActionCreators(todoUsers, dispatch),
            todoStudent: bindActionCreators(todoStudent, dispatch),
            todoInstructor: bindActionCreators(todoInstructor, dispatch),
            todoHiringpartner: bindActionCreators(todoHiringpartner, dispatch),
            todoAuth: bindActionCreators(todoAuth, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);