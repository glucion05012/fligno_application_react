import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // data
            icon: '',
            temp: '',
            city: ''
            
          
        }
    }
    componentDidMount() {
       
        // ipinfo API
        axios.get("https://ipinfo.io/?token=40fd1b3a59a6bc") 
        .then( response =>{

            // openweather API
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + response.data.city + "&units=imperial&appid=b289a697bb9ecbfc41529eed314a7f41")
                .then(response => {
                    let icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"
                    console.log(response.data);

                    this.setState({
                        icon: icon,
                        temp: response.data.main.temp,
                        city: response.data.name
                    })
                }).catch((err) => {
                    console.log(err);
                });
             // openweather API end

        });
    }


    render() {
        return (
            
            <div>
                <h1>This is HOME page</h1>
                
                <img src={this.state.icon} />
                
                <h1>{this.state.temp}</h1>
                <h1>{this.state.city}</h1>
            </div>
            
        )
    }
}
