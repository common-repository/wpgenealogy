import axios from "axios";
import qs from "qs";
const note = {
	namespaced: true,
    state: {
        data: {
            loaded: false,
            data:[]
        }
    },
    getters: {
        data: state => {
            return state.data
        },
    },
    mutations: {
        set: (state, payload) => {
            state.data.data = payload;
            state.data.loaded = true;
        },
        add: (state, payload) => {
            state.data.data.push(payload);
        }
    },
	actions: { 
		get: (context, payload) => {
            payload.action = 'notes_get';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => { });
            });
		},
        add: (context, payload) => {
            payload.action = 'note_add';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        update: (context, payload) => {
            payload.action = 'note_update';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

	}
}
export default note;

