import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../components/menuSidebar';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Item from './challengeList';
import StudentAccess from './challengeStudentAccess';
import ImageViewElement from './challengeImage';

import { bindActionCreators } from 'redux';
import * as todoStudent from '../actions/studentActions';
import * as todoChallenge from '../actions/challengeActions';
import * as todoCategory from '../actions/categoryActions';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ChallengeView: true,
            countLoad: 0,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            src: null,
            cropResult: false,
            cropOkResult: true,
            ImageView: false,
            StudentAccessView: false
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
        this.props.actions.todoChallenge.loadChallenge(this.state.countLoad, 20);
        this.setState({
            countLoad: this.state.countLoad + 20
        })
        this.props.actions.todoCategory.category();
        this.props.actions.todoStudent.student();
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
            const data = this.props.state.challenge
            if (this.state.countLoad === data.length && this.state.ChallengeView) {
                this.props.actions.todoChallenge.loadChallenge(this.state.countLoad, 20);

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

    handleSaveStudentAccess(a) {
        if (this.state.typeAction === 'access')
            this.props.actions.todoChallenge.editChallenge(a.id, a.title, a.content, a.category, a.file, JSON.stringify(a.student_access));

        this.setState({
            ChallengeView: true,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            src: null,
            cropResult: false,
            ImageView: false,
            StudentAccessView: false
        })
    }

    handleActionForm() {
        var title = this.state.editData.title;
        var content = this.state.editData.content;
        var category = this.state.editData.category;
        var file = this.state.editData.file;
        var student_access = this.state.editData.student_access || [];
        if (!title || !content || !category || !file) {
            this.setState({
                errorForm: 'Please enter all value'
            })
            return;
        }
        if (this.state.typeAction === 'add')
            this.props.actions.todoChallenge.addChallenge(title.trim(), content.trim(), category.trim(), file.trim());
        if (this.state.typeAction === 'edit')
            this.props.actions.todoChallenge.editChallenge(this.state.editData.id, title.trim(), content.trim(), category.trim(), file.trim(), JSON.stringify(student_access));
        if (this.state.typeAction === 'delete')
            this.props.actions.todoChallenge.deleteChallenge(this.state.editData.id)

        this.setState({
            ChallengeView: true,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            src: null,
            cropResult: false,
            ImageView: false,
            StudentAccessView: false
        })
    }

    handleCancel() {
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            cropResult: false
        })
    }

    handleViewImage(d) {
        this.setState({
            ChallengeView: false,
            editData: d,
            showModal: false,
            cropResult: false,
            ImageView: true
        })
    }

    handleBackImage() {
        this.setState({
            ChallengeView: true,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            cropResult: false,
            ImageView: false,
            StudentAccessView: false
        })
    }

    handleStudentAccess(d) {
        this.setState({
            ChallengeView: false,
            typeAction: 'access',
            editData: d,
            showModal: false,
            cropResult: false,
            ImageView: false,
            StudentAccessView: true
        })
    }

    handleBackStudentAccess() {
        this.setState({
            ChallengeView: true,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            cropResult: false,
            ImageView: false,
            StudentAccessView: false
        })
    }


    onChangeFile(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files[0].size > 3000000) {
            alert('file max 3mb !')
            document.getElementById('file').value = null;
            this.setState({
                src: null,
                cropResult: false
            });
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    src: reader.result,
                    cropOkResult: true
                });
            };
            reader.readAsDataURL(files[0]);
        }
    }

    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });
    }

    handleCropClear() {
        document.getElementById('file').value = null;
        this.setState({
            src: null,
            cropResult: false
        });
    }

    handleCropOk() {
        if (this.state.cropResult)
            this.setState({
                cropOkResult: false,
                editData: {
                    ...this.state.editData, file: document.getElementById("cropper").src
                }
            });
    }


    render() {
        let data = this.props.state.challenge;

        const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;
        const id_user = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.id_user : null;

        if (userRole === 'student' && id_user) {
            var filterData = [];
            for (var i = 0; i < data.length; i++) {
                let student_access = data[i].student_access
                if (student_access)
                    for (var j = 0; j < student_access.length; j++) {
                        if (student_access[j] === id_user)
                            filterData.push(data[i]);
                    }
            }
            data = filterData
        }

        let no = 0;
        let dataNodes = data.map(function (data) {
            if (data)
                return (<Item key={data.id + no++} key_in={data.id + no++} data={data} isRole={this.isRole} handleStudentAccess={this.handleStudentAccess.bind(this)} handleViewImage={this.handleViewImage.bind(this)} handleGetData={this.handleGetData.bind(this)} handleDelete={this.handleDelete.bind(this)} access={this.props.state.student} />)
        }.bind(this));

        const category = this.props.state.category;

        let categoryNodes = category.map(function (category) {
            if (category)
                return (<option key={category.id} value={category.title} >{category.title}</option>)
        });

        if (localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user && JSON.parse(localStorage.getItem('lms')).token)
            return (
                <div id="wrapper">
                    <Header isRole={this.isRole.bind(this)} actions={this.props.actions.todoAuth} data={this.props.state.auth} />

                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Challenge</h1>
                            </div>
                        </div>
                        {this.state.ChallengeView &&
                            <div className="row">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Table Challenge
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>title</th>
                                                        <th>content</th>
                                                        <th>category</th>
                                                        <th>access</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataNodes}
                                                </tbody>
                                            </table>
                                            {(this.isRole('instructor') || this.isRole('admin')) &&
                                                <button type="button" className="btn btn-primary" onClick={() => { this.handleAddData() }}>Add</button>
                                            }
                                        </div>
                                        <Modal show={this.state.showModal} onHide={this.handleCancel.bind(this)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Challenge</Modal.Title>
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
                                                        <div className="form-group">
                                                            <label>Content</label>
                                                            <input className="form-control" name="content" value={this.state.editData.content || ''} onChange={this.handleUpdateData.bind(this)} />
                                                            <p className="help-block"></p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Category</label>
                                                            <select className="form-control" name="category" value={this.state.editData.category || ''} onChange={this.handleUpdateData.bind(this)} >
                                                                <option value="">--select category--</option>
                                                                {categoryNodes}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Image</label>
                                                            <input className="form-control" type="file" id='file' onChange={this.onChangeFile.bind(this)} accept="image/*" />
                                                            {this.state.src &&
                                                                <div>
                                                                    {this.state.cropOkResult &&
                                                                        <div style={{ width: '100%' }}>
                                                                            <br />
                                                                            <br />
                                                                            <Cropper
                                                                                style={{ height: 400, width: '100%' }}
                                                                                preview=".img-preview"
                                                                                guides={false}
                                                                                src={this.state.src}
                                                                                ref={cropper => { this.cropper = cropper; }}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    <div style={{ maxWidth: 280 }}>
                                                                        {this.state.cropOkResult &&
                                                                            <div>
                                                                                <blockquote>
                                                                                    <p>Crop</p>
                                                                                </blockquote>
                                                                                <button className="btn btn-success" onClick={this.cropImage.bind(this)}>
                                                                                    Crop Image
                                                                            </button>
                                                                                <button className="btn btn-primary" onClick={this.handleCropOk.bind(this)}>
                                                                                    Ok Crop
                                                                            </button>
                                                                                <button className="btn btn-danger" onClick={this.handleCropClear.bind(this)}>
                                                                                    Clear Crop
                                                                            </button>
                                                                            </div>
                                                                        }
                                                                        {this.state.cropResult &&
                                                                            <div>
                                                                                <br />
                                                                                <img draggable="false" style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" id="cropper" className="img-thumbnail" />
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                            {!this.state.cropResult &&
                                                                <div style={{ maxWidth: 280 }}>
                                                                    <br />
                                                                    <img draggable="false" style={{ width: '100%' }} src={`http://localhost:3001/upload/get/challenge/${this.state.editData.file}`} alt="cropped image" id="cropper" className="img-thumbnail" />
                                                                </div>
                                                            }
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
                        }
                        {this.state.ImageView &&
                            <ImageViewElement handleBackImage={this.handleBackImage.bind(this)} data={this.state.editData} />
                        }
                        {this.state.StudentAccessView &&
                            <StudentAccess handleActionForm={this.handleActionForm.bind(this)} handleSaveStudentAccess={this.handleSaveStudentAccess.bind(this)} handleBackStudentAccess={this.handleBackStudentAccess.bind(this)} data={this.state.editData} access={this.props.state.student} />
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
            challenge: state.challenge,
            category: state.category,
            auth: state.auth
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoStudent: bindActionCreators(todoStudent, dispatch),
            todoChallenge: bindActionCreators(todoChallenge, dispatch),
            todoCategory: bindActionCreators(todoCategory, dispatch),
            todoAuth: bindActionCreators(todoAuth, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
