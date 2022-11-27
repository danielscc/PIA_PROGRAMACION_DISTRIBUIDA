import React, { Component } from 'react';
import usuarioControl from '../logic/Usuario';
import { Button } from 'reactstrap';

export default class TablaUsuarios extends Component{
    static displayName = TablaUsuarios.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista : []
        }
        this.cargarDatos = ()=>{
            usuarioControl.listaUsuarios().then(response=>{
                console.log(response.data);
                this.setState({Lista:response.data});
            }).catch(error=>{
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
                <h2>Tabla usuarios</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CrearRegistro Lista={this.state.Lista}/>
                    </tbody>
                </table>
            </div>
        );
    }
}
// Componentes necesarios
const CrearRegistro = (props)=>{
    return(
        props.Lista.map(usuario => {
            return <tr key={usuario.idUsuario}>
                        <th scope="row">{usuario.nombre}</th>
                        <td>{usuario.aPaterno + " " + usuario.aMaterno}</td>
                        <td>{usuario.contra}</td>
                        <td>{usuario.usuario}</td>
                        <td><Button className='bg-danger'>Borrar</Button><Button className='bg-primary'>Editar</Button></td>
                    </tr>
        })
    )
}