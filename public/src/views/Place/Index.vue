<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Place</strong><small> Search </small> </h3>
		<br>
		<div class="form-inline">
			<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Tree</label>
			<select class="custom-select custom-select-sm my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="query.gedcom">
				<option value="">Choose...</option>
				<option v-for="(tree, index) in trees.data" :value="tree.gedcom">
					{{tree.gedcom}}
				</option>
			</select>
		</div>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="titlebox normal">
					<p class="subhead">
						<strong>Show largest localities starting with</strong>
					</p>
					<p class="firstchars" v-if="data.first_chars">
						<router-link v-for="(first_char, index) in data.first_chars" :key="first_char.first_char" class="snlink" title="C (6)" :to="{name:'place-search-char', params: {char: first_char.first_char}}">
							{{first_char.first_char}}
						</router-link> 
					</p>
					<div v-if="data.first_chars.length == 0">
						<div v-if="spinner.loading.spinning">
							<button class="btn btn-link" type="button">
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span> Loading...</span>
							</button>
						</div>
						<div v-else> Nothing found. </div>
					</div>

					<div class="form-inline">
						<div class="form-group mr-2">
							<label for="inputPassword6"> Show all places containing: </label> 
							<input type="text" class="form-control form-control-sm mx-sm-3"> 
						</div> 
						<button type="submit" class="btn btn-sm btn-primary my-1">Go</button>
					</div>
					
					<br><router-link :to="{name: 'place-search-all'}">Show all largest localities</router-link>  (sorted alphabetically) 
				</div>
			</div>
		</div>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<div class="titlebox">
					<p class="subhead"><strong>Top 30 largest localities (total places):</strong></p>
					<div class="row"  v-if="data.short_places">
						<div class="col-md-4 mb-2" v-for="(short_place, index) in data.short_places">
							<span class="snlink">{{(index+1)}}.</span>
							<router-link :to="{name:'place-search-locality', params: {place: short_place.short_place}}">{{short_place.short_place}}</router-link>
							 ({{short_place.count}})
						</div>
					</div>
					<div v-if="data.short_places.length == 0">
						<div v-if="spinner.loading.spinning">
							<button class="btn btn-link" type="button">
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span> Loading...</span>
							</button>
						</div>
						<div v-else> Nothing found. </div>
					</div>
					<div class="form-inline">
						<div class="form-group mr-2">
							<label for="inputPassword6">Show top </label> 
							<input type="text" class="form-control form-control-sm mx-sm-3"> 
							<small id="passwordHelpInline" class="text-muted"> ordered by occurrence </small>
						</div> 
						<button type="submit" class="btn btn-sm btn-primary my-1">Go</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {
	},
	data: function() {
		return {
			data: {
				first_chars: [],
				short_places: [],
			},
			sort: 'ID',
			order: 'DESC',
			query: {
				gedcom: '',
				limit: '30',
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
	},
	watch: {
		'query.gedcom': function(n, o) {
			this.getData()
		}
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.data = {
				first_chars: [],
				short_places: [],
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'locality_level_one',
				query: this.query,
			})).then(response => {
				this.data = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		}
	}
}
</script>