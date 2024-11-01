import axios from "axios";
import qs from "qs";
const setting = {
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
            payload.action = 'settings_get';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => { });
            });
        },
        update: (context, payload) => {
            payload.action = 'setting_update';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    resolve(response)
                }).catch(error => { });
            });
        },
    }
}
export default setting;