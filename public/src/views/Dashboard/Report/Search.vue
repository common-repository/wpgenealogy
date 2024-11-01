<template>
	<div class="report-search">
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
						<h4>Reports</h4>
					</div>
					<div class="flex-fill text-right">
						<table class="float-right">
							<tr>
								<td>
									<p class=" mb-0 mr-2">Matches: 
										<span v-if="reports.total">
											{{reports.from}} to {{reports.to }} of {{reports.total}}
										</span>
										<span v-else>Not found.</span>
									</p>
								</td>
								<td>
									<nav aria-label="Page navigation example">
										<pagination :data="reports" />
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

							<th></th>
							<th><b>Rank</b></th>
							<th><b>ID</b></th>
							<th><b>Name, Description </b></th>
							<th><b>Active?  </b></th>
							
							<th style="width: 240px;"><b>Action</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="report in reports.data">
							<td>
								<div class="custom-control custom-checkbox">
									<input v-model="selected" :value="report.id" type="checkbox" class="custom-control-input" :id="report.id">
									<label class="custom-control-label" :for="report.id"></label>
								</div>
							</td>
							<td>{{report.ranking}}</td>
							<td>{{report.id}}</td>
							<td>{{report.reportname}}, {{report.reportdesc}}</td>
							<td>{{report.active ? 'Yes' : 'No'}}</td>
							<td>
								<div>
									<router-link :to="{name: 'report-edit', params: {id: report.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit" title="Edit">Edit</router-link>
									<button @click.prevent="deleteIt(report.id)" :class="selected.includes(report.id) && spinner.delete.spinning  ? 'loading' : ''" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" title="Delete">Delete</button>
									<router-link :to="{name: 'report-single', params: {id: report.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-test" title="Edit">Test</router-link>
								</div>
							</td>
						</tr>
						<tr v-if="reports.data.length == 0">
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
						<p class=" mb-0 mr-2">Matches: <span v-if="reports.total">
								{{reports.from}} to {{reports.to }} of {{reports.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="reports" />
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
			reports: {
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
			query: {}
		}
	},
	mounted() {
		this.getData()
	},
	watch: {
		'reports.current_page': function(newValue, oldValue) {
			this.getData()
		},
		sort: function(newValue, oldValue) {
			this.getData()
		},
		order: function(newValue, oldValue) {
			this.getData()
		}
	},
	methods: {
		getData: function() {
			this.reports.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'reports_get_alt',
				current_page: this.reports.current_page,
				per_page: this.reports.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.reports = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this report type?')) {
				this.spinner.delete.spinning = true
				this.selected = [id]
				this.$store.dispatch('report/delete', {
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
			if (confirm('Are you sure you want to delete this selected report?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('report/delete', {
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
			this.reports.data.forEach(function(report) {
				selected.push(report.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
	}
}
</script>