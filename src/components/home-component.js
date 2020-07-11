import React, { Component } from 'react';
import axios from 'axios';
import '../css/home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // data
            icon: '',
            temp: '',
            humidity: '',
            wind: '',
            city: '',
            region:'',
            day: '',
            description: ''
            
          
        }
    }
    componentDidMount() {

        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var dayToday = weekday[d.getDay()];

       
        // ipinfo API
        axios.get("https://ipinfo.io/?token=40fd1b3a59a6bc") 
        .then( response =>{
            console.log(response.data);

            this.setState({
                region: response.data.region,

            })


            // openweather API
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + response.data.city + "&units=metric&appid=b289a697bb9ecbfc41529eed314a7f41")
                .then(response => {
                    let icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"
                    console.log(response.data);

                    this.setState({
                        icon: icon,
                        temp: Math.trunc(response.data.main.temp),
                        humidity: response.data.main.humidity,
                        wind: response.data.wind.speed,
                        city: response.data.name,
                        day: dayToday,
                        description: response.data.weather[0].description
                        
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
            <h2>Weather Today</h2>
            <div className="home-content">
                <h4>{this.state.city}, {this.state.region}</h4>
                <h5>{this.state.day}</h5>
                <h5>{this.state.description}</h5>

                <div className="row">
                    <div className="col-md-3">
                        <img src={this.state.icon} />
                    </div>
                    <div className="col-md-3 temp">
                        <p>{this.state.temp}&#8451;</p>
                    </div>
                    <div className="col-md-6 details">
                        <div className="row">
                            <div className="col-md-8 title">Humidity: </div>
                            <div className="col-md-4">{this.state.humidity}%</div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 title">Wind: </div>
                            <div className="col-md-4">{this.state.wind}%</div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
            
        )
    }
}
