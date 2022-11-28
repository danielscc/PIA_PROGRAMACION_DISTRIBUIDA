import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import controlMovimiento from '../logic/Movimiento';

export default class FormUser extends Component{
    static displayName = FormUser.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idMovimiento : 0,
                idTipoMovimiento : 0,
                cantDolares : "",
                pUnitario : "",
                costoTotal : "",
                pago : "",
                cambio : "",
                fecRegistro : "",
                idUsuario : "",
            }
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} })
        }
        this.registrarMovimiento = ()=>{
            controlMovimiento.registrarMovimiento(this.state.Form).then(response=>{
                console.log(response);
                alert("Usuario registrado correctamente");
            }).catch(error => {
                console.log(error);
                alert("Error al registrar");
            })
        }
        this.guardar = ()=>{
            this.registrarUsuario();
        }
    }
    componentDidMount() {
        console.log(this.props.objeto);
        (this.props.objeto !== undefined)?this.setState({Form:this.props.objeto}):this.setState({Form:this.state.Form});
    }
    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                    <Label for="exampleSelect">Tipo de movimiento</Label>
                    <Input id="tipoMovimiento" name="tipoMovimiento" type="select" value={this.state.Form.tipoMovimiento} onChange={this.handleChange}>
                        <option>Compra</option>
                        <option>Venta</option>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cantDolares">Cantidad de dolares</Label>
                        <Input id="cantDolares" name="cantDolares" placeholder="30" type="number"
                        value={this.state.Form.cantDolares} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pUnitario">Precio Unitario</Label>
                        <Input id="pUnitario" name="pUnitario" placeholder="" type="number"
                        value={this.state.Form.pUnitario} onChange={this.handleChange} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="costoTotal">Costo Total</Label>
                        <Input id="costoTotal" name="costoTotal" placeholder="" type="number"
                        value={this.state.Form.costoTotal} onChange={this.handleChange} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pago">Pago</Label>
                        <Input id="pago" name="pago" placeholder="3600" type="number"
                        value={this.state.Form.pago} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cambio">Cambio</Label>
                        <Input id="cambio" name="cambio" placeholder="" type="number"
                        value={this.state.Form.cambio} onChange={this.handleChange} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="idUsuario">Usuario</Label>
                        <Input id="idUsuario" name="idUsuario" placeholder="" type="number"
                        value={this.state.Form.idUsuario} onChange={this.handleChange} disabled/>
                    </FormGroup>
                    <Button onClick={this.guardar} className='bg-primary'>
                        Guardar
                    </Button>
                </Form>
            </div>
        );
    }
}