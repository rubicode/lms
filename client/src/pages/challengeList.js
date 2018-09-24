import React, { Component } from 'react';

export default class ChallengeList extends Component {
    render() {
        const data = this.props.data;

        let access = [];
        if (this.props.access)
            access = this.props.access

        let resultRow = []
        for (var i = 0; i < access.length; i++) {
            let resCek = false;
            for (var j = 0; j < data.student_access.length; j++) {
                if (access[i].id === data.student_access[j])
                    resultRow.push(<div key={access[i].id}><label>{access[i].name}</label></div>)
            }
        }
        return (
            <tr key={this.props.key_in}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.content}</td>
                <td>{data.category}</td>
                <td>{resultRow}</td>
                <td>
                    {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                        <button onClick={() => { this.props.handleGetData(data) }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i></button>
                    }
                    {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                        <button onClick={() => { this.props.handleDelete(data) }} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                    }
                    <button onClick={() => { this.props.handleViewImage(data) }} type="button" className="btn btn-success"><i className="fa fa-gamepad"></i></button>
                    {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                        <button onClick={() => { this.props.handleStudentAccess(data) }} type="button" className="btn btn-default"><i className="fa fa-gamepad"></i></button>
                    }
                </td>
            </tr>
        )
    }
}