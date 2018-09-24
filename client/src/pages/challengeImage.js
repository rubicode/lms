import React, { Component } from 'react';

export default class ChallengeImage extends Component {
    render() {
        const data = this.props.data;
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
                            <img draggable="false" style={{ width: '100%' }} src={`http://localhost:3001/upload/get/challenge/${this.props.data.file}`} alt="cropped image" id="cropper" className="img-thumbnail" />
                            <br />
                            <br />
                            <button onClick={() => { this.props.handleBackImage() }} type="button" className="btn btn-success"><i className="fa fa-edit"></i> Finish</button>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
