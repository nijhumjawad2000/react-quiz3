import React, { Component } from "react";
import axios from 'axios';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Miami",
      days: [],
      daysFull: [],
      temps: [],
      minTemps: [],
      maxTemps: [],
      humidity: [],
      pressure: [],
      wind: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }

  fetchData = () => {
    const url = this.buildUrlApi();
    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const currentData = this.currentData();
      const dayAndWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const currentDay = "Now";
      const currentDayFull =
        dayAndWeek[new Date(currentData.dt_txt).getDay()];
      const nowTemp = Math.round(currentData.main.temp);
      const nowMinTemp = Math.round(currentData.main.temp_min);
      const nowMaxTemp = Math.round(currentData.main.temp_max);
      const nowHumidity = Math.round(currentData.main.humidity);
      const nowPressure = Math.round(currentData.main.pressure);
      const nowWind = Math.round(currentData.wind.speed);
      const nowWeather = currentData.weather[0].description;
      const nowIcon = currentData.weather[0].icon;

      const days = [];
      const daysFull = [];
      const temps = [];
      const minTemps = [];
      const maxTemps = [];
      const humidity = [];
      const pressure = [];
      const wind = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i+1) {
        let date = new Date(this.state.data.list[i].dt_txt);
        let dayFull = dayAndWeek[date.getDay()];
        days.push(this.state.data.list[i].dt_txt);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));
        humidity.push(Math.round(this.state.data.list[i].main.humidity));
        pressure.push(Math.round(this.state.data.list[i].main.pressure));
        wind.push(Math.round(this.state.data.list[i].wind.speed));
        weather.push(this.state.data.list[i].weather[0].description);
        icons.push(this.state.data.list[i].weather[0].icon)
      }

      this.setState({
        days: [currentDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [nowTemp, ...temps.slice(1)],
        minTemps: [nowMinTemp, ...minTemps.slice(1)],
        maxTemps: [nowMaxTemp, ...maxTemps.slice(1)],
        humidity: [nowHumidity, ...humidity.slice(1)],
        pressure: [nowPressure, ...pressure.slice(1)],
        wind: [nowWind, ...wind.slice(1)],
        weather: [nowWeather, ...weather.slice(1)],
        icons: [nowIcon, ...icons.slice(1)]
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=b97bb751313b5a72afe4f1be164184c5&units=metric";
    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const list = this.state.data.list;
    return list.find(e => new Date(e.dt_txt));
  };

  componentDidMount() {
    this.fetchData();
  }

  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      maxTemps,
      minTemps,
      humidity,
      pressure,
      wind,
      weather,
      icons,
      displayIndex
    } = this.state;

    return (
      <div className="main-div">
        <form onSubmit={this.changeLocation}>
          <div className="input1">
            <input
              className="input2"
              defaultValue={location}
              type="text"
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form>

        <div>

          <div>
            <div className="day">{daysFull[displayIndex]}</div>
           
            <div>
              <div><img width="150" height="150" src={'http://openweathermap.org/img/w/' + `${icons[displayIndex]}` + '.png'} alt="weater-icon" /></div>
              {temps[displayIndex]}°C
              </div>
            <div><strong>Description : </strong>{weather[displayIndex]}</div>
            <div><strong>Humidity : </strong>{humidity[displayIndex]}%</div>
            <div><strong>Pressure : </strong>{pressure[displayIndex]} hPa</div>
            <div><strong>Wind-Speed : </strong>{wind[displayIndex]} m/s</div>
            <div><strong> Max.Temp. : </strong>{maxTemps[displayIndex]}°C</div>
            <div><strong>Min.Temp. : </strong>{minTemps[displayIndex]}°C</div>
          </div>
        </div>
        <div>
            <div className="selection-row">
              {days.map((item, index) => {
                if (displayIndex === index) {
                  return (
                    <button
                      className="selected"
                      key={index + 1}
                      onClick={() => this.setIndex(index)}
                    >
                      {item}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={index + 1}
                      onClick={() => this.setIndex(index)}
                    >
                      {item}
                    </button>
                  );
                }
              })}
            </div>
          </div>
      </div>
    );
  }
}

export default App;