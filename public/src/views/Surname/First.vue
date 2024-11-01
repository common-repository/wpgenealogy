<template>
	<div class="surname-first">
		<h3 v-if="starting" class="top-breadcrumb"><strong>Surname List Begins with</strong><small> {{starting}} </small> </h3>
		<br>
		<form class="form-inline">
			<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Tree</label>
			<select class="custom-select custom-select-sm my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="query.gedcom">
				<option value="">Choose...</option>
				<option v-for="tree in trees.data" :value="tree.gedcom">
					{{tree.gedcom}}
				</option>
			</select>
		</form>
		<br>
		<div class="card">
			<div class="card-body">
				<h5 v-if="starting">All surnames beginning with {{starting}}, sorted alphabetically (total individuals):</h5>
				<p>
					<small>Click on a surname to show matching records. <router-link :to="{name: 'surname-list'}"> Main surname page </router-link> | <router-link :to="{name: 'surname-all'}"> Show all surnames </router-link></small>
				</p>
				<br>
				<div v-if="surnames.length" class="tp-surname-grid-container">
					<div class="tp-surname-grid-item" v-for="(surname, index) in surnames">
						{{index+1}}. <a href="" @click.prevent="searchThroughSurname(surname.lastname)">{{surname.lastname ? surname.lastname : '[no surname]'}}</a> ({{surname.total}})
					</div>
				</div>
				<div v-if="surnames.length == 0">
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
			surnames: [],
			query: {
				starting: this.$route.params.char,
				gedcom: '',
				page: 1,
			},
			spinner: {
				loading: {
					spinning: true,
				}
			},
		}
	},
	created: function() {
		this.getData()
	},
	watch: {
		'query.starting': function(n, o) {
			this.getData()
		},
		'query.gedcom': function(n, o) {
			this.getData()
		},
		'query.page': function(n, o) {
			this.getData()
		}
	},
	computed: {
		starting: function() {
			return this.$route.params.char;
		},
		trees: function() {
			return this.$store.getters['tree/data'];
		},
	},
	methods: {
		getData: function() {
			this.surnames = [];
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_surname',
				query: this.query,
			})).then(response => {
				this.surnames = response.data.data;
				this.spinner.loading.spinning = false
			}).catch(error => {});
		},
		getWidth: function(max, total) {
			return ((100 / max) * total).toFixed(0)
		},
		getStarting(surnames) {
			let startings = [];
			for (var i = 0; i < surnames.length; i++) {
				let substring = surnames[i].lastname.substring(0, 1).toUpperCase();
				if (!startings.includes(substring)) {
					startings.push(substring)
				}
			}
			return startings.sort();
		},
		searchThroughSurname(surnames) {
			this.$router.push({
				name: 'people-search',
				params: {
					query: {
						lastname: {
							operator: 'equals',
							value: surnames
						}
					}
				}
			})
		}
	}
}
</script>