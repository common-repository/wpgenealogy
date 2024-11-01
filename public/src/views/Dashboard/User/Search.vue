<template>
	<div class="user-search">
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<message :messages="messages" />
				<div class="results">
					<div class="d-flex smb-2">
						<div class="flex-fill">
							<div class="buttons">
								<button type="button" @click.prevent="selectAll" class="btn btn-sm btn-outline-secondary">Select All</button>
								<button type=" button" @click.prevent="clearAll" class="btn btn-sm btn-outline-success">Clear All</button>
								<button type=" button" @click.prevent="deleteSelected" class="btn btn-sm btn-outline-danger">Delete Selected</button>
							</div>
						</div>
						<div class=" flex-fill text-center">
							<h4>Search Result</h4>
						</div>
						<div class="flex-fill text-right">
							<table class="float-right">
								<tr>
									<td>
										<p class=" mb-0 mr-2">Matches: <span v-if="users.total">
												{{users.from}} to {{users.to }} of {{users.total}}
											</span>
											<span v-else>Not found.</span>
										</p>
									</td>
									<td>
										<nav aria-label="Page navigation example">
											<pagination :data="users" />
										</nav>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<hr>
					<div>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>
										<span>
											<nobr><b>Select</b></nobr>
										</span>
									</th>
									<th><b>Username</b></th>
									<th><b>Real Name / E-mail</b></th>
									<th><b>Role</b></td>
									<th><b>Last Login</b></th>
									<th><b>Disabled</b></th>
									<th>
										<span>
											<nobr><b>Action</b></nobr>
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="user in users.data">
									<td>
										<div class="custom-control custom-checkbox">
											<input v-model="selected" :value="user.ID" type="checkbox" class="custom-control-input" :id="user.ID">
											<label class="custom-control-label" :for="user.ID"></label>
										</div>
									</td>
									<td>
										<router-link :to="{name: 'user-edit', params: {id: user.ID}}" title="Edit">{{user.user_login}}</router-link>
									</td>
									<td>
										{{user.display_name}}
										<br>
										<a :href="'mailto:'+user.user_email">{{user.user_email}}</a>
									</td>
									<td v-if="user.meta && user.caps">
										{{user.caps.administrator ? 'Administrator' : ''}}
										{{user.caps.guest ? 'Guest' : ''}}
										{{user.caps.subm ? 'Submitter' : ''}}
										{{user.caps.contrib ? 'Contributor' : ''}}
										{{user.caps.editor ? 'Editor' : ''}}
										{{user.caps.mcontrib ? 'Media Contributor' : ''}}
										{{user.caps.meditor ? 'Media Editor' : ''}}
										{{user.caps.custom ? 'Custom' : ''}}
									</td>
									<td v-else></td>
									<td><b>{{user.meta.last_login}} ago</b></td>
									<td><b>{{user.meta.disabled}}</b></td>
									<td>
										<div v-if="user && user.caps && !user.caps.administrator">
											<router-link :to="{name: 'user-edit', params: {id: user.ID}}" title="Edit" class="btn btn-icon btn-icon-left btn-icon-edit btn-outline-primary">Edit</router-link>
											<a href="" @click.prevent="deleteUser(user.ID)" title="Delete" class="btn btn-icon btn-icon-left btn-icon-delete btn-outline-primary"> Delete </a>
										</div>
									</td>
								</tr>
								<tr v-if="users.data.length == 0">
									<td colspan="15">
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
		</div>
		<div class="d-flex justify-content-end mt-3  mb-2">
			<table>
				<tr>
					<td>
						<p class=" mb-0 mr-2">Matches: <span v-if="users.total">
								{{users.from}} to {{users.to }} of {{users.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="users" />
						</nav>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>

import Pagination from '@/components/dashboard/Pagination.vue';
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'pagination': Pagination,
		'message': Message
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
				per_page: 15,
				prev_page_url: null,
				to: 15,
				total: 0
			},
			sort: 'ID',
			order: 'DESC',
			query: {},
			spinner: {
				delete: {
					spinning: false
				},
				loading: {
					spinning: true
				}
			}
		}
	},
	created: function() {
		this.getData()
	},
	watch: {
		'users.current_page': function(newValue, oldValue) {
			this.getData()
		},
		sort: function(newValue, oldValue) {
			this.getData()
		},
		order: function(newValue, oldValue) {
			this.getData()
		},
	},
	methods: {
		getData() {
			this.users.data = []
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'users_get_alt',
				per_page: this.users.per_page,
				current_page: this.users.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.users = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteUser: function(userId) {
			this.spinner.delete.spinning = true
			this.$store.dispatch('user/delete', {
				ID: userId
			}).then(response => {
				this.spinner.delete.spinning = false
			}).catch(error => {})
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this selected user?')) {
				this.spinner.delete.spinning = true
				this.$store.dispatch('user/delete', {
					selected: this.selected
				}).then(response => {
					this.spinner.delete.spinning = false
					this.selected = []
					this.messages = response.data.messages
				}).catch(error => {})
			}
		},
		selectAll: function() {
			var selected = []
			this.users.data.forEach(function(user) {
				selected.push(user.ID)
			})
			this.selected = selected
		},
		clearAll: function() {
			this.selected = []
		}
	}
}
</script>