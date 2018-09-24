import React, { Component } from 'react';

export default class CategoryList extends Component {
    render() {
        const data = this.props.data;
        return (
            <tr key={this.props.key_in}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>
                    <button onClick={() => { this.props.handleGetData(data) }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i></button>
                    <button onClick={() => { this.props.handleDelete(data) }} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}