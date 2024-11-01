<template>
	<div class="people-search">
		<h3 class="top-breadcrumb"><strong>People</strong><small> Search </small> </h3>
		<br>
		<div class="card mb-4">
			<div class="card-body">
				<div class="results " :class="spinner.loading.spinning ? 'data-loading' : ''">
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
					<table class="table table-striped">
						<thead class="thead-light">
							<tr>
								<th width="80">#</th>
								<th class="sortable" width="280" @click.prevent="sort = 'firstname', order = order == 'DESC' ? 'ASC' : 'DESC'">Last Name, Given Name(s) </th>
								<th class="sortable" width="100" @click.prevent="sort = 'personID', order = order == 'DESC' ? 'ASC' : 'DESC'">Person ID</th>
								<th class="sortable" @click.prevent="sort = 'birthdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'"> Born/Christened </th>
								<th class="sortable" @click.prevent="sort = 'birthplace', order = order == 'DESC' ? 'ASC' : 'DESC'">Location</th>
								<th v-if="query.showdeath" class="sortable" @click.prevent="sort = 'deathdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'"> Born/Christened </th>
								<th v-if="query.showdeath" class="sortable" @click.prevent="sort = 'deathplace', order = order == 'DESC' ? 'ASC' : 'DESC'">Location</th>
								<th v-if="query.showspouse" class="sortable" @click.prevent="sort = 'deathplace', order = order == 'DESC' ? 'ASC' : 'DESC'">Spouse</th>

							</tr>
						</thead>
						<tbody>
							<tr v-if="peoples.data.length" v-for="(people, index) in peoples.data" :key="people.id">
								<td>
									{{people.id}}
								</td>
								<td>
									<router-link :to="{name: 'people-single', params:{id: people.id}}">
										{{people.name}}
									</router-link>
								</td>
								<td>{{people.personID}}</td>
								<td>{{people.birthdate}}</td>
								<td>{{people.birthplace}}</td>
								<td  v-if="query.showdeath" >{{people.deathdate}}</td>
								<td  v-if="query.showdeath" >{{people.deathplace}}</td>
								<td  v-if="query.showspouse" >
									
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
		<div class="d-flex justify-content-between mt-3 mb-2">
			<div>
			</div>
			<div>
			</div>
			<div>
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
			peoples: {
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
					spinning: false,
				}
			},
		}
	},
	created() {

	},
	mounted: function() {
		if (this.$route.params.query) {
			this.query = this.$route.params.query
		}
		this.getData();
	},
	watch: {
		'peoples.current_page': function(newV, oldV) {
			this.getData();
		},
		sort: function(newV, oldV) {
			this.getData();
		},
		order: function(newV, oldV) {
			this.getData();
		},
	},
	computed: {},
	methods: {
		getData: function() {
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'people_search_advanced',
				current_page: this.peoples.current_page,
				per_page: this.query.per_page ? this.query.per_page : this.peoples.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.peoples = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
	}
}
</script>