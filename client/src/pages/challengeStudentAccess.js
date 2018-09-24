import React, { Component } from 'react';

export default class ChallengeStudentAccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            access: this.props.access
        }
    }

    handleUpdateData(d) {
        var arrayvar = this.state.data.student_access

        let checkID = arrayvar.findIndex(x => x === d.target.value)
        if (checkID !== -1) {
            arrayvar = arrayvar.filter(function (a) { return a !== d.target.value })
        } else {
            arrayvar.push(d.target.value)
        }

        this.setState({
            data: {
                ...this.state.data, student_access: arrayvar
            }
        })
    }

    render() {
        const data = this.state.data;

        const access = this.state.access;

        let resultRow = []
        for (var i = 0; i < access.length; i++) {
            let resCek = false;
            for (var j = 0; j < data.student_access.length; j++) {
                if (access[i].id === data.student_access[j])
                    resCek = true
            }
            resultRow.push(<div key={access[i].id} className="col-md-4"><div key={access[i].id} className="checkbox"><label><input type="checkbox" value={access[i].id} onChange={this.handleUpdateData.bind(this)} checked={resCek} />{access[i].name}</label></div></div>)
        }

        return (
            <div className="row">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        View Challenge
                    </div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" name="score" value={data.title || ''} disabled />
                                <p className="help-block"></p>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <input className="form-control" name="score" value={data.content || ''} disabled />
                                <p className="help-block"></p>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input className="form-control" name="score" value={data.category || ''} disabled />
                                <p className="help-block"></p>
                            </div>
                            <br />
                            <br />
                            <div className="row">
                                {resultRow}
                            </div>
                            <br />
                            <br />
                            <button onClick={() => { this.props.handleSaveStudentAccess(this.state.data) }} type="button" className="btn btn-primary"><i className="fa fa-edit"></i> Save</button>
                            <button onClick={() => { this.props.handleBackStudentAccess() }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i> Back</button>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}