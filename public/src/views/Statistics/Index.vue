<template>
	<div class="statistics-search">
		<h3 class="top-breadcrumb"><b>Statistics</b></h3>
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
			<div class="card-body">
				<div v-if="statistics.loaded">
					<table class="table table-borderless table-striped">
						<thead>
							<tr>
								<th width="75%">Description</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><span>Total Individuals</span></td>
								<td><span> {{statistics.total_individuals}} </span></td>
							</tr>
							<tr>
								<td><span>Total Males</span></td>
								<td><span>{{statistics.total_males}} ({{((statistics.total_males/statistics.total_individuals)*100).toFixed(2)}}%) </span></td>
							</tr>
							<tr>
								<td><span>Total Females</span></td>
								<td><span>{{statistics.total_females}} ({{((statistics.total_females/statistics.total_individuals)*100).toFixed(2)}}%) </span></td>
							</tr>
							<tr>
								<td><span>Total Unknown Gender</span></td>
								<td><span>{{statistics.total_unknown_gender}} ({{((statistics.total_unknown_gender/statistics.total_individuals)*100).toFixed(2)}}%) </span></td>
							</tr>
							<tr>
								<td><span>Total Living</span></td>
								<td><span>{{statistics.total_living}} </span></td>
							</tr>
							<tr>
								<td><span>Total Families</span></td>
								<td><span>{{statistics.total_families}} </span></td>
							</tr>
							<tr>
								<td><span>Total Unique Surnames</span></td>
								<td><span>{{statistics.total_unique_surnames}} </span></td>
							</tr>
							<tr>
								<td><span>Total Sources</span></td>
								<td><span>{{statistics.total_sources}} </span></td>
							</tr>
							<tr>
								<td>
									<span>Average Lifespan <sup>
											<font size="1">1</font>
										</sup>
									</span>
								</td>
								<td><span>{{statistics.average_lifespan}} Years </span></td>
							</tr>
							<tr>
								<td><span>Earliest Birth ( <router-link :to="{name: 'people-single', params: {id: statistics.earliest_birth.id}}">{{statistics.earliest_birth.name}} </router-link> )</span></td>
								<td><span> {{statistics.earliest_birth.birthdate}}</span></td>
							</tr>
						</tbody>
					</table>
					<br>
					<table class="table table-borderless table-striped">
						<thead>
							<tr>
								<th width="75%">Longest Lived
									<sup>
										<font size="1">1</font>
									</sup>
								</th>
								<th>Age</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="longest_lived_people in longest_lived_peoples">
								<td><span><router-link :to="{name: 'people-single', params: {id: longest_lived_people.id}}">{{longest_lived_people.name}}</router-link></span></td>
								<td><span>{{longest_lived_people.age}} years</span></td>
							</tr>
						</tbody>
					</table>
					<br><br>
					<table>
						<tbody>
							<tr>
								<td class="align-top">
									<span class="fieldname">
										<sup>
											<font size="1">1</font>
										</sup>
									</span>
								</td>
								<td><span>Age-related calculations are based on individuals with recorded birth <em>and</em> death dates. Due to the existence of incomplete date fields(e.g., a death date listed only as "1945" or "BEF 1860"), these calculations cannot be 100% accurate.</span></td>
							</tr>
						</tbody>
					</table>
					<br>
				</div>
				<div v-if="!statistics.loaded">
					<div v-if="spinner.loading.spinning">
						<button class="btn btn-link" type="button">
							<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							<span> Loading...</span>
						</button>
					</div>
					<div v-else> Nothing found. </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			query:{
				gedcom: ''
			},
			statistics: {},
			spinner: {
				loading: {
					spinning: true,
				}
			},
		}
	},
	mounted() {
		this.getData();
	},
	watch: {
		'query.gedcom': function(n, o) {
			this.getData()
		}
	},
	computed: {
		longest_lived_peoples() {
			if (this.statistics.loaded) {
				return this.statistics.longest_lived_peoples.sort(function(a, b) {
					return a.LastModified - b.LastModified;
				});
			}
		},
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.statistics = {}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_statistics',
				query: this.query,
			})).then(response => {
				this.statistics = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
	}
}
</script>