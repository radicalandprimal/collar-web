import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import './index.scss';

@inject('store')
@observer
class Hero extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = { 
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordsConfirmed: false,
            error: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkPasswordMatch = (isLogin) => {

        if (isLogin) {
            this.store.login({email: this.state.email, password: this.state.password}, this.props.history);
        } else {
            if (!this.state.password || !this.state.confirmPassword || !this.state.email) {
                return this.setState({
                    error: 'Please fill out all fields.'
                })
            }
    
    
            if (this.state.password === this.state.confirmPassword) {
                this.setState({
                    passwordsConfirmed: true,
                    error: ''
                })
            } else {
                this.setState({
                    error: `Passwords don't match`
                })
            }    
        }

    }

    signUp = () => {
        if (this.state.name) {
            this.store.signUp({name: this.state.name, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword}, this.props.history);
            this.setState({
                error: ''
            })
        } else {
            this.setState({
                error: 'Please pick a display name.'
            })
        }
    }

    render() { 
        return (
            <div className="hero">
                <div className="hero-con">
                    <h1>Play Minecraft <span>Better</span>.</h1>
                    <p>Super charge the way you play Minecraft with secure chat, live coordinate sharing, factions, animated dances, and more!</p>

                    <div className="flex-row">
                        <Link className="cta secondary-white" to="/sign-up">Learn How</Link>
                        <Link className="cta secondary-white" to="/sign-up">Download Client</Link>
                    </div>
                </div>

                <div className={`hero-con signup ${this.props.login ? 'auth-shrink' : 'auth-grow'}`}>
                    {this.store.currentUser ? (
                        <>
                            <p className="sign-up-txt">You're logged in!</p>
                            <button onClick={() => this.props.history.push('/account')} className="cta">Go to account</button>
                            <button onClick={this.store.logOut} className="cta">Logout</button>
                        </>
                    ) : (
                        <>
                        {!this.state.passwordsConfirmed && !this.props.login ? (
                            <div>
                                <p className="sign-up-txt">Sign up for free!</p>
                                <p>Create your free Collar account by signing up below.</p>
                                <label>Email:</label>
                                <input value={this.state.email} onChange={this.handleChange} name="email" placeholder="notch@minecraft.net" />
                                <label>Password:</label>
                                <input value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" type="password" />
                                <label>Confirm password:</label>
                                <input value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword" placeholder="confirm password" type="password" />
                                <button onClick={() => this.checkPasswordMatch(false)} className="cta">Sign up!</button>
    
                            </div>
                        ) : (
                            !this.props.login && (
                                <div className="full-width">
                                    <p className="sign-up-txt">One more thing!</p>
                                    <label>Pick a display name</label>
                                    <input value={this.state.name} onChange={this.handleChange} name="name" placeholder="Clientguy123" />
    
                                    <div className="row">
                                        <button className="cta half red" onClick={() => this.setState({passwordsConfirmed: false})}>Back</button>
                                        <button className="cta half no-marg" onClick={this.signUp}>Confirm!</button>
                                    </div>
                                </div>
                            )
                        )}
    
                        {this.props.login && (
                            <div>
                                <p className="sign-up-txt">Log in to Collar</p>
                                <label>Email:</label>
                                <input value={this.state.email} onChange={this.handleChange} name="email" placeholder="notch@minecraft.net" />
                                <label>Password:</label>
                                <input value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" type="password" />
                                <button onClick={() => this.checkPasswordMatch(true)} className="cta">Log in!</button>
                            </div>                    
                        )}
    
                        {this.state.error && <p onClick={() => this.setState({error: ''})} className="error-msg">{this.state.error}</p>}
                        </>
                    )}

                </div>

            </div>
        );
    }
}
 
export default withRouter(Hero);