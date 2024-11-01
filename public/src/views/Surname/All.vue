<template>
	<div class="surname-list">
		<h3 class="top-breadcrumb"><strong>Surname</strong><small> All </small> </h3>
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
		<div v-if="surnames.length" class="card mb-2">
			<div class="card-body">
				<h5>Show surnames starting with</h5>
				<br>
				<router-link v-for="surname in getStarting(surnamesAll)" class="snlink" :to="{name: 'surname-first', params: {char: surname}}">
					{{surname}}
				</router-link>
				<br>
				<br>
				<p class="mb-0">
					<router-link :to="{name: 'surname-list'}">Main surname page</router-link>
				</p>
			</div>
		</div>
		<div v-if="surnames.length" class="card mb-2" v-for="surnameX in getStarting(surnames)">
			<div class="card-body">
				<h4>{{surnameX}}</h4>
				<ol style="padding-left: 20px; margin-left: 0; margin-bottom: 0;">
					<li v-for="(surname, index) in surnames" v-if="surname && surname.lastname.substring(0, 1).toUpperCase() == surnameX.toUpperCase()">
						<span>
							<a href="" @click.prevent="searchThroughSurname(surname.lastname)">{{surname.lastname}} </a> ({{surname.total}}) </span>
					</li>
				</ol>
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
</template>
<script>
export default {
	data() {
		return {
			surnamesAll: [],
			surnames: [],
			query: {
				starting: '',
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
		trees: function() {
			return this.$store.getters['tree/data'];
		},
	},
	methods: {
		getData: function() {
			this.surnamesAll = [];
			this.surnames = [];
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_surname',
				query: this.query,
			})).then(response => {
				this.surnamesAll = response.data.data;
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