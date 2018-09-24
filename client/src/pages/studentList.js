import React, { Component } from 'react';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';

export default class StudentList extends Component {

    render() {
        const { data, challenge } = this.props;
        if (typeof data.challenges === 'undefined')
            data.challenges = []

        let tooltipChallange = []
        for (var key in data.challenges) {
            if (data.challenges.hasOwnProperty(key)) {
                if (challenge)
                    tooltipChallange.push(<div key={key}>{`${challenge[data.challenges[key].id_challenge]} : ${data.challenges[key].score}`}<br /></div>)
            }
        }

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>{tooltipChallange}</strong>
            </Tooltip>
        );


        return (
            <tr key={this.props.key_in}>
                <td>{data.id}</td>
                <td>{data.nim}</td>
                {this.props.isRole('admin') &&
                    <td>
                        <OverlayTrigger placement="left" overlay={tooltip}>
                            <div>{data.name}</div>
                        </OverlayTrigger>
                    </td>
                }
                {!this.props.isRole('admin') &&
                    <td>{data.name}</td>
                }
                <td>
                    {this.props.isRole('admin') &&
                        <button onClick={() => { this.props.handleGetData(data) }} type="button" className="btn btn-warning"><i className="fa fa-edit"></i></button>
                    }
                    {this.props.isRole('admin') &&
                        <button onClick={() => { this.props.handleDelete(data) }} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                    }
                    <button onClick={() => { this.props.handleChallenge(data) }} type="button" className="btn btn-success"><i className="fa fa-gamepad"></i></button>
                </td>
            </tr>
        )
    }
}