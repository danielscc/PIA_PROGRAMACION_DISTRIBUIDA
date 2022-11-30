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
                <div className="bg-primary bg-gradient">
                    <section className="vh-100">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong">
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Ingresar al sistema</h3>
                                <Form>
                                    <FormGroup>
                                        <div className='input-group mb-2'>
                                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-fill"></i></span>
                                            <Input
                                            id="Usuario"
                                            name="Usuario"
                                            placeholder="username"
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={this.state.Usuario}
                                            onChange={this.handleChange}
                                            required
                                            />
                                        </div>
                                        <Label for="Usuario" className="form-label">
                                        Nombre de usuario
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <div class="input-group mb-2">
                                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-exclamation-circle-fill"></i></span>
                                            <Input
                                            id="Contra"
                                            name="Contra"
                                            placeholder="********"
                                            className="form-control form-control-lg"
                                            type="password"
                                            value={this.state.Contra}
                                            onChange={this.handleChange}
                                            required
                                            />
                                        </div>
                                        <Label for="Contra" className="form-label">
                                        Contraseña
                                        </Label>
                                    </FormGroup>
                                    <Button onClick={this.loginUsuario}  className="btn btn-success btn-lg btn-block">
                                        Ingresar <i class="bi bi-box-arrow-in-right"></i>
                                    </Button>
                                    <Button className="btn btn-primary btn-lg btn-block ms-3">
                                        Registrar <i class="bi bi-pencil-square"></i>
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