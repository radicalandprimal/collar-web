import React, { Component } from 'react';
import {
    withRouter
  } from "react-router-dom";

import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = { noSelected: false }

        this.store = props.store;
    }


    reset = (ACTION) => {
        if (ACTION === 'YES') {
            if (this.store.currentUser) {
                axios.post(`/api/1/profile/reset`, {token: this.id}).then((res) => {
                    this.store.getCurrentUser();
                    this.props.history.push('/account');
                })    
            } else {
                alert('You need to be logged in to do this action');
            }
        } else {
            this.setState({
                noSelected: !this.state.noSelected
            });
        }
    }

    render() { 
        return (
            <div>
                <div className="nav-space"></div>
                <div style={{width: '600px', paddingTop: '24px', paddingLeft: '48px'}}>

                <h2 style={{marginBottom: '24px'}}>To login to collar you need to reset your Collar private data.</h2>

                {this.state.noSelected ? (
                    <div style={{marginTop: '24px'}}>
                        <p style={{marginBottom: '24px'}}>You can't login to Collar until you replace your identity file or reset your identity.</p>
                        <button onClick={() => this.reset('No')} className="cta cursor">Back</button>

                        
                    </div>
                ) : (
                    <div className="flex-row">
                        <button style={{marginRight: '24px'}} onClick={() => this.reset('YES')} className="cta cursor">Yes</button>
                        <button onClick={() => this.reset('NO')} className="cta cursor">No</button>
                    </div>
                )}

                </div>
            </div>
        );
    }
}
 
export default withRouter(Reset);