import React, { Component } from 'react';
import movimientoControl from '../logic/Movimiento';
import { Button } from 'reactstrap';

export default class TablaMovimiento extends Component {
    static displayName = TablaMovimiento.name;
    constructor(props) {
        super(props);
        this.state = {
            Lista: []
        }
        this.cargarDatos = () => {
            movimientoControl.listaMovimientos().then(response => {
                console.log(response.data);
                this.setState({ Lista: response.data });
            }).catch(error => {
                alert(error);
            });
        }
    }
    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        return (
            <div>
                <h2>Tabla Movimientos</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Tipo de movimiento</th>
                            <th scope="col">Cantidad de dolares</th>
                            <th scope="col">Precio unitario</th>
                            <th scope="col">Costo Total</th>
                            <th scope="col">Pago</th>
                            <th scope="col">Cambio</th>
                            <th scope="col">Fecha de registro</th>
                            <th scope="col">IdUsuario</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CrearRegistro Lista={this.state.Lista} />
                    </tbody>
                </table>
            </div>
        );
    }
}

// Componentes necesarios
const CrearRegistro = (props) => {
    return (
        props.Lista.map(movimiento => {
            return <tr key={movimiento.idMovimiento}>
                <td>{(movimiento.idTipoMovimiento == 1) ? 'Compra' : 'Venta'}</td>
                <td>{movimiento.cantDolares}</td>
                <td>{movimiento.pUnitario}</td>
                <td>{movimiento.costoTotal}</td>
                <td>{movimiento.pago}</td>
                <td>{movimiento.cambio}</td>
                <td>{movimiento.fecRegistro}</td>
                <td>{movimiento.idUsuario}</td>
                <td><Button className='bg-danger'>Borrar</Button><Button className='bg-primary'>Editar</Button></td>
            </tr>
        })
    )
}