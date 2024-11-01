<template>
	<div class="people-suggest">
		<div class="card mb-4">
			<div class="card-body">
				<br>
				<h4>Suggest a change: {{(people && people.data) ? people.data.name : ''}}</h4>
				<br>
				<table class="table table-borderless w-auto" style="min-width: 500px; max-width: 100%;">
					<tbody>
						<tr>
							<td><span>Your Name: </span></td>
							<td><input class="form-control form-control-sm" type="text" v-model="data.name"></td>
						</tr>
						<tr>
							<td><span>Your Email: </span></td>
							<td><input class="form-control form-control-sm" type="text" v-model="data.email"></td>
						</tr>
						<tr>
							<td><span>Email again: </span></td>
							<td><input class="form-control form-control-sm" type="text" v-model="data.email"></td>
						</tr>
						<tr>
							<td style="vertical-align: top;"><span>Description of<br>proposed changes: </span></td>
							<td>
								<textarea class="form-control form-control-sm" rows="10" v-model="data.description"></textarea>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<button class="btn btn-sm btn-primary" @click.prevent="suggestion"> Submit Suggestion </button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['people'],
	data() {
		return {
			data: {
				name: '',
				email: '',
				description: '',
				type: 'people',
				id: this.people.id,
			},
			spinner: {
				loading: {
					spinning: false,
				}
			}
		}
	},
	methods: {
		suggestion() {
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'suggeste_change',
				data: this.data
			})).then(response => {
				console.log(response);
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		}
	}
}
</script>