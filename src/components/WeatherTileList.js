import React from 'react'
import { Col, Row } from 'react-bootstrap'
import WeatherDetail from './WeatherDetails'

const WeatherTileList = ({weathers}) => {
    return (
        <Row>
           {weathers.map(({dt,main, weather}) => (
                <Col key={dt}>
                    <WeatherDetail temp_max={main.temp_max} temp_min={main.temp_min} dt={dt * 1000} main={weather[0].main} icon={weather[0].icon}/>
                </Col>
            ))} 
        </Row>
    )
}

export default WeatherTileList;
