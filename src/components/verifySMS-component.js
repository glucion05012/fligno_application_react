import React, { Component } from 'react';
import '../css/create.css';
import axios from 'axios';
import { dbConnection } from '../App';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


export default class verifySMS extends Component {

    constructor(props) {
        super(props);
        this.resend = this.resend.bind(this);
        
        this.state = {
            code: '',
            contact: '',
            //validation
            codeError: '',
        }
    }

    resend() {

        axios.get(dbConnection + "edit/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    contact: response.data.contact,
                })

                // send sms
                console.log(this.state.contact)
                axios.get(dbConnection + 'sendSMS/' + this.state.contact)
                    .then(response => {
                        console.log(response.data);
                        alert('SMS Sent!');
                    })
                    .catch((err) => {
                        console.log(err);
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
        let codeError = '';

        if (this.state.code.length === 0) {
            codeError = "*Field is required..";
        } else if (this.state.code.length !== 4) {
            codeError = "*Code should be 4 digits.";
        }

        if (codeError) {
            this.setState({ codeError });
            return false;
        }

        return true;
    }

    submitHandler = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {

            let codeError = '';
            axios.get(dbConnection + 'edit/' + this.props.match.params.id)
                .then(response => {
                    if (response.data.SMStoken !== this.state.code) {
                        codeError = "*Invalid verification code!";
                        this.setState({ codeError });
                    } else {
                        // backend connection
                        axios.get(dbConnection + 'SMSverify/'+ this.props.match.params.id)
                            .then(res => {

                                toast.success('Profile successfully validated.', {
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
                                    code: '',

                                    //validation
                                    codeError: '',

                                })

                                //this.props.history.push('/'); 
                            }).catch((err) => {
                                console.log(err);
                            });

                    }
                });

        }


    }

    render() {
        const { code } = this.state
        return (
            <div className="content">

                <ToastContainer />

                <h3>Verification Code</h3>
                <form className="form-create" onSubmit={this.submitHandler}>
                    <table className="form-create">
                        <tbody>
                            <tr>
                                <td><label>Enter Code:</label></td>
                                    <td><input type="number" name="code" value={code}
                                    onChange={this.changeHandler} maxLength='4'/></td>

                                <td className="errorMsg">{this.state.codeError}</td>
                            </tr>

                            <tr>
                                <td><input type="submit" className="btn btn-primary" value="Validate" /></td>
                                <td><Link to="/read" className="btn btn-primary">Back</Link></td>

                                <td><Link onClick={this.resend} >Resend Code</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        )
    }
}