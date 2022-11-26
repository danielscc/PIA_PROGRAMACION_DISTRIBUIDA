import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import controlUsuario from '../logic/Usuario';

export default class Login extends Component{
    static displayName = Login.name;
    constructor (props) {
        super(props);
        this.state = {
            Usuario : "",
            Contra : ""
        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        this.handleSubmit = (e) => {
            e.preventDefault()
            alert(Object.values(this.state))
        }
        this.loginUsuario = ()=>{
            controlUsuario.login(this.state).then(response => {
                console.log(response.data);
                localStorage.IdUsuario = response.data.IdUsuario;
                // localStorage.clear();
                window.location.href = "/panel/usuarios";
            }).catch(error => {
                console.log(error);
                alert("El usuario no existe");
            });
        }
    }
    render(){
        return(
            <div>
                <h2>Login</h2>
                <Form>
                <FormGroup>
                    <Label for="Usuario">
                    Nombre de usuario
                    </Label>
                    <Input
                    id="Usuario"
                    name="Usuario"
                    placeholder="juanitoP"
                    type="text"
                    value={this.state.Usuario}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Contra">
                    Contraseña
                    </Label>
                    <Input
                    id="Contra"
                    name="Contra"
                    placeholder="********"
                    type="password"
                    value={this.state.Contra}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <Button onClick={this.loginUsuario} className='bg-primary'>
                    Registrarse
                </Button>
                </Form>
                <div>{this.state.Usuario}</div>
                <div>{this.state.Contra}</div>
            </div>
        );
    }
}