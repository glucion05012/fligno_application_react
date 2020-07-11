import React, { Component } from 'react';

export default class API extends Component {


    render() {
        return (

            <div className="padding">

                <table className="table table-striped style={{ marginTop:20px}}">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>YouTube Search API</td>
                            <td>YouTube video search API connection sample using PHP.</td>
                            <td><a href="http://giddel-lucion-portfolio.herokuapp.com/projects/api" target="_blank">go to link</a></td>
                        </tr>

                        <tr>
                            <td>Face Recognition Library</td>
                            <td>a JavaScript library to open camera of device to capture face expression.</td>
                            <td><a href="https://face-recognition-js.herokuapp.com/" target="_blank">go to link</a></td>
                        </tr>

                        <tr>
                            <td>Facebook Messenger API</td>
                            <td>Facebook messenger API to let you send a private message to a facebook page.</td>
                            <td><a href="http://giddel-lucion-portfolio.herokuapp.com/projects/facebook-messenger-api" target="_blank">go to link</a></td>
                        </tr>
                    </tbody>
                </table>

            </div>

        )
    }
}
