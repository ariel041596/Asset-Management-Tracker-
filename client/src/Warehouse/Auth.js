import axios from 'axios';
import router from '../router';
import { stat } from 'fs';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};
const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }

    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};
const actions = {
    // Login action 
    async login({ commit }, user) {
        commit('auth_request');
        let res = await axios.post('http://localhost:5000/api/users/login', user)
        try {
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Set the token into the localstorage
                localStorage.setItem('token', token);
                // set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        }
        catch (err) {
            commit('auth_error', err);
        }
    },
    // Get the User's Profile
    async getProfile({ commit }) {
        commit('profile_request');
        let res = await axios.get('/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', userData);
            if (res.data.success != undefined) {
                commit('register_success');
            }
            return res;
        }
        catch (err) {
            commit('register_error', err)
        }
    },
    // Logout the User
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    }
};

const mutations = {
    auth_request(state) {
        state.status = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.status = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.status = 'loading'
        state.status = null
    },
    register_success(state) {
        state.status = 'success'
        state.status = null
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
        state.status = null
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};

