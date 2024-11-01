<template>
	<div class="chart-search">
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>Search for: </td>
							<td>
								<select v-model="query.gedcom" class="form-control form-control-sm">
									<option value="">Select Tree</option>
									<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}} ({{tree.gedcom}})</option>
								</select>
							</td>
							<td>
								<select v-model="query.branch" class="form-control form-control-sm">
									<option value="">Select Branch</option>
									<option v-for="branch in branches" :value="branch.branch">{{branch.branch}}</option>
								</select>
							</td>
							<td>
								<button @click.prevent="search" class="btn btn-sm btn-primary">Search</button>
							</td>
							<td>
								<button @click.prevent="query.name='', query.gedcom=''" class="btn btn-sm btn-primary">Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="results mt-4">
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">Select</th>
								<th scope="col">Chart Type</th>
								<th scope="col">Tree</th>
								<th scope="col">Branch</th>
								<th scope="col">Action</th>
								<th scope="col">Shortcode</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="charts.data.length" v-for="(chart, index) in charts.data" :key="chart.id" :class="chart.id">
								<td>
									<div class="custom-control custom-checkbox">
										<input v-model="selected" :value="chart.id" type="checkbox" class="custom-control-input" :id="chart.id">
										<label class="custom-control-label" :for="chart.id"></label>
									</div>
								</td>
								<td>
									{{chart.settings_mod.type ? getType(chart.settings_mod.type) : 'Not selected'}}
								</td>
								<td>
									{{chart.gedcom}}
								</td>
								<td>
									{{chart.branch}}
								</td>
								<td>
									<div class="action-btns">
										<router-link :to="{name: 'chart-edit', params: {id: chart.id}}" title="Edit" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit"> Edit</router-link>
										<a href="#" @click.prevent="deleteIt(chart.id, index)" title="Delete" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" :class="spinner.delete.spinning  && selected.includes(chart.id) ? 'loading' : ''"> Delete </a>
									</div>
								</td>
								<td>
									<code>[wpgenealogy-chart id='{{chart.id}}']</code>
								</td>
							</tr>
							<tr v-if="charts.data.length == 0">
								<td colspan="6">
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
						<p class=" mb-0 mr-2">Matches: <span v-if="charts.total">
								{{charts.from}} to {{charts.to }} of {{charts.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="charts" />
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
			charts: {
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
				gedcom: '',
				branch: '',
			},
		}
	},
	created: function() {
		this.getData()
	},
	watch: {
		'charts.current_page': function(newValue, oldValue) {
			this.getData()
		},
		sort: function(newValue, oldValue) {
			this.getData()
		},
		order: function(newValue, oldValue) {
			this.getData()
		},
	},
	mounted: function() {
		if (this.$route.params.messages) {
			this.messages = this.$route.params.messages
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data']
		},
		branches: function() {
			if (this.query.gedcom) {
				return this.$store.getters['branch/data'].data.filter(branch => this.query.gedcom == branch.gedcom)
			}
		}
	},
	methods: {
		search() {
			this.getData()
		},
		getType(type) {
			let data = []
			data[1] = 'Style 1 - Vertical Descendent Chart (Default)',
				data[2] = 'Style 2 - Horizontal Descendent Chart',
				data[3] = 'Style 3 - Vertical Pedigree Chart',
				data[4] = 'Style 4 - Horizontal Pedigree Chart 1',
				data[5] = 'Style 5 - Horizontal Pedigree Chart 2',
				data[6] = 'Style 6 - Vertical Hourglass ',
				data[7] = 'Style 7 - Horizontal Hourglass '
			return data[type]
		},
		getData() {
			this.charts.data = []
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'charts_get_alt',
				per_page: this.charts.per_page,
				current_page: this.charts.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.charts = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this chart?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'chart_delete',
					selected: [id]
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