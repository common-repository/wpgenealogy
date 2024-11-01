<template>
	<div class="place-edit">
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<table v-if="place.id" class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Tree:</td>
							<td> {{place.gedcom}}
							</td>
						</tr>
						<tr>
							<td>Place:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.place" id="place" size="50"></td>
						</tr>
						<tr>
							<td>Latitude:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.latitude" size="20"  placeholder="23.787115">></td>
						</tr>
						<tr>
							<td>Longitude:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.longitude" size="20"  placeholder="90.502229">></td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Notes:</td>
							<td><textarea class="form-control form-control-sm" wrap="" cols="50" rows="5" v-model="place.notes"></textarea></td>
						</tr>
						<tr>
							<td valign="top" colspan="2">
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="customCheck1" name="propagate" value="1" checked="">
									<label class="custom-control-label" for="customCheck1">Make changes to place name in existing events:</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-body">
				<div> On save:</div>
				<div class="custom-control custom-radio">
					<input type="radio" id="customRadio1" class="custom-control-input" value="self" v-model="onsave.menu">
					<label class="custom-control-label" for="customRadio1">Return to this page</label>
				</div>
				<div class="custom-control custom-radio">
					<input type="radio" id="customRadio2" class="custom-control-input" value="menu" v-model="onsave.menu" >
					<label class="custom-control-label" for="customRadio2">Return to menu</label>
				</div>
			</div>
		</div>
		<button @click.prevent="update" class="btn btn-primary primary2">Save</button>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message,
	},
	data() {
		return {
			messages: [],
			place: {

			},
			onsave: {
				menu: 'self'
			},
			spinner: {
				loading: {
					spinning: true
				}
			}
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData: function() {
			this.spinner.loading.spinning = true
			const data = {
				action: 'place_get_alt',
				id: this.$route.params.id
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.place = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		update: function() {
			this.spinner.loading.spinning = true
			const data = {
				action: 'place_update'
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...data,
				...this.place
			})).then(response => {
				this.spinner.loading.spinning = false
				if(this.onsave.menu=='menu'){
					this.$router.push({
						name: 'dashboard-place-search',
						params: {
							messages: response.data.messages
						}
					})
				}
				this.messages = response.data.messages;
			}).catch(error => {})
		},
	}
}
</script>