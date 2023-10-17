import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../index-sections/index.scss';
import Hero from '../index-sections/Hero';

@inject('store')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {  }
    }
    render() { 
        return (
            <Hero login />
        );
    }
}
 
export default Login;