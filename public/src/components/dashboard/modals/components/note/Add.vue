<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Note:</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table border="0" cellpadding="2" class="normal">
					<tbody>
						<tr>
							<td style="vertical-align: top;">Note:</td>
							<td>
								<textarea class="form-control form-control-sm" wrap="" cols="60" rows="12" v-model="note.note"></textarea>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><input type="checkbox" v-model="note.secret" value="1"> Private</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
				<button class="btn btn-primary" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save </button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['noteArgs'],
	data: function() {
		return {
			cid: '',
			note: {
				gedcom: '',
				note: '',
				secret: ''
			},
			spinner: {
				save: {
					spinning: false,
				}
			},
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		add() {
			this.spinner.save.spinning = true;
			this.$store.dispatch('note/add', {
				...this.note,
				...this.noteArgs
			}).then(response => {
				this.note.note = '';
				this.note.secret = '';
				this.spinner.save.spinning = false;
				this.$emit('noteAdded', response.data);
			}).catch(error => {});
		}
	}
}
</script>