import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../components/menuSidebar';

import Item from './categoryList';

import { bindActionCreators } from 'redux';
import * as todoCategory from '../actions/categoryActions';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countLoad: 0,
            typeAction: '',
            errorForm: '',
            editData: {},
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
        this.props.actions.todoCategory.loadCategory(this.state.countLoad, 20);
        this.setState({
            countLoad: this.state.countLoad + 20
        })
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
            const data = this.props.state.category;
            if (this.state.countLoad === data.length) {
                this.props.actions.todoCategory.loadCategory(this.state.countLoad, 20);

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
        var title = this.state.editData.title;
        if (!title) {
            this.setState({
                errorForm: 'Please enter value'
            })
            return;
        }
        if (this.state.typeAction === 'add')
            this.props.actions.todoCategory.addCategory(title.trim());
        if (this.state.typeAction === 'edit')
            this.props.actions.todoCategory.editCategory(this.state.editData.id, title.trim());
        if (this.state.typeAction === 'delete')
            this.props.actions.todoCategory.deleteCategory(this.state.editData.id)
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false
        })
    }

    handleCancel() {
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false
        })
    }

    render() {
        const data = this.props.state.category;

        let no = 0;
        let dataNodes = data.map(function (data) {
            if (data)
                return (<Item key={data.id + no++} key_in={data.id + no++} data={data} handleGetData={this.handleGetData.bind(this)} handleDelete={this.handleDelete.bind(this)} />)
        }.bind(this));


        if (localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user && JSON.parse(localStorage.getItem('lms')).token)
            return (
                <div id="wrapper">
                    <Header isRole={this.isRole.bind(this)} actions={this.props.actions.todoAuth} data={this.props.state.auth} />

                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Category</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Table Category
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
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
                                            <Modal.Title>Category</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {this.state.typeAction !== 'delete' &&
                                                <div>
                                                    <div className="has-error">
                                                        <p className="help-block">{this.state.errorForm}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input className="form-control" name="title" value={this.state.editData.title || ''} onChange={this.handleUpdateData.bind(this)} />
                                                        <p className="help-block"></p>
                                                    </div>
                                                </div>
                                            }
                                            {this.state.typeAction === 'delete' &&
                                                <p className="help-block">Are you sure delete {this.state.editData.title}</p>
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
            category: state.category,
            auth: state.auth
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoCategory: bindActionCreators(todoCategory, dispatch),
            todoAuth: bindActionCreators(todoAuth, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
