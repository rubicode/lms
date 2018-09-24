import React, { Component } from 'react';

import logo from '../logo-color.png'

import { bindActionCreators } from 'redux';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editData: {}
        }
    }
    componentDidMount() {
        this.props.actions.todoAuth.cek()
    }

    handleUpdateData(d) {
        this.setState({
            editData: {
                ...this.state.editData, [d.target.name]: d.target.value
            }
        });
    }

    handleLogin() {
        let id = this.state.editData.id;
        let email = this.state.editData.email;
        let password = this.state.editData.password;

        this.props.actions.todoAuth.newPassword(id, email, password);
    }

    render() {
        const { editData } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <img draggable="false" style={{ width: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '10%' }} src={logo} alt="lms" />
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">New Password</h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <fieldset>
                                        <div className="has-error">
                                            <p className="help-block">{this.props.state.auth.message || ''}</p>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="ID User" name="id" type="id" value={editData.id || ''} onChange={this.handleUpdateData.bind(this)} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="E-mail" name="email" type="email" value={editData.email || ''} onChange={this.handleUpdateData.bind(this)} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" name="password" type="password" value={editData.password || ''} onChange={this.handleUpdateData.bind(this)} />
                                        </div>
                                        <button className="btn btn-lg btn-warning btn-block" type="button" onClick={() => { this.handleLogin() }}>Save</button>
                                        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => { window.location.href = 'registration' }}>Registration</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        state: {
            auth: state.auth
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoAuth: bindActionCreators(todoAuth, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
