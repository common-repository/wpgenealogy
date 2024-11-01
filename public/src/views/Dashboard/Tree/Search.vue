<template>
	<div class="tree-search">
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<message :messages="messages" />
				<form>
					<table class="table table-borderless w-auto">
						<tr>
							<td>Search for: </td>
							<td>
								<input type="text" v-model="query.gedcom" class="form-control form-control-sm">
							</td>
							<td>
								<button @click.prevent="search" class="btn btn-sm btn-primary">Search</button>
							</td>
							<td>
								<button @click.prevent="reset" class="btn btn-sm btn-primary">Reset</button>
							</td>
						</tr>
					</table>
				</form>
				<div class="results mt-4">
					<h6>Matches: <span v-if="trees.total">{{trees.from}} to {{trees.to }} of {{trees.total}}</span> <span v-else>Not found.</span> </h6>
					<table class="table table-striped">
						<thead>
							<tr>
								<th class="sortable" @click.prevent="sort = 'treename', order = order == 'DESC' ? 'ASC' : 'DESC'">Name</th>
								<th>People</th>
								<th>Family</th>
								<th>Branch</th>
								<th class="sortable" @click.prevent="sort = 'owner', order = order == 'DESC' ? 'ASC' : 'DESC'">Owner</th>
								<!-- <th>Last Import </th> -->
								<th width="250">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="trees.data.length" v-for="(tree, index) in trees.data" :key="tree.id">
								<td>{{tree.treename}}</td>
								<td> <a href="" @click.prevent="dashboard_search_people(tree.gedcom)">{{tree.number_of_peoples}}</a> </td>
								<td><a href="" @click.prevent="dashboard_search_family(tree.gedcom)">{{tree.number_of_families}} </a></td> 
								<td>{{tree.number_of_branchs}}</td>
								<td>{{tree.owner}}</td>
								<!-- <td>{{tree.lastimportdate}}</td> -->
								<td>
									<div class="action-btns">
										<router-link :to="{name: 'tree-edit', params: {id: tree.id}}" title="Edit" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit"> Edit</router-link>
										<a href="#" @click.prevent="deleteIt(tree.id, index)" title="Delete" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" :class="spinner.delete.spinning  && selected.includes(tree.id) ? 'loading' : ''"> Delete </a>
										<a href="#" @click.prevent="clearIt(tree.id, index)" title="Clear" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete"> Clear </a>
									</div>
								</td>
							</tr>
							<tr v-if="trees.data.length == 0">
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
		<div class="d-flex justify-content-end mt-3 mb-2">
			<table>
				<tr>
					<td>
						<p class="mb-0 mr-2">Matches: <span v-if="trees.total">
								{{trees.from}} to {{trees.to }} of {{trees.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="trees" />
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
		'message': Message,
		'pagination': Pagination,
	},
	data: function() {
		return {
			messages: [],
			selected: [],
			trees: {
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
				clear: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
			query: {},
		}
	},
	created: function() {
		this.getData();
	},
	mounted: function() {
		if (this.$route.params.messages) {
			this.messages = this.$route.params.messages;
		}
	},
	watch: {
		'trees.current_page': function(newValue, oldValue) {
			this.getData();
		},
		sort: function(newValue, oldValue) {
			this.getData();
		},
		order: function(newValue, oldValue) {
			this.getData();
		},
	},
	methods: {
		search: function() {
			this.getData();
		},
		reset: function() {
			this.query.gedcom = '';
			this.getData();
		},
		getData() {
			this.spinner.loading.spinning = true;
			this.trees.data = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'trees_get_alt',
				per_page: this.trees.per_page,
				current_page: this.trees.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.trees = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		deleteIt: function(id) {
			if (confirm('Are you sure you want to delete this branch?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'tree_delete',
					selected: [id],
					security: wpGenealogy.nonce,
				})).then(response => {
					this.messages = response.data.messages;
					this.spinner.delete.spinning = false;
					this.getData();
				}).catch(error => {
					reject(error);
				});
			}
		},
		clearIt: function(id) {
			if (confirm('Are you sure you want to clear this tree?')) {
				this.spinner.clear.spinning = true;
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'tree_clear',
					id: id,
					security: wpGenealogy.nonce,
				})).then(response => {
					this.messages = response.data.messages;
					this.spinner.clear.spinning = false;
					this.getData();
				}).catch(error => {
					reject(error);
				});
			}
		},
		dashboard_search_people(gedcom){
			this.$router.push({
				name: 'dashboard-people-search',
				params: {
					query: {
						name: {
							value: '',
							operator: 'contains',
						},
						gedcom: gedcom,
						exact: false,
						private: false,
						living: false,
						noChildren: false,
						noParents: false,
						noSpouse: false,
					}
				}
			})
		},
		dashboard_search_family(gedcom){
			this.$router.push({
				name: 'dashboard-family-search',
				params: {
					query: {
						gedcom: gedcom,
						name: '',
						spouseType: '',
						living: '',
						private: '',
					}
				}
			})
		}
	},
	mounted: function() {
		if (this.$route.params.messages) {
			this.messages = this.$route.params.messages;
		}
	}
}
</script>