<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Find Place</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p class="subhead">
					<span class="normal">(Enter part of a place name)</span>
				</p>
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>Place: </td>
							<td>
								<input class="form-control form-control-sm w-auto" type="text" v-model="query.place.value">
							</td>
							<td>
								<input class="btn btn-sm btn-primary" type="button" @click.prevent="search" value="Search">
							</td>
						</tr>
						<tr>
							<td>
								<div class="custom-control custom-radio mr-sm-2 mt-2">
									<input type="radio" class="custom-control-input" :id="cid+'-startswith'" v-model="query.place.operator" value="startswith">
									<label class="custom-control-label" :for="cid+'-startswith'">startswith</label>
								</div>
							</td>
							<td colspan="2">
								<div class="custom-control custom-radio mr-sm-2 mt-2">
									<input type="radio" class="custom-control-input" :id="cid+'-contains'" v-model="query.place.operator" value="contains">
									<label class="custom-control-label" :for="cid+'-contains'">contains</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div id="results" v-if="places.data.length">
					<span class="normal"><strong>Search Results</strong> (click to select)</span>
					<br>
					<table class="table table-striped">
						<tbody>
							<tr v-for="place in places.data">
								<td><a class="d-block" href="#" @click.prevent="placeFound(place)"> {{place.place}} </a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	props: ['findPlaceArgs'],
	data() {
		return {
			cid: '',
			messages: [],
			places: {
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
				delete: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
			query: {
				place: {
					operator: 'contains',
					value: ''
				},
			},
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		placeFound: function(place) {
			this.$emit('placeFound', place)
		},
		search() {
			this.getData()
		},
		getData: function() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'places_get_alt',
				current_page: this.places.current_page,
				per_page: this.query.per_page ? this.query.per_page : this.places.per_page,
				query: {
					...this.query,
					...this.findPlaceArgs
				}
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				if (response.data) {
					this.places = response.data
				}
				this.spinner.loading.spinning = false
			}).catch(error => {})
		}
	}
}
</script>