import React, { Component } from 'react';
import '../notfound.css';
import logo from '../logo-color.png'

export default class notFound extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="error-template">
                        <img draggable="false" style={{ width: '200px' }} src={logo} alt="lms" />
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions">
                                <a href="/dashboard" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                    &nbsp;&nbsp;Take Me Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
