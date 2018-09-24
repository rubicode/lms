import React, { Component } from 'react';

export default class UsersList extends Component {
    render() {
        const data = this.props.data;
        return (
            <tr key={this.props.key_in}>
                <td>{data.id}</td>
                <td>{data.email}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.role} {this.props.check && <i className="fa fa-check"></i>}</td>
                <td>
                    <button onClick={() => { this.props.handleGetData(data) }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i></button>
                    <button onClick={() => { this.props.handleDelete(data) }} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                    <button onClick={() => { this.props.handleGetDataPassword(data) }} type="button" className="btn btn-success"><i className="fa fa-key"></i></button>
                    <button onClick={() => { this.props.handleGetDataUserID(data) }} type="button" className="btn btn-primary"><i className="fa fa-users"></i></button>
                </td>
            </tr>
        )
    }
}