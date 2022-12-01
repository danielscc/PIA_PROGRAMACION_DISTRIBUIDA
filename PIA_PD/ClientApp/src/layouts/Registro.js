import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import controlUsuario from '../logic/Usuario';

function validarFormulario(objeto){
    let valores = Object.values(objeto);
    for(let value of valores){
        if(value.length < 3){
            return false;
        }
    }
    return true;
}

export default class Registro extends Component{
    static displayName = Registro.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idUsuario : 0,
                nombre : "",
                aPaterno : "",
                aMaterno : "",
                contra : "",
                usuario : "",
            }
        }
        this.handleSubmit = (e) => {
            e.preventDefault()
            alert(Object.values(this.state))
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} })
        }
        this.registrarUsuario = ()=>{
            let validacion = validarFormulario(this.state.Form);
            if(validacion == true){
                controlUsuario.registrarUsuario(this.state.Form).then(response=>{
                    console.log(response);
                    alert("Usuario registrado correctamente");
                    window.location.href = "/";
                }).catch(error => {
                    console.log(error);
                    alert("Error al registrar");
                })
            }else{
                alert("Rellene todos los datos correctamente");
            }
        }
        this.guardar = ()=>{
            this.registrarUsuario();
        }
    }
    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="nombre">Nombre&#40;s&#41;</Label>
                        <Input id="nombre" name="nombre" placeholder="Juan Pablo" type="text" required minLength="3"
                        value={this.state.Form.nombre} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aPaterno">Apellido Paterno</Label>
                        <Input id="aPaterno" name="aPaterno" placeholder="Juan Pablo" type="text" required minLength="3"
                        value={this.state.Form.aPaterno} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aMaterno">Apellido Materno</Label>
                        <Input id="aMaterno" name="aMaterno" placeholder="juanitoP" type="text" required minLength="3"
                        value={this.state.Form.aMaterno} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contra">Contraseña</Label>
                        <Input id="contra" name="contra" placeholder="********" type="password" required minLength="3"
                        value={this.state.Form.contra} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="usuario">Nombre de usuario</Label>
                        <Input id="usuario" name="usuario" placeholder="juanitoP" type="text" required minLength="3" pattern='[/^[a-z0-9_-]{3,16}$]'
                        value={this.state.Form.usuario} onChange={this.handleChange}/>
                    </FormGroup>
                    <div className='d-flex justify-content-center py-2'>
                        <Button onClick={this.guardar} className="btn btn-success">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}