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
            if(this.state.Usuario.length <= 3 || this.state.Contra.length == 0){
                alert("Caracteres insuficientes");
            }else{
                controlUsuario.login(this.state).then(response => {
                    console.log(response.data)
                    if(response.data.IdUsuario != 0 ){
                        if(response.data.IsActivo == 1){
                            localStorage.IdUsuario = response.data.IdUsuario;
                            // localStorage.clear();
                            window.location.href = "/panel/usuarios";
                        }else{
                            alert("Cuenta suspendida");
                        }
                    }else{
                        alert("El usuario no existe");
                    }
                }).catch(error => {
                    console.log(error);
                    alert("Error al registrar");
                });
            }
        }
    }
    render(){
        return(
                <div>
                    <section class="vh-100">
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card shadow-2-strong">
                            <div class="card-body p-5 text-center">
                                <h3 class="mb-5">Log in</h3>
                                <Form>
                                    <FormGroup>
                                        <Input
                                        id="Usuario"
                                        name="Usuario"
                                        placeholder="nombreusuario2131"
                                        className="form-control form-control-lg mb-2"
                                        type="text"
                                        value={this.state.Usuario}
                                        onChange={this.handleChange}
                                        required
                                        />
                                        <Label for="Usuario" className="form-label">
                                        Nombre de usuario
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                        id="Contra"
                                        name="Contra"
                                        placeholder="********"
                                        className="form-control form-control-lg mb-2"
                                        type="password"
                                        value={this.state.Contra}
                                        onChange={this.handleChange}
                                        required
                                        />
                                        <Label for="Contra" className="form-label">
                                        Contraseña
                                        </Label>
                                    </FormGroup>
                                    <Button onClick={this.loginUsuario}  className="btn btn-primary btn-lg btn-block">
                                        Ingresar
                                    </Button>
                                    </Form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
        );
    }
}