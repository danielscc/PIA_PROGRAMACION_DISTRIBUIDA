import React, { Component } from 'react';

export default class TablaUsuarios extends Component{
    static displayName = TablaUsuarios.name;
    constructor (props) {
        super(props);
    }
    render(){
        return(
            <div>
                <h2>Tabla usuarios</h2>
            </div>
        );
    }
}