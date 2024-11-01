import axios from "axios";
import qs from "qs";
const report = {
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
	actions: { 
		delete: (context, payload) => {
			payload.action = 'report_delete';
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
export default report;