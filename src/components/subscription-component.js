import React, { Component } from 'react';
import '../css/create.css';
import { dbConnection } from '../App';
import paypal from 'paypal-checkout';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default class subscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            isConfirmed: '',

        }
    }

    componentDidMount() {
        axios.get(dbConnection + "edit/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    isConfirmed: response.data.isConfirmed,
                })
            })
            .catch((err) => {
                console.log(err);
            })


        let currID= this.props.match.params.id;

            // PAYPALL
            paypal.Button.render({
                env: 'sandbox', // Or 'production'
                style: {
                    size: 'large',
                    color: 'gold',
                    shape: 'pill',
                },
                // Set up the payment:
                // 1. Add a payment callback
                payment: function (data, actions) {
                    // 2. Make a request to your server
                    return actions.request.post(dbConnection + 'create-payment')
                        .then(function (res) {
                            // 3. Return res.id from the response
                            // console.log(res);
                            return res.id;
                        });
                },
                // Execute the payment:
                // 1. Add an onAuthorize callback
                onAuthorize: function (data, actions) {
                    // 2. Make a request to your server
                    return actions.request.post(dbConnection + 'execute-payment', {
                        paymentID: data.paymentID,
                        payerID: data.payerID
                    })
                    .then(function (res) {
                        // update subscription
                        axios.get(dbConnection + "subscribe/" + currID)
                            .then(res => {
                               console.log('successfuly subscribed');
                            }).catch((err) => {
                                console.log(err);

                            })

                        // update subscription end
                        
                        window.location.reload(false);
                        return (res.state);
                            // 3. Show the buyer a confirmation message.
                        });
                }
            }, '#paypal-button');
            // PAYPALL END

    }
    

    render() {
       
        if(this.state.isConfirmed === 0){
            return (
                <div className="center">
                    <h1>Please verify first your profile!</h1>
                </div>
            )
        }else if(this.state.isConfirmed === 2){
            return (
                <div className="center">
                    <h1>Profile successfuly subscribed!</h1>
                </div>
            )
        }else{
            return (
                <div className="center">
                    <ToastContainer />
                    <div id="paypal-button">
                        <p>Please proceed your subcription by paying using your PAYPAL account.</p>
                    </div>
                </div>
            )
        }
    }
}