import axios from "axios";
import qs from "qs";
const address = {
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

    },
	actions: { 
		get: (context, payload) => {
            payload.action = 'addresses_get';
            payload.security = wpGenealogy.nonce;
            return new Promise((resolve, reject) => {
                axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
                    context.commit('set', response.data);
                }).catch(error => {});
            });
		}
	}
}
export default address;