import React, { Component } from 'react';
import axios from 'axios';
import '../css/home.css';


const News = props => (
        <div className="col-md-3 border-article">
            <div className="row">
                <div className="col-md-2">
                    <div>
                        <a href={props.news.url} target="_blank"><img className="newsUrlToImage" alt="unavailable" src={props.news.urlToImage} /></a>
                        <p className="author">Author: {props.news.author}</p>
                    </div>
                </div>
                <div className="col-md-10">
                    <a href={props.news.url} target="_blank"><p className="title">{props.news.title}</p></a><br/>
                    <p className="newsContent">{props.news.content}</p>
                </div>
            </div>
        </div>
)
const Empty = (
    <div align="center" colSpan="7">Loading...</div>
)

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // weather
            icon: '',
            temp: '',
            humidity: '',
            wind: '',
            city: '',
            region:'',
            day: '',
            description: '',


            // news
            author: '',
            title: '',
            description: '',
            url: '',
            urlToImage: '',
            publishedAt: '',
            content: '',
            news: []
        
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
                city: response.data.city,

            })

            //getting geolocation
            let geoLoc = JSON.stringify(response.data.loc);
            geoLoc = geoLoc.split(',');
            let lat = geoLoc[0];
            let lon = geoLoc[1];

            lat = lat.replace(/['"]+/g, '')
            lon = lon.replace(/['"]+/g, '')

            console.log("LAT:" + lat)
            console.log("LON:" + lon)
            // openweather API
            axios.get("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&units=metric&appid=b289a697bb9ecbfc41529eed314a7f41")
                .then(response => {
                    let icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"
                    console.log(response.data);

                    this.setState({
                        icon: icon,
                        temp: Math.trunc(response.data.main.temp),
                        humidity: response.data.main.humidity,
                        wind: Math.trunc(response.data.wind.speed * 3.6),
                        day: dayToday,
                        description: response.data.weather[0].description
                        
                    })
                }).catch((err) => {
                    console.log(err);
                });
                
             // openweather API end
        });

        //news API
        axios.get("http://newsapi.org/v2/top-headlines?country=ph&apiKey=3846b342a54142149ca91df6121d53ea")
            .then(response => {
                console.log(response.data.articles);
                this.setState({ news: response.data.articles });
            }).catch((err) => {
                console.log(err);
            });

    }

    newsList() {

        if (this.state.news.length === 0) {
            return Empty;
        } else {
            return this.state.news.map((currentNews, i) => {
                return <News news={currentNews} key={i} />;
            });
        }

    }

    render() {
        return (
        <div className="row">
            <div className="col-md-4">
                <h2>Weather Today</h2>
                <div className="weather-content">
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
                                <div className="col-md-7 weatherTitle">Humidity: </div>
                                    <div className="col-md-5 weatherValue">{this.state.humidity}%</div>
                            </div>

                            <div className="row">
                                    <div className="col-md-7 weatherTitle">Wind: </div>
                                    <div className="col-md-5 weatherValue">{this.state.wind} km/h</div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>

            <div className="col-md-8">
                <h2>Latest News</h2>
                <div className="news-content">
                    {this.newsList()}

                </div>

            </div>
        </div>
            
        )
    }
}
