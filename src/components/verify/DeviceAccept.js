import React, { Component } from 'react';
import {
    withRouter
  } from "react-router-dom";

import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class DeviceAccept extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        const url = window.location.href.split('/');
        this.id = url[url.length - 1]

        this.state = { 
            deviceName: ''
        }
    }

    componentDidMount() {
        // this.verify();
    }

    verify = () => {
        axios.post('/api/1/profile/devices/trust', {token: this.id, deviceName: this.state.deviceName}, {headers: {
            withCredentials: true,
            authorization:  `Bearer ${this.store.token}`
        }}).then((res) => {
            this.store.getCurrentUser();
            this.props.history.push('/account');
        })
    }

    login = () => {
        this.props.history.push('/login');
    }

    signUp = () => {
        this.props.history.push('/');
    }

    render() { 
        const currentUser = this.store.currentUser;

        return (
            <div>
                <div className="nav-space"></div>
                <div style={{width: '600px', paddingTop: '24px', paddingLeft: '48px'}}>
                    <h1>This is a new device!</h1>

                    {currentUser ? (
                        <>
                            <h2>What would you like to call it?</h2>
                            <input
                                placeholder="Computer 1"
                                style={{height: '40px', width: '100%', marginTop: '24px', fontSize: '24px'}}
                                value={this.state.deviceName} 
                                onChange={(e) => this.setState({deviceName: e.target.value})} 
                            />
                            <br />
                            <br />
                            <button onClick={this.verify} className="cta cursor">Submit</button>
                        </>
                    ) : (
                        <>
                            <h2 style={{marginTop: '12px'}}>Please login or create an account to register it.</h2>

                            <div style={{marginTop: '24px'}} className="flex-row">
                                <button style={{marginRight: '24px'}} onClick={this.login} className="cta cursor">Login</button>
                                <button onClick={this.signUp} className="cta cursor">Sign up</button>
                            </div>

                            <p style={{marginTop: '24px'}}>Once you've signed in, you may need to go back to your minecraft instance to register this device.</p>
                        </>
                    )}

                </div>
            </div>
        );
    }
}
 
export default withRouter(DeviceAccept);