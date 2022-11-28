import React, { Component } from 'react';
import bitacoraControl from '../logic/Bitacora';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormBitacora from '../partials/FormBitacora';

export default class TablaBitacora extends Component{
    static displayName = TablaBitacora.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista: [],
            Form :{
                idBitacora : 0,
                idTipoMovimiento : 0,
                monto : 0
            },
            modalCrear : false,
            modalEditar : false,
        }
        this.cargarDatos = () => {
            bitacoraControl.listaBitacoras().then(response => {
                console.log(response.data);
                this.setState({ Lista: response.data });
            }).catch(error => {
                alert(error);
            });
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear == false)?true:false});
        }
        this.abrirModalEditar = (bitacora)=>{
            this.setState({Form:bitacora});
            this.setState({modalEditar : (this.state.modalEditar == false)?true:false});
        }
    }
    componentDidMount() {
        this.cargarDatos();
    }

    render(){
        return(
            <div>
                <h2>Tabla bitacora</h2>
                <Button color="primary" onClick={this.abrirModalCrear}>
                    Crear usuario
                </Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Tipo Movimiento</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Fecha de registro</th>
                            <th scope="col">IdUsuario</th>
                            <th scope="col">Nombre del usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CrearRegistro Lista={this.state.Lista} editar={this.abrirModalEditar}/>
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Agregar bitacora</ModalHeader>
                    <ModalBody>
                        <FormBitacora />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Editar bitacora</ModalHeader>
                    <ModalBody>
                        <FormBitacora objeto={this.state.Form}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModalEditar}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
// Componentes necesarios
class CrearRegistro extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            this.props.Lista.map(bitacora => {
                return <tr key={bitacora.idBitacora}>
                    <td>{(bitacora.idTipoMovimiento == 1) ? 'Compra' : 'Venta' }</td>
                    <td>{bitacora.monto}</td>
                    <td>{bitacora.fecRegistro}</td>
                    <td>{bitacora.idUsuario}</td>
                    <td>{bitacora.nombreCompleto}</td>
                    <td><Button onClick={()=>this.props.editar(bitacora)} className='bg-primary'>Editar</Button></td>
                </tr>
            })
        )
    }
}