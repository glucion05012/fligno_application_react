import React, { Component } from 'react';
import { dbConnection } from '../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/read.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js'

const Profile = props => (
    <tr>
        <td>{props.profile.id}</td>
        <td>{props.profile.name}</td>
        <td>{props.profile.address}</td>
        <td>{props.profile.email}</td>
        <td>{props.profile.age}</td>
        <td>{props.profile.contact}</td>
        <td>{props.profile.isConfirmed === 1 ? 'Verified' : null || props.profile.isConfirmed === 2 ? 'Subscribed' : 'Unverified'}</td>
        <td>
            {props.profile.isConfirmed === 0 ? <Link to={"/verifySMS/" + props.profile.id}>Verify</Link> : null}
            {props.profile.isConfirmed === 0 ? '|' : null}
            {props.profile.isConfirmed !== 0 ? <Link to={"/edit/" + props.profile.id}>Edit</Link> : null}
            {props.profile.isConfirmed !== 0 ? '|' : null}
            <Link to={"/delete/" + props.profile.id}>Delete</Link>

        </td>
    </tr>
)
const Empty = (
    <tr><td align="center" colSpan="8">No Records found.</td></tr>
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
                    console.log(response.data);
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
        if(this.state.profile.length === 0){
            return Empty;
        }else{
            return this.state.profile.map((currentProfile, i) => {
                return <Profile profile={currentProfile} key={i} />;
            });
        }
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (

            <div className="padding">
                <h3>My Profile List</h3>
                <div className="link"><Link to="/create" className="btn btn-success">Add New</Link></div>
                
                <table className="table table-striped style={{ marginTop:20px}}">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Contact</th>
                            <th>Status</th>
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