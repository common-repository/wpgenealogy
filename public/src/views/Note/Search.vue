<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Notes</strong><small> All </small> </h3>
		<br>
		<div class="form-inline">
			<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Tree</label>
			<select class="custom-select custom-select-sm my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="query.gedcom">
				<option value="">Choose...</option>
				<option v-for="tree in trees.data" :value="tree.gedcom">
					{{tree.gedcom}}
				</option>
			</select>
		</div>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="results mt-4">
					<h6>Matches: <span v-if="note_links.total">{{note_links.from}} to {{note_links.to }} of {{note_links.total}}</span> <span v-else>Not found.</span> </h6>
					<table class="table table-striped">
						<thead>
							<tr>
								<th># </th>
								<th>Note </th>
								<th width="200">Link to </th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="note_links.data.length" v-for="(note_link, index) in note_links.data" :key="note_link.id">
								<td style="vertical-align: top;">{{note_link.id}}</td>
								<td> 
									<div v-if="note_link.note" v-html="note_link.note.notes2"></div>
								</td>
								<td style="vertical-align: top;">

									<span v-if="note_link.person">
										<router-link :to="{name: 'people-single', params: {id: note_link.person.id}}">{{note_link.person.name}}</router-link>
									</span> 
									<span v-if="note_link.family">
										<router-link :to="{name: 'family-chart', params: {id: note_link.family.id}}">
										{{note_link.family.husband ? note_link.family.husband_obj.name : ''}}
										{{(note_link.family.husband && note_link.family.wife )? 'and' :''}}
										{{note_link.family.wife ? note_link.family.wife_obj.name : ''}}
									</router-link>
									</span> 
								</td>
							</tr>
							<tr v-if="note_links.data.length == 0">
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
						<p class="mb-0 mr-2">Matches: <span v-if="note_links.total">
								{{note_links.from}} to {{note_links.to }} of {{note_links.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="note_links" />
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
			note_links: {
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
			query:{
				gedcom: ''
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
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	mounted: function() {
		this.getData();
	},

	watch: {
		'note_links.current_page': function(newValue, oldValue) {
			this.getData();
		},
		sort: function(newValue, oldValue) {
			this.getData();
		},
		order: function(newValue, oldValue) {
			this.getData();
		},


		'query.gedcom': function(n, o) {
			this.getData()
		}



	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.note_links.data = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'note_links_get_alt',
				per_page: this.note_links.per_page,
				current_page: this.note_links.current_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.note_links = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		}
	}
}
</script>