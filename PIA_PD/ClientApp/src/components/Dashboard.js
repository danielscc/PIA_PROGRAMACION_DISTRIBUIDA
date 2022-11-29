import React, { Component } from 'react';
import { PieCV } from '../Charts/PieCV';
import { LineB } from '../Charts/LineB';
import { Line } from 'react-chartjs-2';

export default class Dashboard extends Component{
    static displayName = Dashboard.name;
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render(){
        return(
            <div>
                <h2>Dashboard</h2>
                <div className="container d-flex justify-content-center flex-column">
                    <div className="row">
                        <LineB />
                    </div>
                    <div className="row">
                        <div className="col">
                        1 of 2
                        </div>
                        <div className="col">
                        2 of 2
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}