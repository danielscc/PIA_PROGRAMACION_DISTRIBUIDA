import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import controlMovimiento from '../logic/Movimiento';
import bitacoraControl from '../logic/Bitacora';

export default class FormUser extends Component{
    static displayName = FormUser.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idMovimiento : 0,
                idTipoMovimiento : 1,
                cantDolares : 0,
                pUnitario : 0,
                costoTotal : 0,
                pago : 0,
                cambio : 0,
                fecRegistro : "",
            },
            montoCompra: 0,
            montoVenta: 0,
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} });
        }
        // peticiones necesarias
        this.cargarDatos = () => {
            bitacoraControl.listaBitacoras().then(response => {
                let lista = [...response.data];
                lista.forEach(element => {
                    return element.fecRegistro = new Date(element.fecRegistro).toLocaleDateString();
                });
                const tiempo = Date.now();
                const HOY = new Date(tiempo).toLocaleDateString();
                for(let item of lista){
                    if(item.fecRegistro === HOY){
                        if(item.idTipoMovimiento == 1){
                            this.setState({montoCompra : item.monto});
                            console.log(item.monto);
                        }else if(item.idTipoMovimiento === 2){
                            this.setState({montoVenta : item.monto})
                            console.log(item.monto);
                        }
                    }
                }
                // Ordenar de forma descendente
                // lista.sort((a, b)=>{
                //         return b.fecRegistro - a.fecRegistro;
                //     })
                    }).catch(error => {
                alert(error);
            });
        }
        this.registrarMovimiento = ()=>{
            if (this.state.Form.pUnitario == 0) {
                alert("Intente más tarde");
            }else{
                controlMovimiento.registrarMovimiento(this.state.Form).then(response=>{
                    console.log(response);
                    alert("Usuario registrado correctamente");
                    window.location.reload()
                }).catch(error => {
                    console.log(error);
                    alert("Error al registrar");
                })
            }
        }
        // Precalcular los valores
        this.calcularValores = ()=>{
            let tipoMovimiento = this.state.Form.idTipoMovimiento;
            if(tipoMovimiento == 1){
                let precio_unitario = this.state.montoCompra;
                let precio_total = precio_unitario * this.state.Form.cantDolares;
                let cambio = this.state.Form.pago - precio_total;
                this.setState({Form:{...this.state.Form,pUnitario:precio_unitario,costoTotal:precio_total,cambio:cambio}});
            }else if(tipoMovimiento == 2){
                let precio_unitario = this.state.montoVenta;
                let precio_total = precio_unitario * this.state.Form.cantDolares;
                let cambio = this.state.Form.pago - precio_total;
                this.setState({Form:{...this.state.Form,pUnitario:precio_unitario,costoTotal:precio_total,cambio:cambio}});
            }
            console.log(this.state.Form);
        }
    }
    componentDidMount() {
        this.cargarDatos();
    }
    render(){
        return(
            <div>
                <Form>
                    <p>{this.state.montoCompra}</p>
                    <p>{this.state.montoVenta}</p>
                    <FormGroup>
                    <Label for="idTipoMovimiento">Tipo de movimiento</Label>
                    <Input id="idTipoMovimiento" name="idTipoMovimiento" type="select" value={this.state.Form.idTipoMovimiento} onChange={this.handleChange}>
                        <option value={1}>Compra</option>
                        <option value={2}>Venta</option>
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
                    <Button onClick={this.calcularValores} className='bg-success'>
                        Calcular
                    </Button>
                    <Button onClick={this.registrarMovimiento} className='bg-primary'>
                        Guardar
                    </Button>
                </Form>
            </div>
        );
    }
}