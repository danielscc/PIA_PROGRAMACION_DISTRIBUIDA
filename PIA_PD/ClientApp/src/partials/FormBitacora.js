import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import controlBitacora from '../logic/Bitacora';

export default class FormBitacora extends Component{
    static displayName = FormBitacora.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idBitacora : 0,
                idTipoMovimiento : 1,
                monto : 0
            }
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} })
        }
        this.agregarBitacora = ()=>{
            controlBitacora.agregarBitacora(this.state.Form).then(response=>{
                console.log(response);
                alert("Agregado a bitacora correctamente");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                alert("Error al agregar");
            })
        }
        this.modificarBitacora = ()=>{
            controlBitacora.modificarBitacora(this.state.Form).then(response=>{
                console.log(response);
                alert("Bitacora actualizada correctamente");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                alert("Error al registrar");
            })
        }
        this.guardar = ()=>{
            console.log(this.state.Form);
            console.log(this.state.Form.idTipoMovimiento);
            if(this.state.Form.idBitacora == 0){
                this.agregarBitacora();
            }else{
                console.log("Si entro");
                this.modificarBitacora();
            }
        }
    }
    componentDidMount() {
        console.log(this.props.objeto);
        (this.props.objeto != undefined)?this.setState({Form:this.props.objeto}):this.setState({Form:this.state.Form});
        const tipoMovimiento = document.getElementById("idTipoMovimiento");
        (this.props.objeto != undefined)?tipoMovimiento.disabled = true:tipoMovimiento.disabled = false;
    }
    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="idTipoMovimiento">Tipo de movimiento</Label>
                        <Input type="select" name="idTipoMovimiento" id="idTipoMovimiento" value={this.state.Form.idTipoMovimiento} onChange={this.handleChange}>
                            <option value={Number(1)}>Compra</option>
                            <option value={Number(2)}>Venta</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="monto">Monto</Label>
                        <Input id="monto" name="monto" placeholder="23.51" type="number"
                        value={this.state.Form.monto} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button onClick={this.guardar} className='bg-primary'>
                        Guardar
                    </Button>
                </Form>
            </div>
        );
    }
}