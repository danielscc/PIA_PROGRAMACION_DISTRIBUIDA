import React, { Component } from 'react';
import bitacoraControl from '../logic/Bitacora';
import { Button } from 'reactstrap';

export default class TablaBitacora extends Component{
    static displayName = TablaBitacora.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista: []
        }
        this.cargarDatos = () => {
            bitacoraControl.listaBitacoras().then(response => {
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

    render(){
        return(
            <div>
                <h2>Tabla bitacora</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Tipo Movimiento</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Fecha de registro</th>
                            <th scope="col">IdUsuario</th>
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
        props.Lista.map(bitacora => {
            return <tr key={bitacora.idBitacora}>
                <td>{(bitacora.idTipoMovimiento == 1) ? 'Compra' : 'Venta' }</td>
                <td>{bitacora.monto}</td>
                <td>{bitacora.fecRegistro}</td>
                <td>{bitacora.idUsuario}</td>
                <td><Button className='bg-danger'>Borrar</Button><Button className='bg-primary'>Editar</Button></td>
            </tr>
        })
    )
}