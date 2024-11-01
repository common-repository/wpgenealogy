<template>
	<div class="event-type-edit">
		<div class="card mb-4">
			<div class="card-body">
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<table v-if="note_link.id" class="table table-borderless">
					<tbody>
						<tr>
							<td style="vertical-align: top;">Note:</td>
							<td><textarea v-if="note_link.note" v-model="note_link.note.note" class="form-control form-control-sm" name="note" rows="10"></textarea></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>
								<input type="checkbox" name="private" value="1"> Private
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button @click.prevent="update" class="btn btn-primary primary2" >Save</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				note_link: {},
				tag_new: {},
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
					action: 'note_link_get_alt',
					id: this.$route.params.id
				}
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
					this.note_link = response.data
					this.spinner.loading.spinning = false
				}).catch(error => {})
			},
			update: function() {
				this.spinner.loading.spinning = true
				const data = {
					action: 'note_link_update'
				}
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({...data, ...this.note_link, ...this.tag_new})).then(response => {
					this.spinner.loading.spinning = false
				}).catch(error => {})
			},
		}
	}
</script>