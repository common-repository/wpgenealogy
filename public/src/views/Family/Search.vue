<template>
	<div class="family-search">
		<h3 class="top-breadcrumb"><strong>Family</strong><small> Search </small> </h3>
		<br>
		<div class="card mb-4">
			<div class="card-body">
				<div class="results">
					<div class="d-flex justify-content-between mb-3">
						<div>
							<h4>Search Result</h4>
						</div>
						<div>
						</div>
						<div>
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
					<table class="table table-striped">
						<thead class="thead-light">
							<tr>
								<th width="80">#</th>
								<th width="120" class="sortable" @click.prevent="sort = 'familyID', order = order == 'DESC' ? 'ASC' : 'DESC'">Family ID </th>
								<th width="280"> Father's Name </th>
								<th width="280"> Mother's Name </th>
								<th class="sortable" @click.prevent="sort = 'marrdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'">Married </th>
								<th class="sortable" @click.prevent="sort = 'marrplace', order = order == 'DESC' ? 'ASC' : 'DESC'">Location</th>
								<th width="150">Tree </th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="families.data.length" v-for="(family, index) in families.data" :key="family.id">
								<td>
									<router-link :to="{name: 'family-chart', params:{id: family.id}}">
										{{family.id}}
									</router-link>
								</td>
								<td>
									<router-link :to="{name: 'family-group-sheet', params: {id: family.id}}">{{family.familyID}}</router-link>
								</td>
								<td>
									{{family.husband_obj ? family.husband_obj.name : null}}
								</td>
								<td>
									{{family.wife_obj ? family.wife_obj.name : null}}
								</td>
								<td>{{family.marrdate}}</td>
								<td>{{family.marrplace}}</td>
								<td>{{family.gedcom}}</td>
							</tr>
							<tr v-if="families.data.length == 0">
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
</template>
<script>
import Pagination from '@/components/dashboard/Pagination.vue';
export default {
	components: {
		'pagination': Pagination,
	},
	data() {
		return {
			families: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 25,
				prev_page_url: null,
				to: 25,
				total: 0,
			},
			sort: 'created_at',
			order: 'DESC',
			query: {},
			spinner: {
				loading: {
					spinning: true,
				}
			},
		}
	},
	mounted: function() {
		if (this.$route.params.query) {
			this.query = this.$route.params.query
		}
		this.$store.dispatch('family/get', this.$data);
		this.getData();
	},
	watch: {
		'families.current_page': function(newV, oldV) {
			this.getData();
		},
		sort: function(newV, oldV) {
			this.getData();
		},
		order: function(newV, oldV) {
			this.getData();
		},
	},
	methods: {
		getData: function() {
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'family_search_advanced',
				current_page: this.families.current_page,
				per_page: this.query.per_page ? this.query.per_page : this.families.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.families = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
	}
}
</script>