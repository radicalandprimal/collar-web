import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

@inject('store')
@observer
class Account extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        this.state = {  }
    }
    render() { 
        const currentUser = this.store.currentUser;
        return (
            <>
                <div className="nav-space"></div>

                <div className="account-page">
                    {!currentUser.emailVerified && <div>Please verify your email! Sent to {currentUser.email}.</div>}
                    <h1>Welcome to Collar, {currentUser.name}.</h1>
                    <h2>Collar? Barely know her.</h2>
                </div>
            </>
        );
    }
}
 
export default Account;