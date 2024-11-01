import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

import event from "./modules/event";
import family from "./modules/family";
import address from "./modules/address";
import branch from "./modules/branch";
import chart from "./modules/chart";
import people from "./modules/people";
import place from "./modules/place";
import tree from "./modules/tree";
import children from "./modules/children";
import event_type from "./modules/event_type";
import citation from "./modules/citation";
import note from "./modules/note";
import note_link from "./modules/note_link";
import source from "./modules/source";
import setting from "./modules/setting";
import user from "./modules/user";
import association from "./modules/association";
import temp_event from "./modules/temp_event";
import timeline from "./modules/timeline";
import report from "./modules/report";
import todo from "./modules/todo";

Vue.use(Vuex);

const store = new Vuex.Store({
	root: true,
	modules: {
		event: event,
		family: family,
		address: address,
		branch: branch,
		chart: chart,
		people: people,
		place: place,
		tree: tree,
		children: children,
		event_type: event_type,
		citation: citation,
		note: note,
		note_link: note_link,
		source: source,
		setting: setting,
		user: user,
		association: association,
		temp_event: temp_event,
		timeline: timeline,
		report: report,
		todo: todo,
	},
	getters: {
	},
	mutations: {
	},
	actions: {
		import_ged: (context, payload) => {
			let formData = new FormData();
			formData.append('action', 'import_ged');
			formData.append('security', wpGenealogy.nonce);
			formData.append('file', payload.file);
			formData.append('gedcom', payload.gedcom);
			formData.append('branch', payload.branch);
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(response => {
					resolve(response);
					
				}).catch(error => {
					resolve(error);
					
				});
			});
		},
		lock: (context, payload) => {
			payload.action = 'lock';
			payload.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(payload)).then(response => {
					if(response.data.people){
						context.commit('people/add', response.data.people);
					}
					if(response.data.family){
						context.commit('family/add', response.data.family);
					}
					resolve(response);
				}).catch(error => {});
			});
		},
		check: (context, payload) => {
			var data = payload;
			data.action = 'check';
			data.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
					resolve(response);
				}).catch(error => { });
			});
		},
		generate: (context, payload) => {
			var data = payload;
			data.action = 'generate';
			data.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
					resolve(response);
				}).catch(error => { });
			});
		},
		get_people_by_id: (context, payload) => {
			var data = payload;
			data.action = 'get_people_by_id';
			data.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
					resolve(response);
				}).catch(error => { });
			});
		},
		get_family_by_id: (context, payload) => {
			var data = payload;
			data.action = 'get_family_by_id';
			data.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
					resolve(response);
				}).catch(error => { });
			});
		},
		get_children_by_id: (context, payload) => {
			var data = payload;
			data.action = 'get_children_by_id';
			data.security = wpGenealogy.nonce;
			return new Promise((resolve, reject) => {
				axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
					resolve(response);
				}).catch(error => { });
			});
		},
	}
});
export default store;