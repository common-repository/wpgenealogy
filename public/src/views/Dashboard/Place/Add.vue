<template>
	<div class="event-type-add">
		<div class="card mb-4">
			<div class="card-body">
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>Tree:</td>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="place.gedcom">
									<option value="">Select Tree</option>
									<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.gedcom}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Place:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.place" id="place" size="50"></td>
						</tr>
						<tr>
							<td>Latitude:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.latitude" size="20" placeholder="23.787115"></td>
						</tr>
						<tr>
							<td>Longitude:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="place.longitude" size="20" placeholder="90.502229"></td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Notes:</td>
							<td><textarea class="form-control form-control-sm" wrap="" cols="50" rows="5" v-model="place.notes"></textarea></td>
						</tr>
						<tr>
							<td valign="top" colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2"> On save:<br><input type="radio" name="newscreen" value="return"> Return to this page<br>
								<input type="radio" name="newscreen" value="none" checked=""> Return to menu
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button @click.prevent="add" class="btn btn-primary primary2">Save</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			spinner: {
				add: {
					spinning: false,
				}
			},
			place: {
				gedcom: '',
				place: '',
				longitude: '',
				latitude: '',
				notes: '',
			}
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	methods: {
		add: function() {
			this.spinner.add.spinning = true
			const data = {
				action: 'place_add'
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...data,
				...this.place
			})).then(response => {
				this.spinner.add.spinning = false
				if (response.data[0].place && response.data[0].place.id) {
					this.$router.push({
						name: 'dashboard-place-search',
						params: {
							messages: response.data[0] ? [response.data[0].message] : []
						}
					})
				}
			}).catch(error => {})
		},
	}
}
</script>