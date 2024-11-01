<template>
	<div class="branch-search">
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<message :messages="messages" />
				<table class="table table-borderless w-auto">
					<tr>
						<td>Search for: </td>
						<td>
							<select v-model="query.gedcom" class="form-control form-control-sm">
								<option value="">Select Tree</option>
								<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}} ({{tree.gedcom}})</option>
							</select>
						</td>
						<td>
							<input type="text" v-model="query.branch" class="form-control form-control-sm">
						</td>
						<td>
							<button @click.prevent="search" class="btn btn-sm btn-primary">Search</button>
						</td>
						<td>
							<button @click.prevent="query.name='', query.gedcom=''" class="btn btn-sm btn-primary">Reset</button>
						</td>
					</tr>
				</table>
				<div class="results mt-4">
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">Select</th>
								<th scope="col">Branch</th>
								<th scope="col">Description</th>
								<th scope="col">Tree</th>
								<th scope="col">Starting Individual</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="branches.data.length" v-for="(branch, index) in branches.data" :key="branch.id" :class="branch.id">
								<td>
									<div class="custom-control custom-checkbox">
										<input v-model="selected" :value="branch.id" type="checkbox" class="custom-control-input" :id="branch.id">
										<label class="custom-control-label" :for="branch.id"></label>
									</div>
								</td>
								<td>
									{{branch.branch}}
								</td>
								<td>
									{{branch.description}}
								</td>
								<td>
									{{branch.gedcom}}
								</td>
								<td>
									{{branch.person ? branch.person.name +' ('+branch.personID+')' : ''}}
								</td>
								<td>
									<div class="action-btns">
										<router-link :to="{name: 'branch-edit', params: {id: branch.id}}" title="Edit" class="btn btn-sm btn-icon btn-icon-left btn-icon-edit btn-outline-primary">Edit</router-link>
										<a href="#" @click.prevent="deleteIt(branch.id)" title="Delete" class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-secondary" :class="selected.includes(branch.id) && spinner.delete.spinning  ? 'loading' : ''">Delete</a>
									</div>
								</td>
							</tr>
							<tr v-if="branches.data.length == 0">
								<td colspan="8">
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
		<div class="d-flex justify-content-end mb-2">
			<table>
				<tr>
					<td>
						<p class="mb-0 mr-2">Matches: <span v-if="branches.total">
								{{branches.from}} to {{branches.to }} of {{branches.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="branches" />
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
		'message': Message,
	},
	data: function() {
		return {
			messages: [],
			selected: [],
			branches: {
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
			trees: {
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
				gedcom: ''
			},
		}
	},
	created: function() {
		this.getData();
	},
	watch: {
		'branches.current_page': function(newValue, oldValue) {
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
	methods: {
		search() {
			this.getData();
		},
		getData() {
			this.branches.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'branches_get_alt',
				per_page: this.branches.per_page,
				current_page: this.branches.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.branches = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
			this.spinner.loading.spinning = true;
			this.trees.data = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'trees_get_alt',
			})).then(response => {
				this.trees = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});

		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this branch?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'branch_delete',
					selected: [id]
				})).then(response => {
					this.spinner.delete.spinning = false;
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		},
		selectAll: function() {
			var selected = [];
			this.sorted_branches.forEach(function(branch) {
				selected.push(branch.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this branch?')) {
				this.spinner.delete.spinning = true;
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'branch_delete',
					selected: this.selected
				})).then(response => {
					this.spinner.delete.spinning = false;
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		}
	}
}
</script>