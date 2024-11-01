<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Association</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div>
					<table class="table table-borderless w-auto" v-if="association">
						<tbody>
							<tr>
								<td></td>
								<td>
									<div class="custom-control custom-radio custom-control-inline">
										<input type="radio" :id="cid+'-reltypeI2'" v-model="association.reltype" class="custom-control-input" value="I">
										<label class="custom-control-label" :for="cid+'-reltypeI2'">Person</label>
									</div>
									<div class="custom-control custom-radio custom-control-inline">
										<input type="radio" :id="cid+'-reltypeF2'" v-model="association.reltype" class="custom-control-input" value="F">
										<label class="custom-control-label" :for="cid+'-reltypeF2'">Family</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<span id="person_label" v-if="association.reltype== 'I'">Person ID</span>
									<span id="family_label" v-if="association.reltype== 'F'">Family ID</span>:
								</td>
								<td valign="top" class="pl-0 pr-0">
									<table class="table table-borderless w-auto">
										<tbody>
											<tr>
												<td>
													<input type="text" v-model="passocID" class="form-control form-control-sm">
												</td>
												<td> OR </td>
												<td>
													<a href="#" title="Find..." @click.prevent="findPeople" class="smallicon admin-find-icon"></a>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td> Relationship: </td>
								<td>
									<input type="text" v-model="association.relationship" size="60" class="form-control form-control-sm">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" @click.prevent="update">
					<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Update </button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['associationArgs', 'association', 'aditional_data'],
	data() {
		return {
			cid: '',
			reltype: '',
			revassoc: '',
			spinner: {
				save: {
					spinning: false
				}
			},
		}
	},
	mounted() {
		this.cid = this._uid
	},
	computed: {
		passocID() {
			return this.aditional_data.passocID ? this.aditional_data.passocID : this.association.passocID
		}
	},
	methods: {
		update() {
			this.$store.dispatch('association/update', {
				...this.association,
				...this.associationArgs,
				...this.passocID,
			}).then(response => {
				this.$emit('associationUpdated');
			}).catch(error => {});
		},
		findPeople() {
			this.$emit('findPeople');
		},
	}
}
</script>