<template>
	<div class="report-search">
		<h3 class="top-breadcrumb"><b>Reports</b> </h3>
		<br>
		<div class="card">
			<div class="card-body">
				<table class="table table-striped mb-0">
					<thead>
						<tr>
							<th>#</th>
							<th><b>Reports</b></th>
							<th><b>Description</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="report in reports.data">
							<td>{{report.id}}</td>
							<td>
								<router-link :to="{name: 'report-single', params: {id: report.id}}">{{report.reportname}}</router-link>
							</td>
							<td>{{report.reportdesc}}</td>
						</tr>
						<tr v-if="reports.data.length == 0">
							<td colspan="3">
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
</template>
<script>
import Pagination from '@/components/dashboard/Pagination.vue';
export default {
	components: {
		'pagination': Pagination,
	},
	data() {
		return {
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
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'reports_get_alt',
				current_page: this.reports.current_page,
				per_page: this.reports.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.reports = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
	}
}
</script>