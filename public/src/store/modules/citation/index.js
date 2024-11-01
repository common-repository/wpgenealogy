import axios from "axios";
import qs from "qs";
const citation = {
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
            payload.action = 'citations_get';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => {});
            });
		},
        add: (context, payload) => {
            payload.action = 'citation_add';
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
            payload.action = 'citation_update';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    console.log(response)
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        delete: (context, payload) => {
            payload.action = 'citation_delete';
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
export default citation;