import axios from "axios";
import qs from "qs";
const people = {
	namespaced: true,
	state: {
        data: {
            loaded: false,
            data:[]
        },

	},
	getters: {
        data: state => {
            return state.data
        },
        names: state => {
            return state.names
        },
	},
	mutations: { 
        set: (state, payload) => {
            state.data.data = payload;
            state.data.loaded = true;
        },
        add: (state, payload) => {
            state.data.data.push(payload);
        },
        names: (state, payload) => {
            state.names = payload;
        },
        name: (state, payload) => {
            state.names.push(payload);
        },
	},
	actions: { 
        get: (context, payload) => {
            payload.action = 'peoples_get';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => {
                    let errorObject = JSON.parse(JSON.stringify(error));
                });
            });
        },
        search: (context, payload) => {
            payload.action = 'peoples_search';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => {
                    let errorObject = JSON.parse(JSON.stringify(error));
                });
            });
        },
        add: (context, payload) => {
            payload.action = 'people_add';
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
            payload.action = 'people_update';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        delete: (context, payload) => {
            payload.action = 'people_delete';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        names: (context, payload) => {
            payload.action = 'peoples_name';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('names', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });

        },
        lock: (context, payload) => {
            payload.action = 'lock_ID';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    if(response.data.people){
                        context.commit('add', response.data.people);
                    }
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
	}
}
export default people;