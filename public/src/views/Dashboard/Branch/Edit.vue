<template>
	<div class="branch-edit">
		<div class="card mb-4">
			<div class="card-body tree-child tree-add">
				<message :messages="messages" />
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<table v-if="branch.id" class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Tree:</td>
							<td>
								<input readonly class="form-control-sm form-control-plaintext" type="text" v-model="branch.gedcom" size="50" value="">
							</td>
						</tr>
						<tr>
							<td>Branch ID:</td>
							<td><input readonly class="form-control-sm form-control-plaintext" type="text" v-model="branch.branch" size="50" value=""></td>
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
							<td valign="top"> Person ID</td>
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
				<people-find v-if="branch && branch.id" :findPeopleArgs="modalProps.findPeopleArgs"  @peopleFound="peopleFound" />
			</div>
		</div>
		<button class="btn btn-primary primary2" type="button" @click.prevent="update">
			<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm"></span> 
			Save 
		</button>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
import findPeople from '@/components/dashboard/modals/branch/edit/people/Find.vue';
export default {
	components: {
		'message': Message,
		'people-find': findPeople,
	},
	data() {
		return {
			branch: {},
			spinner: {
				loading: {
					spinning: false,
				},
				update: {
					spinning: false,
				}
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
	mounted() {
		this.getData()
	},
	methods: {
		getData: function() {
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'branch_get_alt',
				id: this.$route.params.id
			})).then(response => {
				this.branch = response.data

				if(response.data.person) {
					this.displayOnly.people.name = response.data.person.name
				}

				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		update() {
			this.spinner.update.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.branch,
				...{
					action: 'branch_update'
				}
			})).then(response => {
				this.messages = response.data.messages;
				this.spinner.update.spinning = false
			}).catch(error => {});
		},
		findPeople: function() {
			this.modalProps.findPeopleArgs = {
				gedcom: this.branch.gedcom
			}
			jQuery('#branch-edit-people-find').modal('show')
		},
		peopleFound: function(people) {
			jQuery('#branch-edit-people-find').modal('hide')
			this.branch.personID = people.personID
			this.displayOnly.people= people
		}
	}
}
</script>