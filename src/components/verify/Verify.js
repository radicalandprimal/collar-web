import React, { Component } from 'react';
import {
    withRouter
  } from "react-router-dom";

import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Verify extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        const url = window.location.href.split('/');
        this.id = url[url.length - 1]

        this.state = {  }
    }

    componentDidMount() {
        this.verify();
    }

    verify = () => {
        axios.post(`/api/1/auth/verify`, {token: this.id}).then((res) => {
            this.store.getCurrentUser();
            this.props.history.push('/account');
        })
    }

    render() { 
        return (
            <div>
                <div className="nav-space"></div>
                <p>Verification in progress.</p>

                <p>You should be redirected from this page in a few seconds.</p>
            </div>
        );
    }
}
 
export default withRouter(Verify);