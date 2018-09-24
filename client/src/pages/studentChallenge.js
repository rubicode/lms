import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import C3Chart from 'react-c3js';
import 'c3/c3.css';

import Item from './studentChallengeList';


export default class StudentChallenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false,
            dataStudentChallenge: {},
            dataChallengeTitle: this.props.dataChallengeTitle || [],
            dataChallenge: this.props.dataChallenge || [],
            dataStudent: this.props.dataStudent || {}
        }
    }

    handleAddData() {
        this.setState({
            typeAction: 'addEdit',
            errorForm: '',
            editData: {},
            showModal: true
        });
    }

    handleGetData(d) {
        this.setState({
            typeAction: 'addEdit',
            errorForm: '',
            editData: d,
            showModal: true
        });
    }

    handleDelete(d) {
        this.setState({
            typeAction: 'delete',
            errorForm: '',
            editData: d,
            showModal: true
        });
    }

    handleUpdateData(d) {
        if (d.target[d.target.selectedIndex]) {
            let id = d.target[d.target.selectedIndex].getAttribute('data-id')
            let category = d.target[d.target.selectedIndex].getAttribute('data-category')
            this.setState({
                editData: {
                    ...this.state.editData, id_challenge: id, [d.target.name]: d.target.value, category: category
                }
            });
        } else {
            if (d.target.name === 'score' && d.target.value >= 101)
                alert('score max 100')
            else
                this.setState({
                    editData: {
                        ...this.state.editData, [d.target.name]: d.target.value
                    }
                });
        }
    }

    handleActionForm() {
        let data = this.state.dataStudent;
        let student = this.state.dataStudent.challenges;
        let category = this.state.editData.category;
        let date = this.state.editData.date;
        let score = this.state.editData.score;
        let title = this.state.editData.title;
        let id_challenge = this.state.editData.id_challenge;

        if (!category || !date || !title || !score || !id_challenge) {
            this.setState({
                errorForm: 'Please enter all value'
            })
            return;
        }
        if (this.state.typeAction === 'addEdit') {
            let checkID = student.findIndex(x => x.id_challenge === id_challenge)
            if (checkID !== -1) {
                student = student.map(function (x) {
                    if (x.id_challenge === id_challenge) {
                        x.score = score;
                        x.date = date;
                        x.category = category;
                    }
                    return x;
                });
            } else {
                student.push({ id_challenge: id_challenge.trim(), title: title.trim(), score: score.trim(), date: date.trim(), category: category.trim() })
            }
        } else if (this.state.typeAction === 'delete') {
            student = student.filter(obj => obj.id_challenge !== this.state.editData.id_challenge);
        }

        this.props.actions.todoStudent.changeChallengeStudent(this.state.dataStudent.id, JSON.stringify(student));
        data['challenges'] = student;
        this.setState({
            dataStudent: data,
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false
        });
    }

    handleCancel() {
        this.setState({
            typeAction: '',
            errorForm: '',
            editData: {},
            showModal: false
        });
    }

    objectFindByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }

    handleUpdateDataDate(e) {
        this.setState({
            editData: {
                ...this.state.editData, date: e.slice(0, 10)
            }
        })
    }

    render() {
        const { editData, dataChallenge, dataChallengeTitle, dataStudent } = this.state;

        if (dataStudent.challenges)
            dataStudent.challenges.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            
        let dataNodes = dataStudent.challenges.map(function (data) {
            if (data)
                return (<Item key={data.id_challenge} data={data} challengeTitle={dataChallengeTitle} isRole={this.props.isRole} handleGetData={this.handleGetData.bind(this)} handleDelete={this.handleDelete.bind(this)} />)
        }.bind(this));

        let challengeNodes = dataChallenge.map(function (challenge) {
            if (challenge)
                return (<option key={challenge.id} data-id={challenge.id} value={challenge.title} data-category={challenge.category} >{challenge.title}</option>)
        });
        // total score
        let totalScore = 0

        // Chart Score
        let resultScore = dataStudent.challenges.reduce(function (r, a) {
            if (r && a) {
                r[a.date] = r[a.date] || [];
                if (isNaN(a.score))
                    r[a.date].push(0);
                else {
                    r[a.date].push(a.score);
                    totalScore += parseInt(a.score)
                }
                return r;
            }
        }, Object.create(null));

        let score = [];
        let date = [];

        Object.keys(resultScore).forEach(function (key) {
            if (key) {
                score.push(eval(resultScore[key].join('+')))
                date.push(key)
            }
        });

        score.unshift('score');
        date.unshift('x')

        let student = {
            x: 'x',
            columns: [
                date,
                score
            ],
            types: {
                score: 'area'
            },
            type: 'line'
        }

        let axis = {
            x: {
                type: 'category',
                tick: {
                    rotate: -75,
                    multiline: false
                },
                height: 130
            },
            y: {
                min: 1
            }
        }

        let resultCategory = dataStudent.challenges.reduce(function (r, a) {
            if (r && a) {
                r[a.category] = r[a.category] || [];
                if (isNaN(a.score))
                    r[a.category].push(0);
                else
                    r[a.category].push(a.score);
                return r;
            }
        }, Object.create(null));


        // Chart Category
        let scoreCtg = [];
        let dateCtg = [];

        Object.keys(resultCategory).forEach(function (key) {
            if (key) {
                scoreCtg.push(eval(resultCategory[key].join('+')) / resultCategory[key].length)
                dateCtg.push(key)
            }
        });

        scoreCtg.unshift('category');
        dateCtg.unshift('x')

        let studentCtg = {
            x: 'x',
            columns: [
                dateCtg,
                scoreCtg
            ],
            type: 'bar'
        }

        let axisCtg = {
            x: {
                type: 'category',
                tick: {
                    rotate: -75,
                    multiline: false
                },
                height: 130
            },
            y: {
                max: 100,
                min: 1
            }
        }

        const mountNode = document.getElementById('react-c3js');
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Result of Challenge</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Table Student Challenge
                        </div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <label>NIM</label>
                                    <input className="form-control" name="score" value={dataStudent.nim || ''} onChange={this.handleUpdateData.bind(this)} disabled />
                                    <p className="help-block"></p>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" name="score" value={dataStudent.name || ''} onChange={this.handleUpdateData.bind(this)} disabled />
                                    <p className="help-block"></p>
                                </div>
                                <hr />
                                <span style={{display:'block',fontSize:73,color:'#337ab7'}}>Total Score: {totalScore}</span>
                                <hr />
                                <C3Chart data={student} axis={axis} />, {mountNode}
                                <hr />
                                <hr />
                                <C3Chart data={studentCtg} axis={axisCtg} />, {mountNode}
                                <hr />
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Score</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataNodes}
                                        </tbody>
                                    </table>
                                </div>
                                {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                                    <button type="button" className="btn btn-primary" onClick={() => { this.handleAddData() }}>Add</button>
                                }
                                <button onClick={() => { this.props.handleChallengeBack() }} className="btn btn-warning" type="button" >Back</button>
                            </div>
                            <Modal show={this.state.showModal} onHide={this.handleCancel.bind(this)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Challenge Score</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {this.state.typeAction !== 'delete' &&
                                        <div>
                                            <div className="has-error">
                                                <p className="help-block">{this.state.errorForm}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>score</label>
                                                <input className="form-control" name="score" type="number" value={editData.score || ''} onChange={this.handleUpdateData.bind(this)} />
                                                <p className="help-block"></p>
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select className="form-control" name="title" value={editData.title || ''} onChange={this.handleUpdateData.bind(this)} >
                                                    <option value="">--select challenge--</option>
                                                    {challengeNodes}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <DatePicker formattedValue="YYYY-MM-DD" dateFormat="YYYY-MM-DD" id="example-datepicker" name="date" value={editData.date || ''} onChange={this.handleUpdateDataDate.bind(this)} />
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
        );
    }
}