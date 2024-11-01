<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Place</strong><small> {{place}} </small> </h3>
		<br>
		<div v-if="!spinner.loading.spinning">
			<div v-if="events" class="card mb-4" v-for="(event, index) in events">
				<div class="card-body setup-child setup-table">
					<div class="titlebox">
						<span class="subhead"><strong>{{index}}</strong></span><br>
						<p>Matches 1 to {{event.length}} of {{event.length}}</p>
						<table cellpadding="3" cellspacing="1" border="0" width="100%" class="whiteback normal">
							<tbody>
								<tr>
									<td>#
									</td>
									<td>
										<span>
											<b>Last Name, Given Name(s) </b>
										</span>
									</td>
									<td colspan="2">
										<b>Died </b>
									</td>
									<td>
										<span><b>Person / Family ID</b></span>
									</td>
									<td>
										<span><b>Tree</b></span>
									</td>
								</tr>
								<tr v-for="(e,x) in event">
									<td>
										<span>{{(x+1)}}</span>
									</td>
									<td>
										<span v-if="e.person">
											<router-link :to="{name: 'people-single', params: {id: e.person.id}}">{{e.person.name}} </router-link>
										</span>
										<span v-if="e.family">
											<router-link :to="{name: 'family-group-sheet', params: {id: e.family.id}}">
												{{e.family.husband_obj ? e.family.husband_obj.name : ''}} 
												{{(e.family.husband_obj && e.family.wife_obj) ? ' / ' : ''}} 
												{{e.family.wife_obj ? e.family.wife_obj.name : ''}}
											</router-link>
										</span>
									</td>
									<td colspan="2">
										<span>
											{{e.eventdate}}
										</span>
									</td>
									<td>
										<span>{{e.persfamID}}</span>
									</td>
									<td>
										<span>{{e.gedcom}}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div v-else> Nothing found. </div>
		</div>
		<div v-if="spinner.loading.spinning">
			<button class="btn btn-link" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading...</span>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			events: [],
			query: {
				place: this.$route.params.place,
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
		place: function() {
			return this.$route.params.place;
		},
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.events = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'event_by_place',
				query: this.query,
			})).then(response => {
				this.events = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		}
	}
}
</script>