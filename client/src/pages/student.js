import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../components/menuSidebar';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Item from './studentList';
import ChallengeStudent from './studentChallenge';

import { bindActionCreators } from 'redux';
import * as todoStudent from '../actions/studentActions';
import * as todoChallenge from '../actions/challengeActions';
import * as todoCategory from '../actions/categoryActions';
import * as todoAuth from '../actions/authActions';
import { connect } from 'react-redux';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countLoad: 0,
            showModal: false,
            typeAction: '',
            errorForm: '',
            editData: {},
            challengeAction: false,
            challengeData: {},
            categoryData: {},
            src: null,
            cropResult: false,
            cropOkResult: true
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
        this.props.actions.todoChallenge.challenge();
        this.props.actions.todoCategory.category();

        const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;
        const id_user = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.id_user : null;

        if (userRole === 'student' && id_user) {
            this.props.actions.todoStudent.loadStudentID(id_user);
        } else {
            window.addEventListener('scroll', this.handleScroll.bind(this));
            this.props.actions.todoStudent.loadStudent(this.state.countLoad, 20);
            this.setState({
                countLoad: this.state.countLoad + 20
            })
        }
    }

    componentWillUnmount() {
        const userRole = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user ? JSON.parse(localStorage.getItem('lms')).user.role : null;

        if (!userRole === 'student') {
            window.removeEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    handleScroll(event) {
        var target = 0
        // if (event.srcElement)
        //     target = event.srcElement.body || 0
        // else
            target = document.documentElement || 0;


        let scrollTop = target.scrollTop;

        if (Math.ceil(scrollTop) + window.innerHeight === document.body.clientHeight) {
            const data = this.props.state.student
            if (this.state.countLoad === data.length && !this.state.challengeAction) {
                this.props.actions.todoStudent.loadStudent(this.state.countLoad, 20);

                this.setState({
                    countLoad: this.state.countLoad + 20
                })
            }
        }
    }

    handleAddData() {
        this.setState({
            showModal: true,
            typeAction: 'add',
            errorForm: '',
            editData: {},
            challengeAction: false
        })
    }

    handleGetData(d) {
        this.setState({
            showModal: true,
            typeAction: 'edit',
            errorForm: '',
            editData: d,
            challengeAction: false
        })
    }

    handleDelete(d) {
        this.setState({
            showModal: true,
            typeAction: 'delete',
            errorForm: '',
            editData: d,
            challengeAction: false
        })
    }

    handleChallenge(e) {
        this.setState({
            showModal: false,
            typeAction: '',
            errorForm: '',
            editData: {},
            challengeAction: true,
            challengeData: e
        })
    }

    handleChallengeBack() {
        this.setState({
            showModal: false,
            typeAction: '',
            errorForm: '',
            editData: {},
            challengeAction: false,
            challengeData: {}
        })
    }

    handleChartBack() {
        this.setState({
            showModal: false,
            typeAction: '',
            errorForm: '',
            editData: {},
            challengeAction: false,
            challengeData: {}
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
        var nim = this.state.editData.nim;
        var name = this.state.editData.name;
        var file = this.state.editData.file;
        if (!name || !nim || !file) {
            this.setState({
                errorForm: 'Please enter all value'
            })
            return;
        }
        if (this.state.typeAction === 'add')
            this.props.actions.todoStudent.addStudent(name.trim(), nim.trim(), file.trim());
        if (this.state.typeAction === 'edit')
            this.props.actions.todoStudent.editStudent(this.state.editData.id, name.trim(), nim.trim(), file.trim());
        if (this.state.typeAction === 'delete')
            this.props.actions.todoStudent.deleteStudent(this.state.editData.id)
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            challengeAction: false,
            src: null,
            cropResult: false
        })
    }

    handleCancel() {
        this.setState({
            showModal: false,
            typeAction: '',
            errorForm: '',
            editData: {},
            challengeAction: false,
            cropResult: false
        })
    }

    handleUpload(e) {
        const data = new FormData();
        data.append('files', e.target.files[0]);

        this.props.actions.todoStudent.sendStudentImage(data)
    }


    onChangeFile(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files[0] && files[0].size > 1000000) {
            alert('file max 1mb !')
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
        const data = this.props.state.student;
        const challenge = this.props.state.challenge;

        var challengeTitle = []
        if (challenge.length > 0)
            for (var i = 0; i < challenge.length; i++) {
                challengeTitle[challenge[i].id]=challenge[i].title;
            }

        let no = 0;
        let dataNodes = data.map(function (data) {
            if (data)
                return (<Item key={data.id + no++} key_in={data.id + no++} data={data} challenge={challengeTitle} isRole={this.isRole} handleGetData={this.handleGetData.bind(this)} handleDelete={this.handleDelete.bind(this)} handleChallenge={this.handleChallenge.bind(this)} />)
        }.bind(this));

        if (localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).user && JSON.parse(localStorage.getItem('lms')).token)
            return (
                <div id="wrapper">
                    <Header isRole={this.isRole.bind(this)} actions={this.props.actions.todoAuth} data={this.props.state.auth} />

                    {!this.state.challengeAction &&
                        <div id="page-wrapper">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h1 className="page-header">Student</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Table Student
                                    </div>
                                    <div className="panel-body">
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table table-striped table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>nim</th>
                                                            <th>Name</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataNodes}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {(this.isRole('instructor') || this.isRole('admin')) &&
                                                <button type="button" className="btn btn-primary" onClick={() => { this.handleAddData() }}>Add</button>
                                            }
                                        </div>
                                        <div>
                                        </div>
                                        <Modal show={this.state.showModal} onHide={this.handleCancel.bind(this)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Student</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {this.state.typeAction !== 'delete' &&
                                                    <div>
                                                        <div className="has-error">
                                                            <p className="help-block">{this.state.errorForm}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>nim</label>
                                                            <input className="form-control" name="nim" value={this.state.editData.nim || ''} onChange={this.handleUpdateData.bind(this)} />
                                                            <p className="help-block has-error"></p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input className="form-control" name="name" value={this.state.editData.name || ''} onChange={this.handleUpdateData.bind(this)} />
                                                            <p className="help-block"></p>
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
                                                                                aspectRatio={4 / 4}
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
                                                                    <img draggable="false" style={{ width: '100%' }} src={`http://localhost:3001/upload/get/${this.state.editData.file}`} alt="cropped image" id="cropper" className="img-thumbnail" />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {this.state.typeAction === 'delete' &&
                                                    <p className="help-block">Are you sure delete {this.state.editData.name}</p>
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
                    }
                    {this.state.challengeAction &&
                        <ChallengeStudent isRole={this.isRole} dataStudent={this.state.challengeData} dataChallenge={this.props.state.challenge} dataChallengeTitle={challengeTitle} dataCategory={this.props.state.category} actions={this.props.actions} handleChallengeBack={this.handleChallengeBack.bind(this)} />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Student);
