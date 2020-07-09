import React, { Component } from 'react';
import { dbConnection } from '../App';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Profile = props => (
    <tr>
        <td>{props.profile.id}</td>
        <td>{props.profile.name}</td>
        <td>{props.profile.address}</td>
        <td>{props.profile.email}</td>
        <td>{props.profile.age}</td>
        <td>

            <Link to={"/update/" + props.profile.id}>Edit</Link>|
            <Link to={"/delete/" + props.profile.id}>Delete</Link>

        </td>
    </tr>
)

export default class Read extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { profile: [] };
    }


    componentDidMount() {
        this._isMounted = true;
        axios.get(dbConnection + 'read')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ profile: response.data });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        this._isMounted = true;
        axios.get(dbConnection + 'read')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ profile: response.data });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    profileList() {
        return this.state.profile.map((currentProfile, i) => {
            return <Profile profile={currentProfile} key={i} />;
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (

            <div>
                <h3>My Profile List</h3>
                <table className="table table-striped style={{ marginTop:20px}}">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.profileList()}
                    </tbody>
                </table>
            </div>

        )
    }
}