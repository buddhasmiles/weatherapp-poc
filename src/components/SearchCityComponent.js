import React, { Component } from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import { ForecastApiService } from "../services/ForeCast";
import WeatherTileList from "./WeatherTileList";
import { GeoLocationApiService } from "../services/GeoLocation";

class SearchCityComponent extends Component {
  constructor(props) {
    super(props);


    this.state = {
      city: null,
      responseData: null,
      currentCity: null,
      currentLocationTemp: null,
      responseError: null,
    };

    this.onSearch = this.onSearch.bind(this);
      this.loadFavLocationWeather = this.loadFavLocationWeather.bind(this);

  }

  componentDidMount() {
    this.loadGeoLocation();
  }

 

  getCurrentLocationTemp() {
    var currentLocation = this.state.currentCity;
    if (currentLocation !== "") {
      new ForecastApiService()
        .getCurrentLocationForecast(currentLocation)
        .then((response) => {
          let temp = response.data.main.temp;
          this.setState({ currentLocationTemp: temp });
        })
        .catch((reason) => {
          console.error(reason);
          this.setState({
            responseError: "Error in calling api"
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });

    }
  }

 

   searchWeather( city)
   {
    new ForecastApiService().getForecast(city).then((response) => {
      this.setState({ responseData: response.data ,responseError:null});
    })
    .catch((reason) => {
      console.error(reason);
    if(reason.request.status === 404)
    {
      this.setState({
        responseError: `No details on ${city} available` 
      });
    }

     
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
   }

  onSearch(e) {
    var cty = this.state.city;
    this.searchWeather(cty)
  }

  loadFavLocationWeather(name) {
    this.setState({ city: name });
    this.searchWeather(name)
  }


  loadGeoLocation() {
    new GeoLocationApiService()
      .getCurrentLocation()
      .then((response) => {
        this.setState({
          currentCity: response.data.city,
          responseError:null
        });

        this.getCurrentLocationTemp();
      })
      .catch((reason) => {
        console.error(reason);
        this.setState({
          responseError: "Error in calling api"
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <>
        <Row></Row>
        <Row>
          <Col>
            <h3>
              Current weather in{" "}
              {this.state.currentCity !== null ? this.state.currentCity : null}
            </h3>{" "}
            is{" "}
            {this.state.currentLocationTemp !== null
              ? this.state.currentLocationTemp
              : null}
          </Col>
        </Row>
       

        <Row>
          <Col xs={4} className="text-center">
            <FormControl
              value={this.state.city}
              placeholder="Search Forecast by city"
              onChange={(e) => this.setState({ city: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="btn btn-link" onClick={() => this.loadFavLocationWeather('pune')}>Pune</button>
            <button className="btn btn-link" onClick={() => this.loadFavLocationWeather('delhi')}>Delhi</button>
            <button className="btn btn-link" onClick={() => this.loadFavLocationWeather('chennai')}>chennai</button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.onSearch}>Check Forecast</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.responseError !== null ? (
          this.state.responseError
        ) : null}
          </Col>
        </Row>
        {this.state.responseData !== null ? (
          <WeatherTileList weathers={this.state.responseData.list} />
        ) : null}
      </>
    );
  }
}
export default SearchCityComponent;
