<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Association</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div>
					<table class="table table-borderless w-auto">
						<tbody>
							<tr>
								<td></td>
								<td>
									<div class="custom-control custom-radio custom-control-inline">
										<input type="radio" :id="cid+'-reltypeI'" v-model="association.reltype" class="custom-control-input" value="I">
										<label class="custom-control-label" :for="cid+'-reltypeI'">Person</label>
									</div>
									<div class="custom-control custom-radio custom-control-inline">
										<input type="radio" :id="cid+'-reltypeF'" v-model="association.reltype" class="custom-control-input" value="F">
										<label class="custom-control-label" :for="cid+'-reltypeF'">Family</label>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<span v-if="association.reltype== 'I'">Person ID</span>
									<span v-if="association.reltype== 'F'">Family ID</span>:
								</td>
								<td valign="top" class="pl-0 pr-0">
									<table class="table table-borderless w-auto">
										<tbody>
											<tr>
												<td>
													<input type="text" v-model="aditional_data.passocID" class="form-control form-control-sm">
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
							<tr>
								<td></td>
								<td><br>
									<div class="custom-control custom-checkbox custom-control-inline">
										<input type="checkbox" :id="cid+'-revassoc'" v-model="revassoc" class="custom-control-input" value="1">
										<label class="custom-control-label" :for="cid+'-revassoc'">Also add reverse association for same two people:</label>
									</div>
								</td>
							</tr>
							<tr class="bg-transparent">
								<td class="bg-transparent"></td>
								<td class="bg-transparent">
									<button class="btn btn-primary" @click.prevent="add">
										<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save </button>
								</td>
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
	props: ['associationArgs', 'aditional_data'],
	data() {
		return {
			cid: '',
			association: {
				assocID: '',
				gedcom: '',
				persfamID: '',
				reltype: 'I',
				relationship: '',
			},
			revassoc: '',
			spinner: {
				save: {
					spinning: false
				}
			}
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		add() {
			this.spinner.save.spinning = true;
			this.$store.dispatch('association/add', {
				...this.association,
				...this.associationArgs,
				...this.revassoc,
				...this.aditional_data,
			}).then(response => {
				this.spinner.save.spinning = false;
				this.association = {
					assocID: '',
					gedcom: '',
					persfamID: '',
					passocID: '',
					reltype: 'I',
					relationship: '',
				}
				this.$emit('associationAdded', response.data);
			}).catch(error => {});
		},
		findPeople() {
			this.$emit('findPeople');
		},
	}
}
</script>