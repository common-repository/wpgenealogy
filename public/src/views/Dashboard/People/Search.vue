<template>
	<div class="people-search">
		<h3 class="top-breadcrumb"><strong>People</strong><small> Listing </small> </h3>
		<br>
		<div class="card mb-4 bg-primary">
			<div class="card-body people-child people-search">
				<table class="table table-borderless mb-0 text-white">
					<tr>
						<td>
							<select v-model="query.gedcom" class="form-control">
								<option value="">Select Tree</option>
								<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}} ({{tree.gedcom}})</option>
							</select>
						</td>
						<td>
							<input type="text" class="form-control" id="S" v-model="query.name.value" placeholder="Firstname, Lastname" aria-describedby="emailHelp">
						</td>
						<td>
							<button @click.prevent="search" class="btn btn-primary primary2 btn-block">Search</button>
						</td>
						<td>
							<button @click.prevent="reset" class="btn btn-primary primary2 btn-block">Reset</button>
						</td>
					</tr>
					<tr>
						<td colspan="3">
							<div class="d-flex people-search-prams mt-3">
								<div class="custom-control custom-checkbox mr-4">
									<input class="custom-control-input" v-model="query.living" type="checkbox" id="living">
									<label class="custom-control-label" for="living"> Living Only </label>
								</div>
								<div class="custom-control custom-checkbox mr-4">
									<input class="custom-control-input" v-model="query.private" type="checkbox" id="private">
									<label class="custom-control-label" for="private"> Private Only </label>
								</div>
								<div class="custom-control custom-checkbox mr-4">
									<input class="custom-control-input" v-model="query.exact" type="checkbox" id="exact">
									<label class="custom-control-label" for="exact"> Exact Match Only </label>
								</div>
<!-- 								<div class="custom-control custom-checkbox mr-2">
									<input class="custom-control-input" v-model="query.noChildren" type="checkbox" id="noChildren" disabled>
									<label class="custom-control-label" for="noChildren"> No Children </label>
								</div>
								<div class="custom-control custom-checkbox mr-2">
									<input class="custom-control-input" v-model="query.noParents" type="checkbox" id="noParents" disabled>
									<label class="custom-control-label" for="noParents"> No Parents </label>
								</div>
								<div class="custom-control custom-checkbox">
									<input class="custom-control-input" v-model="query.noSpouse" type="checkbox" id="noSpouse" disabled>
									<label class="custom-control-label" for="noSpouse"> No Spouse </label>
								</div> -->
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="card">
			<div class="card-body people-child people-search">
				<message :messages="messages" />
				<div class="results" :class="spinner.loading.spinning ? 'data-loading' : ''">
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
										<p class=" mb-0 mr-2">Matches: <span v-if="peoples.total">
												{{peoples.from}} to {{peoples.to }} of {{peoples.total}}
											</span>
											<span v-else>Not found.</span>
										</p>
									</td>
									<td>
										<nav aria-label="Page navigation example">
											<pagination :data="peoples" />
										</nav>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<hr>
					<table class="table table-striped mb-0">
						<thead class="thead-light">
							<tr>
								<th width="80">Select</th>
								<th width="50" class="sortable" @click.prevent="sort = 'personID', order = order == 'DESC' ? 'ASC' : 'DESC'">ID</th>
								<th class="sortable" @click.prevent="sort = 'firstname', order = order == 'DESC' ? 'ASC' : 'DESC'">Name</th>
								<th class="sortable" @click.prevent="sort = 'birthdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'">Birth Date</th>
								<th class="sortable" @click.prevent="sort = 'birthplace', order = order == 'DESC' ? 'ASC' : 'DESC'">Birth Place</th>
								<th class="sortable" @click.prevent="sort = 'gedcom', order = order == 'DESC' ? 'ASC' : 'DESC'">Tree</th>
								<!-- 								<th width="50">Tree</th>
								<th width="50">Branch</th> -->
								<th width="240">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="peoples.data.length" v-for="(people, index) in peoples.data" :key="people.id">
								<th scope="row">
									<div class="custom-control custom-checkbox">
										<input v-model="selected" :value="people.id" type="checkbox" class="custom-control-input" :id="people.id">
										<label class="custom-control-label" :for="people.id"></label>
									</div>
								</th>
								<td>{{people.personID}}</td>
								<td>{{people.name}}</td>
								<td>{{people.birthdate}}</td>
								<td>{{people.birthplace}}</td>
								<td>{{people.gedcom}}</td>
								<!-- 								<td>{{people.gedcom}}</td>
								<td>{{people.branch}}</td> -->
								<td>
									<div class="action-btns float-right">
										<router-link :to="{name: 'people-edit', params: {id: people.id}}" title="Edit" class="btn btn-sm btn-icon btn-icon-left btn-icon-edit btn-outline-primary">Edit</router-link>
										<a href="#" @click.prevent="deleteIt(people.id)" title="Delete" class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-secondary" :class="selected.includes(people.id) && spinner.delete.spinning  ? 'loading' : ''">Delete</a>
										<router-link :to="{name: 'people-single', params: {id: people.id}}" title="Test" class="btn btn-sm btn-icon btn-icon-left btn-icon-test btn-outline-success">Test</router-link>
									</div>
								</td>
							</tr>
							<tr v-if="peoples.data.length == 0">
								<td colspan="8" class="preload-td">
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
						<p class=" mb-0 mr-2">Matches: <span v-if="peoples.total">
								{{peoples.from}} to {{peoples.to }} of {{peoples.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="peoples" />
						</nav>
					</td>
				</tr>
			</table>
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
			peoples: {
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
			sort: 'created_at',
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
				name: {
					value: '',
					operator: 'contains',
				},
				gedcom: '',
				exact: false,
				private: false,
				living: false,
				noChildren: false,
				noParents: false,
				noSpouse: false,
			},
		}
	},
	created() {
		if(this.$route.params && this.$route.params.query ){
			this.query = this.$route.params.query
		}
		this.getData();
	},
	watch: {
		'peoples.current_page': function(newValue, oldValue) {
			this.getData();
		},
		sort: function(newValue, oldValue) {
			this.getData();
		},
		order: function(newValue, oldValue) {
			this.getData();
		},
		'query.exact': function(newValue, oldValue) {
			if (newValue == true) {
				this.query.name.operator = 'equals'
			} else {
				this.query.name.operator = 'containss'
			}
		},
	},
	methods: {
		getData: function() {
			this.peoples.data = []
			
			this.spinner.loading.spinning = true;
			const data = {
				action: 'peoples_get_alt',
				current_page: this.peoples.current_page,
				per_page: this.peoples.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
				this.peoples = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		search: function() {
			this.getData();
		},
		reset: function() {
			this.query = {
				name: {
					value: ''
				},
				gedcom: '',
				private: false,
				living: false,
				exact: false,
				noChildren: false,
				noParents: false,
				noSpouse: false,
			}
			this.getData();
		},
		selectAll: function() {
			var selected = [];
			this.peoples.data.forEach(function(people) {
				selected.push(people.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
		deleteIt: function(id) {
			if (confirm('Are you sure you want to delete this people?')) {
				this.selected = [id]
				this.spinner.delete.spinning = true;
				this.$store.dispatch('people/delete', {
					selected: [id]
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this selected people?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('people/delete', {
					selected: this.selected
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		}
	},
	mounted: function() {
		jQuery('#HelpThisArea').click(function() {
			return false;
		});
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
	}
}
</script>
