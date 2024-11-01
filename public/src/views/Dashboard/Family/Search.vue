<template>
	<div class="family-search">
		<h3 class="top-breadcrumb"><strong>Family</strong><small> Listing </small> </h3>
		<br>
		<div class="card mb-4 bg-primary">
			<div class="card-body people-child people-search">
				<table class="table table-borderless text-white mb-0">
					<tr>
						<td>
							<select v-model="query.gedcom" class="form-control">
								<option value="">Select Tree</option>
								<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}} ({{tree.gedcom}})</option>
							</select><br>
						</td>
						<td>
							<input type="text" class="form-control" v-model="query.name"><br>
						</td>
						<td>
							<button @click.prevent="search" class="btn btn-block btn-primary primary2">Search</button><br>
						</td>
						<td>
							<button @click.prevent="reset" class="btn btn-block btn-primary primary2">Reset</button><br>
						</td>
					</tr>
					<tr>
						<td>
							<select v-model="query.spouseType" class="form-control">
								<option value="husband" selected="">Father's Name</option>
								<option value="wife">Mother's Name</option>
								<option value="">No Name</option>
							</select>
						</td>
						<td>
							<div class="d-flex">
								<div class="custom-control custom-checkbox mr-2">
									<input class="custom-control-input" v-model="query.living" type="checkbox" id="living">
									<label class="custom-control-label" for="living"> Living Only </label>
								</div>
								<div class="custom-control custom-checkbox mr-2">
									<input class="custom-control-input" v-model="query.private" type="checkbox" id="private">
									<label class="custom-control-label" for="private"> Private Only </label>
								</div>
							</div>
						</td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-body people-child people-search">
				<div class="results" v-if="families && families.data">
					<message :messages="messages" />
					<div class="d-flex smb-2">
						<div class="flex-fill">
							<div class="buttons">
								<button type="button" @click.prevent="selectAll" class="btn btn-sm btn-outline-secondary">Select All</button>
								<button type="button" @click.prevent="clearAll" class="btn btn-sm btn-outline-success">Clear All</button>
								<button type="button" @click.prevent="deleteSelected" class="btn btn-sm btn-outline-danger">Delete Selected</button>
							</div>
						</div>
						<div class=" flex-fill text-center">
							<h4>Search Result</h4>
						</div>
						<div class="flex-fill text-right">
							<table class="float-right">
								<tr>
									<td>
										<p class="mb-0 mr-2">Matches: 
											<span v-if="families.total">
												{{families.from}} to {{families.to }} of {{families.total}}
											</span>
											<span v-else>Not found.</span>
										</p>
									</td>
									<td>
										<nav aria-label="Page navigation example">
											<pagination :data="families" />
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
								<th scope="col" style="width: 80px;" v-if="user.allcaps.allow_delete_data==true">Select</th>
								<th scope="col" class="sortable" @click.prevent="sort = 'familyID', order = order == 'DESC' ? 'ASC' : 'DESC'">ID</th>
								<th scope="col">Father's Name</th>
								<th scope="col">Mother's Name</th>
								<th scope="col" class="sortable" @click.prevent="sort = 'marrdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'" >Marr Date </th>
								<th scope="col" class="sortable" @click.prevent="sort = 'gedcom', order = order == 'DESC' ? 'ASC' : 'DESC'" >Tree </th>
								<th scope="col" style="width: 240px;">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="families.data" v-for="(family, index) in families.data">
								<td scope="row" v-if="user.allcaps.allow_delete_data==true">
									<div class="custom-control custom-checkbox">
										<input v-model="selected" :value="family.id" type="checkbox" class="custom-control-input" :id="family.id">
										<label class="custom-control-label" :for="family.id"></label>
									</div>
								</td>
								<td>{{family.familyID}}</td>
								<td>{{family.husband_obj ? family.husband_obj.name : ''}}</td>
								<td>{{family.wife_obj ? family.wife_obj.name : ''}}</td>
								<td>{{family.marrdate}}</td>
								<td>{{family.gedcom}}</td>
								<td>
									<div class="action-btns">
										<router-link :to="{name: 'family-edit', params: {id: family.id}}" title="Edit" class="btn btn-sm btn-icon btn-icon-left btn-icon-edit btn-outline-primary">Edit</router-link>
										<a href="#" @click.prevent="deleteIt(family.id)" title="Delete" class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-secondary" :class="selected.includes(family.id) && spinner.delete.spinning  ? 'loading' : ''">Delete</a>
										<router-link :to="{name: 'family-chart', params: {id: family.id}}" title="Test" class="btn btn-sm btn-icon btn-icon-left btn-icon-test btn-outline-success">Test</router-link>
									</div>
								</td>
							</tr>
							<tr v-if="families.data.length == 0">
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
		<div class="d-flex justify-content-end mt-3  mb-2">
			<table>
				<tr>
					<td>
						<p class=" mb-0 mr-2">Matches: <span v-if="families.total">
								{{families.from}} to {{families.to }} of {{families.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="families" />
						</nav>
					</td>
				</tr>
			</table>
		</div>
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
			families: {
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
				gedcom: '',
				name: '',
				spouseType: '',
				living: '',
				private: '',
				exact: '',
			},
			user: wpGenealogy.user,
		}
	},
	watch: {
		'families.current_page': function(newValue, oldValue) {
			this.getData();
		},
		sort: function(newValue, oldValue) {
			this.getData();
		},
		order: function(newValue, oldValue) {
			this.getData();
		},
	},
	created() {
		if(this.$route.params && this.$route.params.query ){
			this.query = this.$route.params.query
		}
		this.getData();
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
	},
	methods: {
		getData: function() {
			this.families.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'families_get_alt',
				current_page: this.families.current_page,
				per_page: this.families.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.families = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		search: function() {
			this.getData()
		},
		reset: function() {
			this.query = {}
			this.getData()
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this family?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$store.dispatch('family/delete', {
					selected: [id],
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages;
					this.spinner.delete.spinning = false;
					this.getData()
				}).catch(error => {})
			}
		},
		selectAll: function() {
			var selected = [];
			this.families.data.forEach(function(family) {
				selected.push(family.id);
			})
			this.selected = selected
		},
		clearAll: function() {
			this.selected = [];
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this family?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('family/delete', {
					selected: this.selected
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages;
					this.spinner.delete.spinning = false;
					this.getData();
				}).catch(error => {});
			}
		}
	}
}
</script>