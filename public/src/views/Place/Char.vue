<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Place</strong><small> {{starting}} </small> </h3>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="titlebox normal">
					<div class="form-inline">
						<div class="form-group mr-2">
							<label for="inputPassword6"> Show all places containing: </label>
							<input type="text" class="form-control form-control-sm mx-sm-3">
						</div>
						<button type="submit" class="btn btn-sm btn-primary my-1">Go</button>
					</div>
					<br>
					<router-link :to="{name: 'place-search'}">Main places page</router-link> | 
					<router-link :to="{name: 'place-search-all'}">Show all largest localities</router-link> 
				</div>
			</div>
		</div>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="titlebox">
					<div>
						<p class="subhead"><b> Place List: {{starting}} , sorted alphabetically (number of total localities in parentheses): </b></p>
						<p class="smaller">Click on a place to show smaller localities. Click on the search icon to show matching individuals.</p>
					</div>
					<ol class="row">
						<li class="col-md-4 mb-2" v-for="(place, index) in places">
							<router-link :to="{name:'place-search-locality', params: {place: place.short_place}}">{{place.short_place}}</router-link>
							 ({{place.total}})
						</li>
					</ol>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	data: function() {
		return {
			places: [],
			sort: 'ID',
			order: 'DESC',
			query: {
				starting: this.$route.params.char,
				gedcom: ''
			},
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
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		starting: function() {
			return this.$route.params.char;
		},
	},
	watch: {
		'query.gedcom': function(n, o) {
			this.getData()
		}
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.places = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'places_get_alt_locality_level_one_char',
				query: this.query,
			})).then(response => {
				this.places = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		}
	}
}
</script>