import React, { Component } from 'react';
import '../css/create.css';
import axios from 'axios';
import { dbConnection } from '../App';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default class Delete extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: '',
            address: '',
            email: '',
            age: '',

            //validation
            nameError: '',
            addressError: '',
            emailError: '',
            ageError: ''
        }
    }

    componentDidMount() {
        axios.get(dbConnection + "edit/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    email: response.data.email,
                    age: response.data.age
                })

            })
            .catch((err) => {
                console.log(err);
            })

    }

    submitHandler = (e) => {
        e.preventDefault();

        // backend connection
        axios.delete(dbConnection + 'delete/' + this.props.match.params.id, this.state)
            .then(res => {

                toast.error(this.state.name + ' successfully deleted!', {
                    position: "top-center",
                    transition: Bounce,
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });

        window.setTimeout(() => {
            this.props.history.push('/read');
        }, 5000)

    }

    render() {
        const { name, address, email, age } = this.state
        return (
            <div className="content">

                <ToastContainer />

                <h3 className="colorRed">Are you sure you want to delete profile?</h3>
                <form className="form-create" onSubmit={this.submitHandler}>
                    <table className="form-create">
                        <tbody>
                            <tr>
                                <td><label>Full Name:</label></td>
                                <td><input type="text" name="name" value={name}
                                    onChange={this.changeHandler} disabled /></td>

                                <td className="errorMsg">{this.state.nameError}</td>
                            </tr>
                            <tr>
                                <td><label>Address:</label></td>
                                <td><input type="text" name="address" value={address}
                                    onChange={this.changeHandler} disabled/></td>

                                <td className="errorMsg">{this.state.addressError}</td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input type="email" name="email" value={email}
                                    onChange={this.changeHandler} disabled/></td>

                                <td className="errorMsg">{this.state.emailError}</td>
                            </tr>

                            <tr>
                                <td><label>Age:</label></td>
                                <td><input type="number" name="age" value={age}
                                    onChange={this.changeHandler} disabled/></td>

                                <td className="errorMsg">{this.state.ageError}</td>
                            </tr>

                            <tr>
                                <td><input type="submit" className="btn btn-danger" value="Yes, Delete"/></td>
                                <td><Link to="/read" className="btn btn-primary">Cancel</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        )
    }
}