import React, { Component } from 'react';
import '../css/create.css';
import axios from 'axios';
import { dbConnection } from '../App';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


export default class Edit extends Component {

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

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validate = () => {
        //validation
        let nameError = '';
        let addressError = '';
        let emailError = '';
        let ageError = '';

        if (this.state.name.length === 0) {
            nameError = "*Field is required..";
        } else if (this.state.name.length < 4) {
            nameError = "*Minimum of 4 characters required.";
        }

        if (this.state.address.length === 0) {
            addressError = "*Field is required..";
        }

        if (this.state.email.length === 0) {
            emailError = "*Field is required..";
        }

        if (this.state.age.length === 0) {
            ageError = "*Field is required..";
        } else if (this.state.age < 1) {
            ageError = "*Age cannot be lower than 0.";
        }


        if (nameError || addressError || emailError || ageError) {
            this.setState({ nameError, addressError, emailError, ageError });
            return false;
        }
        return true;
    }

    submitHandler = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            // backend connection
            axios.put(dbConnection + 'update/' + this.props.match.params.id, this.state)
                .then(res => {

                    toast.success(this.state.name + ' successfully updated!', {
                        position: "top-center",
                        transition: Bounce,
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    });

                    this.setState({

                        //validation
                        nameError: '',
                        addressError: '',
                        emailError: '',
                        ageError: ''
                    })

                    //this.props.history.push('/'); 
                });
        }


    }

    render() {
        const { name, address, email, age } = this.state
        return (
            <div className="content">

                <ToastContainer />

                <h3>Update Profile</h3>
                <form className="form-create" onSubmit={this.submitHandler}>
                    <table className="form-create">
                        <tbody>
                            <tr>
                                <td><label>Full Name:</label></td>
                                <td><input type="text" name="name" value={name}
                                    onChange={this.changeHandler} placeholder="Last Name, First Name MI" /></td>

                                <td className="errorMsg">{this.state.nameError}</td>
                            </tr>
                            <tr>
                                <td><label>Address:</label></td>
                                <td><input type="text" name="address" value={address}
                                    onChange={this.changeHandler} /></td>

                                <td className="errorMsg">{this.state.addressError}</td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input type="email" name="email" value={email}
                                    onChange={this.changeHandler} /></td>

                                <td className="errorMsg">{this.state.emailError}</td>
                            </tr>

                            <tr>
                                <td><label>Age:</label></td>
                                <td><input type="number" name="age" value={age}
                                    onChange={this.changeHandler} /></td>

                                <td className="errorMsg">{this.state.ageError}</td>
                            </tr>

                            <tr>
                                <td><input type="submit" className="btn btn-primary" value="Update" /></td>
                                <td><Link to="/read" className="btn btn-primary">Cancel</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        )
    }
}