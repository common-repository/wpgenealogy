<template>
	<div class="place-search">
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
							<input type="text" class="form-control" v-model="query.place.value"><br>
						</td>
						<td>
							<button @click.prevent="search" class="btn btn-block btn-primary primary2">Search</button><br>
						</td>
						<td>
							<button @click.prevent="reset" class="btn btn-block btn-primary primary2">Reset</button><br>
						</td>
					</tr>
					<tr>
						<td colspan="4">
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="quop" value="equals" v-model="query.place.operator">
								<label class="custom-control-label" for="quop"> Exact match only </label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" value="true" v-model="query.mll" id="mll">
								<label class="custom-control-label" for="mll"> Missing latitude or longitude </label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" value="true" v-model="query.noe" id="noe">
								<label class="custom-control-label" for="noe"> No associated events </label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" value="true" v-model="query.nol" id="nol">
								<label class="custom-control-label" for="nol"> Place level not set </label>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />
				<div class="d-flex smb-2">
					<div class="flex-fill">
						<div class="buttons">
							<button type="button" @click.prevent="selectAll" class="btn btn-sm btn-outline-secondary">Select All</button>
							<button type=" button" @click.prevent="clearAll" class="btn btn-sm btn-outline-success">Clear All</button>
							<button type=" button" @click.prevent="deleteSelected" class="btn btn-sm btn-outline-danger">Delete Selected</button>
						</div>
					</div>
					<div class=" flex-fill text-center">
						<h4>Places</h4>
					</div>
					<div class="flex-fill text-right">
						<table class="float-right">
							<tr>
								<td>
									<p class=" mb-0 mr-2">Matches: <span v-if="places.total">
											{{places.from}} to {{places.to }} of {{places.total}}
										</span>
										<span v-else>Not found.</span>
									</p>
								</td>
								<td>
									<nav aria-label="Page navigation example">
										<pagination :data="places" />
									</nav>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<hr>
				<table class="table table-striped mb-0">
					<thead>
						<tr>
							<th><b>Select</b></th>
							<th><b>Place</b></th>
							<th><b>Latitude</b></th>
							<th><b>Longitude</b></th>
							<th><b>Tree</b></th>
							<th style="width: 175px;"><b>Action</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="place in places.data">
							<td>
								<div class="custom-control custom-checkbox">
									<input v-model="selected" :value="place.id" type="checkbox" class="custom-control-input" :id="place.id">
									<label class="custom-control-label" :for="place.id"></label>
								</div>
							</td>
							<td>{{place.place}}</td>
							<td>{{place.latitude}}</td>
							<td>{{place.longitude}}</td>
							<td>{{place.gedcom}}</td>
							<td>
								<div>
									<router-link :to="{name: 'place-edit', params: {id: place.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit" title="Edit">Edit</router-link>
									<button @click.prevent="deleteIt(place.id)" :class="selected.includes(place.id) && spinner.delete.spinning  ? 'loading' : ''" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" title="Delete">Delete</button>
								</div>
							</td>
						</tr>
						<tr v-if="places.data.length == 0">
							<td colspan="5">
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
		<div class="d-flex justify-content-end mt-3  mb-2">
			<table>
				<tr>
					<td>
						<p class=" mb-0 mr-2">Matches: <span v-if="places.total">
								{{places.from}} to {{places.to }} of {{places.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="places" />
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
	data() {
		return {
			messages: [],
			selected: [],
			places: {
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
			sort: 'created_at',
			order: 'DESC',
			spinner: {
				delete: {
					spinning: false
				},
				loading: {
					spinning: true
				}
			},
			query: {
				gedcom: '',
				place: {
					value: '',
					operator: ''
				},
				mll: '',
				noe: '',
				nol: '',
			}
		}
	},
	mounted() {
		this.getData()
		if (this.$route.params.messages) {
			this.messages = this.$route.params.messages;
		}
	},
	watch: {
		'places.current_page': function(newValue, oldValue) {
			this.getData()
		},
		sort: function(newValue, oldValue) {
			this.getData()
		},
		order: function(newValue, oldValue) {
			this.getData()
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data']
		},
	},
	methods: {
		search() {
			this.getData()
		},
		reset() {
			this.query = {
				gedcom: '',
				place: {
					value: '',
					operator: ''
				},
				mll: '',
				noe: '',
				nol: '',
			}
		},
		getData: function() {
			this.places.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'places_get_alt',
				current_page: this.places.current_page,
				per_page: this.places.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.places = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this place type?')) {
				this.spinner.delete.spinning = true
				this.selected = [id]
				this.$store.dispatch('place/delete', {
					selected: [id]
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages
					this.spinner.delete.spinning = false
					this.getData()
				}).catch(error => {})
			}
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this selected place?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('place/delete', {
					selected: this.selected
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
					this.getData()
				}).catch(error => {});
			}
		},
		selectAll: function() {
			var selected = [];
			this.places.data.forEach(function(place) {
				selected.push(place.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
	}
}
</script>