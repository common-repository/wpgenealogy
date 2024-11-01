<template>
	<div class="branch-add">
		<div class="card mb-4">
			<div class="card-body tree-child tree-add">
				<message :messages="messages" />
				<form method="post">
					<table class="table table-borderless w-auto mb-0">
						<tbody>
							<tr>
								<td>Tree:*</td>
								<td>
									<select class="form-control form-control-sm w-auto" v-model="branch.gedcom">
										<option value="">Select Tree</option>
										<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.gedcom}}</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>Branch ID:*</td>
								<td><input class="form-control form-control-sm w-auto" type="text" v-model="branch.branch" size="50" value=""></td>
							</tr>
							<tr>
								<td valign="top" style="vertical-align: top;">Description:</td>
								<td><textarea class="form-control form-control-sm w-auto" cols="40" rows="3" v-model="branch.description"></textarea></td>
							</tr>
							<tr>
								<td colspan="2">
									<strong>Starting Individual:</strong>
								</td>
							</tr>
							<tr>
								<td valign="top"> Person </td>
								<td>
									<table>
										<tr>
<!-- 											<td>
												<input v-model="branch.personID" class="form-control form-control-sm w-auto" style="width: 100px !important;" name="">
											</td> -->
											<td>
												<span style="min-width: 200px;" @click.prevent="findPeople" v-html="displayOnly.people.name" class="form-control form-control-sm w-auto"></span>
											</td>
										
											<td> <a @click.prevent="findPeople" href="#" class="smallicon admin-find-icon"></a> </td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<strong>Number of Generations:</strong>
								</td>
							</tr>
							<tr>
								<td valign="top"> Ancestors:</td>
								<td>
									<table>
										<tr>
											<td>
												<input v-model="branch.agens" class="form-control form-control-sm w-auto" type="text" name="">
											</td>
											<td> Descendant generations from each ancestor: </td>
											<td>
												<select v-model="branch.dagens" class="form-control form-control-sm w-auto">
													<option>1</option>
												</select>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td valign="top"> Descendants:</td>
								<td>
									<table>
										<tr>
											<td>
												<input v-model="branch.dgens" class="form-control form-control-sm w-auto" type="text" name="">
											</td>
											<td>
												<div class="custom-control custom-checkbox">
													<input v-model="branch.inclspouses" type="checkbox" class="custom-control-input" id="disallowPdf">
													<label class="custom-control-label" for="disallowPdf">Include spouses for all descendants</label>
												</div>
											</td>
											<td> </td>
										</tr>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<people-find :findPeopleArgs="modalProps.findPeopleArgs"  @peopleFound="peopleFound" />
			</div>
		</div>
		<button class="btn btn-primary primary2" type="button" @click.prevent="save">
			<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span> Save </button>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
import findPeople from '@/components/dashboard/modals/branch/add/people/Find.vue';
export default {
	components: {
		'message': Message,
		'people-find': findPeople,
	},
	data() {
		return {
			spinner: {
				save: {
					spinning: false,
				}
			},
			branch: {
				branch: null,
				gedcom: '',
				description: null,
				personID: null,
				agens: null,
				dgens: null,
				dagens: null,
				inclspouses: null,
				action: null,
			},
			messages: [],
			modalProps: {
				findPeopleArgs: {}

			},
			displayOnly: {
				people: {
					name: '&nbsp;'
				}
			}
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	methods: {
		save() {
			if (!this.branch.gedcom) {
				alert("Please select a Tree ID.");
				return
			}
			if (!this.branch.branch) {
				alert("Please enter a branch ID.");
				return
			}
			this.spinner.save.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.branch,
				...{
					action: 'branch_add',
					security: wpGenealogy.nonce
				}
			})).then(response => {
				this.spinner.save.spinning = false
				if (response.data.branch && response.data.branch.id) {
					this.$router.push({
						name: 'dashboard-branch-search',
						params: {
							messages: response.data ? response.data.messages : []
						}
					})
				}
			}).catch(error => {});
		},
		findPeople: function() {
			this.modalProps.findPeopleArgs = {
				gedcom: this.branch.gedcom
			}
			jQuery('#branch-add-people-find').modal('show')
		},
		peopleFound: function(people) {
			jQuery('#branch-add-people-find').modal('hide')
			this.branch.personID = people.personID
			this.displayOnly.people= people
		}
	}
}
</script>