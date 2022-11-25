import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class Login extends Component{
    static displayName = Login.name;
    constructor (props) {
        super(props);
    }
    render(){
        return(
            <div>
                <h2>Aqui va el login</h2>
                <Form>
                <FormGroup>
                    <Label for="email">
                    Email
                    </Label>
                    <Input
                    id="email"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                    Password
                    </Label>
                    <Input
                    id="password"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                    />
                </FormGroup>
                <Button className='bg-primary'>
                    Registrarse
                </Button>
                </Form>
            </div>
        );
    }
}