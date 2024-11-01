<template>
	<div class="modal fade" id="Tentative" tabindex="-1" aria-labelledby="TentativeLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="TentativeLabel">Suggest a change for this event</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="databack ajaxwindow" id="tentedit">
						<p class="subhead"><strong>Suggest a change for this event</strong></p>
						<p class="header"><strong>{{title}} : {{tentative.eventName}}</strong></p>
						<table class="table table-borderless">
							<tbody>
								<tr>
									<td><span>Date: </span></td>
									<td><span>{{tentative.date}}</span></td>
								</tr>
								<tr>
									<td><span>Suggested: </span></td>
									<td><input class="form-control form-control-sm" type="text" v-model="data.eventdate"></td>
								</tr>
								<tr>
									<td colspan="2">&nbsp;</td>
								</tr>
								<tr>
									<td><span>Place: </span></td>
									<td><span>{{tentative.place}}</span></td>
								</tr>
								<tr>
									<td><span>Suggested: </span></td>
									<td><input class="form-control form-control-sm" type="text" v-model="data.eventplace"></td>
								</tr>
								<tr v-if="tentative.eventID=='MARR'">
									<td colspan="2">&nbsp;</td>
								</tr>
								<tr v-if="tentative.eventID=='MARR'">
									<td><span>Type: </span></td>
									<td><span>{{tentative.type}}</span></td>
								</tr>
								<tr v-if="tentative.eventID=='MARR'">
									<td><span>Suggested: </span></td>
									<td><input class="form-control form-control-sm" type="text" v-model="data.eventtype"></td>
								</tr>
								<tr>
									<td colspan="2">&nbsp;</td>
								</tr>
								<tr>
									<td style="vertical-align: top;"><span>Notes: </span></td>
									<td><textarea class="form-control form-control-sm" v-model="data.note"></textarea></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" @click.prevent="save"> 
						<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span>
						Save
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['tentative', 'title'],
	data() {
		return {
			spinner: {
				save: {
					spinning: false,
				}
			},
			data: {
				personID: '',
				familyID: '',
				eventID: '',
				eventdate: '',
				eventplace: '',
				note: '',
			}
		}
	},
	methods: {
		save() {
			this.spinner.save.spinning = true
			this.data.action = 'save_tentative';
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.data,
				...this.tentative
			})).then(response => {
				this.spinner.save.spinning = false
				jQuery('#Tentative').modal('hide')
			}).catch(error => {});
		}
	}
}
</script>