import React, { Component } from 'react';

export default class StudentChallengeList extends Component {
    render() {
        const { data, challengeTitle } = this.props;
        return (
            <tr key={data.id_challenge}>
                <td>{data.id_challenge}</td>
                <td>{challengeTitle[data.id_challenge]}</td>
                <td>{data.score}</td>
                <td>{data.date}</td>
                <td>
                    {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                        <button onClick={() => { this.props.handleGetData(data) }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i></button>
                    }
                    {(this.props.isRole('instructor') || this.props.isRole('admin')) &&
                        <button onClick={() => { this.props.handleDelete(data) }} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                    }
                </td>
            </tr>
        )
    }
}