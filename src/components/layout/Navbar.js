import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './layout.scss';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;

        this.state = { 
            invertColor: false
         }
    }

    componentDidMount() {
        window.addEventListener('scroll', (e) => {
            if (window.scrollY > 0) {
                this.setState({
                    invertColor: true
                })
            } else {
                this.setState({
                    invertColor: false
                })
            }
        })
    }

    render() { 
        return (
            <div className={`navbar ${this.state.invertColor ? 'inverted' : ''}`} id="nav">
                <div className="nav-con">
                    <div>
                        <Link className="brand" to={`/`}>
                            <img className="logo" src="/logo.png" alt="collar" />
                            Collar
                        </Link>
                    </div>

                    <div>
                        {this.store.currentUser ? (
                            <>
                                <Link to="/account">Account</Link>
                                <button onClick={() => this.store.logOut()}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/">Sign up</Link>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Navbar;