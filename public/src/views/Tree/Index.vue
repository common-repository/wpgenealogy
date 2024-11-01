<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Trees</strong><small> All </small> </h3>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="results mt-4">
					<h6>Matches: <span v-if="trees.total">{{trees.from}} to {{trees.to }} of {{trees.total}}</span> <span v-else>Not found.</span> </h6>
					<table class="table table-striped">
						<thead>
							<tr>
								<th># </th>
								<th>Tree Name</th>
								<th>Description</th>
								<th>Individuals</th>
								<th>Families</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="trees.data.length" v-for="(tree, index) in trees.data" :key="tree.id">
								<td>{{tree.id}}</td>
								<td><router-link :to="{name: 'tree-single', params: {gedcom: tree.gedcom}}">{{tree.treename}}</router-link></td>
								<td>{{tree.description}}</td>
								<td><router-link :to="{name: 'people-search', params: {query: {gedcom: tree.gedcom}}}"> {{tree.number_of_peoples}} </router-link></td>
								<td><router-link :to="{name: 'family-search', params: {query: {gedcom: tree.gedcom}}}"> {{tree.number_of_families}} </router-link></td>
							</tr>
							<tr v-if="trees.data.length == 0">
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
export default {
	components: {
		'pagination': Pagination,
	},
	data: function() {
		return {
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
				loading: {
					spinning: true,
				}
			},
		}
	},
	created: function() {
		this.getData();
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
	}
}
</script>