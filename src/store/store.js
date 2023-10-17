// import { action, observable, computed } from 'mobx'
import { observable, action } from 'mobx'
import axios from 'axios';

axios.defaults.baseURL = (process.env.REACT_APP_COLLAR_API_URL || `http://localhost:4000`)

class Store {

    @observable token = '';

    @observable currentUser = '';


    @action checkForSession = () => {
        let token = localStorage.getItem('token');

        if (token) {
            this.token = token;
            this.getCurrentUser();
        }
    }

    @action signUp = (body, history) => {

        axios.post('/api/1/auth/create', body).then((data) => {
            this.token = data.data.token;
            localStorage.setItem('token', data.data.token);
            console.log(data.data.token)
            this.getCurrentUser();
            history.push('/account');
        })
    }

    @action login = (body, history) => {

        axios.post('/api/1/auth/login', body).then((data) => {
            this.token = data.data.token;
            localStorage.setItem('token', data.data.token);
            console.log(data.data.token)
            this.getCurrentUser();
            history.push('/account');
        })
    }

    getCurrentUser = () => {
        axios.get('/api/1/profile/me', {
            headers: {
                withCredentials: true,
                authorization:  `Bearer ${this.token}`
            }
        }).then((res) => {
            console.log('profile', res.data);
            this.currentUser = res.data;
        })
    }

    @action logOut = () => {
        this.token = '';
        window.localStorage.removeItem('token');
        window.location.href = '/';
    }

}

const store = new Store();

export default store
