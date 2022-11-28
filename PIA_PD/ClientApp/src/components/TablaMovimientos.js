import React, { Component } from 'react';
import movimientoControl from '../logic/Movimiento';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormUser from '../partials/FormMovimiento';
import controlMovimiento from '../logic/Movimiento';

export default class TablaMovimiento extends Component {
    static displayName = TablaMovimiento.name;
    constructor(props) {
        super(props);
        this.state = {
            Lista : [],
            modalCrear : false,
            modalEliminar : false,
            modalEditar : false,
            Form :{
                // idMovimiento : 0,
                idTipoMovimiento : 0,
                cantDolares : 0.00,
                pUnitario : 0.00,
                costoTotal : 0.00,
                pago : 0.00,
                cambio : 0.00,
                fecRegistro : "",
                idUsuario : 0,
                nombreCompleto : "",
            }
        }
        //peticion para cargar datos
        this.cargarDatos = () => {
            movimientoControl.listaMovimientos().then(response => {
                console.log(response.data);
                this.setState({ Lista: response.data });
            }).catch(error => {
                alert(error);
            });
        }

        // Funciones para abrir y cerrar modales
        this.abrirModalEditar = (movimiento)=>{
            this.setState({Form:movimiento});
            this.setState({modalEditar : (this.state.modalEditar === false)?true:false});
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear === false)?true:false});
        }
        this.abrirModalEliminar = (movimiento)=>{
            this.setState({Form:movimiento});
            this.setState({modalEliminar : (this.state.modalEliminar === false)?true:false});
        }

    }
    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.abrirModalCrear}>
                    Crear Movimiento
                </Button>
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
                            <th scope="col">Nombre de usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CrearRegistro Lista={this.state.Lista} editar={this.abrirModalCrear} />
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Editar Movimiento</ModalHeader>
                    <ModalBody>
                        <FormUser/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
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
                <td>{movimiento.nombreCompleto}</td>
            </tr>
        })
    )
}