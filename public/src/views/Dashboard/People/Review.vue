<template>
	<div>
		<h3 class="top-breadcrumb"><strong>People</strong><small> Reviews </small> </h3>
		<br>
		<div class="card">
			<div class="card-body setup-child setup-table">
				<message :messages="messages" />
				<table class="table table-borderless w-auto">
					<tr>
						<td>Tree </td>
						<td>
							<select v-model="query.gedcom" class="form-control form-control-sm">
								<option value="">Select Tree</option>
								<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}} ({{tree.gedcom}})</option>
							</select>
						</td>
						<td>User </td>
						<td>
							<select v-model="query.user" class="form-control form-control-sm">
								<option value="">Select User</option>
								<option v-for="user in users.data" :value="user.ID">{{user.ID}} - {{user.user_login}}</option>
							</select>
						</td>
						<td>
							<button @click.prevent="search" class="btn btn-sm btn-primary">Search</button>
						</td>
						<td>
							<button @click.prevent="query.user='', query.gedcom=''" class="btn btn-sm btn-primary">Reset</button>
						</td>
					</tr>
				</table>
				<div class="results mt-4">
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Name</th>
								<th scope="col">Event</th>
								<th scope="col">Posted on </th>
								<th scope="col">User</th>
								<th scope="col">Tree</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="temp_events.data" v-for="(temp_event, index) in temp_events.data" :key="temp_event.id" :class="temp_event.id">
								<td>{{temp_event.personID}}</td>
								<td>{{temp_event.people ? temp_event.people.name : ''}}</td>
								<td>{{temp_event.eventID}}</td>
								<td>{{temp_event.created_at}}</td>
								<td>{{temp_event.user}}</td>
								<td>{{temp_event.gedcom}}</td>
								<th scope="row">
									<router-link :to="{name: 'people-review-single', params: {id: temp_event.id}}" title="Edit" class="btn btn-sm btn-icon btn-icon-left btn-icon-edit btn-outline-primary">Edit</router-link>
									<a href="" @click.prevent="deleteIt(temp_event.id, index)" title="Delete" class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-secondary" :class="spinner.delete.spinning  && selected.includes(temp_event.id) ? 'loading' : ''"> Delete</a>
								</th>
							</tr>
							<tr v-if="temp_events.data.length == 0">
								<td colspan="7">
									<div v-if="spinner.loading.spinning">
										<button class="btn btn-link" type="button">
											<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											<span> Loading...</span>
										</button>
									</div>
									<div v-else> Nothing found. </div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-between mt-3  mb-2">
			<div>
			</div>
			<div>
			</div>
			<div>
				<table>
					<tr>
						<td>
							<p class=" mb-0 mr-2">Matches: <span v-if="temp_events.total">
									{{temp_events.from}} to {{temp_events.to }} of {{temp_events.total}}
								</span>
								<span v-else>Not found.</span>
							</p>
						</td>
						<td>
							<nav aria-label="Page navigation example">
								<pagination :data="temp_events" />
							</nav>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import Pagination from '@/components/dashboard/Pagination.vue';
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'pagination': Pagination,
		'message': Message,
	},
	data: function() {
		return {
			messages: [],
			selected: [],
			users: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 1000,
				prev_page_url: null,
				to: 1000,
				total: 0,
			},
			temp_events: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 15,
				prev_page_url: null,
				to: 15,
				total: 0,
			},
			sort: 'ID',
			order: 'DESC',
			spinner: {
				delete: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
			query: {
				type: 'I',
				gedcom: '',
				user: '',
			},
		}
	},
	created: function() {
		this.getData();
	},
	watch: {
		'temp_events.current_page': function(newValue, oldValue) {
			this.getData();
		},
		sort: function(newValue, oldValue) {
			this.getData();
		},
		order: function(newValue, oldValue) {
			this.getData();
		},
	},
	mounted: function() {
		if (this.$route.params.messages) {
			this.messages = this.$route.params.messages;
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'temp_events_get_alt',
				per_page: this.temp_events.per_page,
				current_page: this.temp_events.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
				this.temp_events = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});

			this.spinner.loading.spinning = true;

			const data2 = {
				action: 'users_get_alt',
				per_page: this.users.per_page,
				current_page: this.users.current_page,
				sort: this.sort,
				order: this.order,
				query: {}
			}
			axios.post(wpGenealogy.ajax_url, qs.stringify(data2)).then(response => {
				this.users = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});

		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this temp_event?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$store.dispatch('temp_event/delete', {
					selected: [id],
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.messages = response.data.messages;
				});
			}
		},
		selectAll: function() {
			var selected = [];
			this.sorted_temp_events.forEach(function(temp_event) {
				selected.push(temp_event.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
		search: function() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'temp_events_get_alt',
				per_page: this.temp_events.per_page,
				current_page: this.temp_events.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
				this.temp_events = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this temp_event?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('temp_event/delete', {
					selected: this.selected
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
				}).catch(error => {});
			}
		}
	}
}
</script>