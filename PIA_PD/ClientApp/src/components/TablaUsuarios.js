import React, { Component } from 'react';
import usuarioControl from '../logic/Usuario';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormUser from '../partials/FormUser';
import controlUsuario from '../logic/Usuario';

export default class TablaUsuarios extends Component{
    static displayName = TablaUsuarios.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista : [],
            modalCrear : false,
            modalEliminar : false,
            modalEditar : false,
            Form :{
                idUsuario : 0,
                nombre : "",
                aPaterno : "",
                aMaterno : "",
                contra : "",
                usuario : "",
            }
        }
        // Peticion para cargar los datos
        this.cargarDatos = ()=>{
            usuarioControl.listaUsuarios().then(response=>{
                console.log(response.data);
                this.setState({Lista:response.data});
            }).catch(error=>{
                alert(error);
            });
        }
        // Funciones para abrir y cerrar modales
        this.abrirModalEditar = (usuario)=>{
            this.setState({Form:usuario});
            this.setState({modalEditar : (this.state.modalEditar == false)?true:false});
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear == false)?true:false});
        }
        this.abrirModalEliminar = (usuario)=>{
            this.setState({Form:usuario});
            this.setState({modalEliminar : (this.state.modalEliminar == false)?true:false});
        }
        // Funcion para dar de baja
        this.bajaUsuario = ()=>{
            controlUsuario.bajaUsuario(this.state.Form).then(response=>{
                console.log(response);
                alert("Usuario dado de baja correctamente");
            }).catch(error => {
                console.log(error);
                alert("Error al dar de baja");
            })
        }
    }
    // Cargar funciones al renderizar
    componentDidMount() {
        this.cargarDatos();
    }
    render(){
        return(
            <div>
                <Button color="primary" onClick={this.abrirModalCrear}>
                    Crear usuario
                </Button>
                <h2>Tabla usuarios</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CrearRegistro Lista={this.state.Lista} borrar={this.abrirModalEliminar} editar={this.abrirModalEditar}/>
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Editar usuario</ModalHeader>
                    <ModalBody>
                        <FormUser/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Editar usuario</ModalHeader>
                    <ModalBody>
                        <FormUser objeto={this.state.Form}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModalEditar}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader>Eliminar</ModalHeader>
                    <ModalBody>
                        <h2>Seguro que quiere borrar?</h2>
                        <p>{this.state.Form.nombre}</p>
                        <p>{this.state.Form.idUsuario}</p>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={this.bajaUsuario} color="danger">
                        Borrar
                    </Button>{' '}
                    <Button color="secondary" onClick={this.abrirModalEliminar}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
// Componentes para dibujar registros
class CrearRegistro extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            this.props.Lista.map(usuario => {
                return <tr key={usuario.idUsuario}>
                            <th scope="row">{usuario.nombre}</th>
                            <td>{usuario.aPaterno + " " + usuario.aMaterno}</td>
                            <td>{usuario.contra}</td>
                            <td>{usuario.usuario}</td>
                            <td>{(usuario.isActivo==true)?"Activo":"Inactivo"}</td>
                            <td><Button onClick={()=>this.props.borrar(usuario)} className='bg-danger'>Borrar</Button><Button onClick={()=>this.props.editar(usuario)} className='bg-primary'>Editar</Button></td>
                        </tr>
                        })
        )
    }
}