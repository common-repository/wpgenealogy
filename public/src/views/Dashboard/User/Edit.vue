<template>
	<div class="user-edit">
		<div class="card">
			<div class="card-body tree-child tree-add">
				<message :messages="messages" />
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<div v-if="user && user.meta && user.caps && user.roles && !user.caps.administrator">
					<table class="table table-borderless w-auto">
						<tbody>
							<tr>
								<td>
									<div style="width: 125px;"> Description: </div>
								</td>
								<td>
									<input v-model="user.meta.description" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>Username:</td>
								<td>
									{{user.meta.username}}
								</td>
							</tr>
							<!-- <tr>
								<td>Password:</td>
								<td>
									<input v-model="user.meta.password" type="text" class="form-control form-control-sm">
								</td>
							</tr> -->
							<tr>
								<td>Real Name:</td>
								<td>
									<input v-model="user.meta.name" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>Phone:</td>
								<td>
									<input v-model="user.meta.phone" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>E-mail:</td>
								<td>
									<input v-model="user.meta.email" type="text" class="form-control form-control-sm">
									<span id="emailmsg"></span>
								</td>
							</tr>
							<tr>
								<td>&nbsp;</td>
								<td>
									<div class="custom-control custom-checkbox">
										<input v-model="user.meta.no_email" class="custom-control-input" type="checkbox" id="no_email">
										<label class="custom-control-label" for="no_email"> Do not send mass e-mail to this user </label>
									</div>
								</td>
							</tr>
							<tr>
								<td>Web Site:</td>
								<td>
									<input v-model="user.meta.web" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>Address:</td>
								<td>
									<input v-model="user.meta.address" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>City:</td>
								<td>
									<input v-model="user.meta.city" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>State/Province:</td>
								<td>
									<input v-model="user.meta.state" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>Zip/Postal Code:</td>
								<td>
									<input v-model="user.meta.zip" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td>Country:</td>
								<td>
									<input v-model="user.meta.country" type="text" class="form-control form-control-sm">
								</td>
							</tr>
							<tr>
								<td valign="top" style="vertical-align: top;">Notes:</td>
								<td>
									<textarea v-model="user.meta.notes" cols="50" rows="4" class="form-control form-control-sm"></textarea>
								</td>
							</tr>
							<tr>
								<td> Tree / Person ID: </td>
								<td>
									<table>
										<tr>
											<td>
												<select v-model="user.meta.mynewgedcom" class="form-control form-control-sm w-auto">
													<option value="">Select Tree</option>
													<option v-for="tree in trees" :value="tree.gedcom">{{tree.gedcom}}</option>
												</select>
											</td>
											<td>
												<input type="text" class="form-control form-control-sm" v-model="user.meta.personID">
											</td>
											<td>OR</td>
											<td>
												<a class="smallicon admin-find-icon" href="#" @click.prevent="findPeople" title="Find..."> </a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>Date Registered:</td>
								<td>{{user.user_registered}}</td>
							</tr>
							<tr>
								<td>Date Activated:</td>
								<td>{{user.user_registered}}</td>
							</tr>
							<tr>
								<td>Last Login:</td>
								<td>{{user.meta.last_login}} ago</td>
							</tr>
							<tr>
								<td>&nbsp;</td>
								<td>
									<div class="custom-control custom-checkbox">
										<input v-model="user.meta.disabled" class="custom-control-input" type="checkbox" id="Disabled">
										<label class="custom-control-label" for="Disabled"> Disabled </label>
									</div>
									<div class="custom-control custom-checkbox">
										<input v-model="user.meta.consented" class="custom-control-input" type="checkbox" id="Consent">
										<label class="custom-control-label" for="Consent"> Consent given </label>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<br>
					<div class="normal">
						<table class="normal">
							<tbody>
								<tr>
									<td valign="top">
										<p><strong>Roles:</strong></p>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Guest" value="guest">
											<label class="custom-control-label" for="Guest"> Guest <br>
												<small><em class="smaller indent">No add, edit or delete rights. No access to Admin area.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Submitter" value="subm">
											<label class="custom-control-label" for="Submitter"> Submitter <br>
												<small><em class="smaller indent">Submit changes subject to review. <br>No access to Admin area.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Contributor" value="contrib">
											<label class="custom-control-label" for="Contributor"> Contributor <br>
												<small><em class="smaller indent">Add information, including media.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Editor" value="editor">
											<label class="custom-control-label" for="Editor"> Editor <br>
												<small><em class="smaller indent">Add, edit and delete all information, including media.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="MediaContributor" value="mcontrib">
											<label class="custom-control-label" for="MediaContributor"> Media Contributor <br>
												<small><em class="smaller indent">Add media only.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="MediaEditor" value="meditor">
											<label class="custom-control-label" for="MediaEditor"> Media Editor <br>
												<small><em class="smaller indent">Add, edit and delete media only.</em></small>
											</label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Custom" value="custom">
											<label class="custom-control-label" for="Custom"> Custom </label>
										</div>
										<div class="custom-control custom-radio">
											<input v-model="user.meta.role" class="custom-control-input" @change="roleUpdate" type="radio" id="Administrator" value="administrator">
											<label class="custom-control-label" for="Administrator"> Administrator <br>
												<small><em class="smaller indent">All rights.</em></small>
											</label>
										</div>
									</td>
									<td valign="top">
										<p><strong>Rights:</strong></p>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_add_data" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_add_data" value="1">
											<label class="custom-control-label" for="allow_add_data"> Allow to add any new data </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_add_media" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_add_media" value="3">
											<label class="custom-control-label" for="allow_add_media"> Allow to add media only </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_edit_data" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_edit_data" value="1">
											<label class="custom-control-label" for="allow_edit_data"> Allow to edit any existing data </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_edit_media" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_edit_media" value="3">
											<label class="custom-control-label" for="allow_edit_media"> Allow to edit media only </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_add_suggestion" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_add_suggestion" value="2">
											<label class="custom-control-label" for="allow_add_suggestion"> Allow to submit edits for administrative review (People, Families and Sources only) </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_delete_data" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_delete_data" value="1">
											<label class="custom-control-label" for="allow_delete_data"> Allow to delete any existing data </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_delete_media" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_delete_media" value="3">
											<label class="custom-control-label" for="allow_delete_media"> Allow to delete media only </label>
										</div>
										<br>
										<hr>
										<br>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_living" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_living">
											<label class="custom-control-label" for="allow_living"> Allow to view information for living individuals </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_private" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_private">
											<label class="custom-control-label" for="allow_private"> Allow to view information for private individuals </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_ged" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_ged">
											<label class="custom-control-label" for="allow_ged"> Allow to download GEDCOMs </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_pdf" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_pdf">
											<label class="custom-control-label" for="allow_pdf"> Allow to download PDFs </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_lds" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_lds">
											<label class="custom-control-label" for="allow_lds"> Allow to view LDS information </label>
										</div>
										<div class="custom-control custom-checkbox">
											<input v-model="user.caps.allow_profile" class="custom-control-input" @change="rightUpdated" type="checkbox" id="allow_profile">
											<label class="custom-control-label" for="allow_profile"> Allow to edit user profile and change password </label>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<br>
						<strong>Access Limits:</strong><br><br>
						<div class="custom-control custom-radio">
							<input v-model="user.meta.administrator" value="tp_level_0" class="custom-control-input" type="radio" id="administrator0">
							<label class="custom-control-label" for="administrator0"> Restrict the above rights to the following: </label>
						</div>
						<div id="restrictions" v-if="user.meta.administrator=='tp_level_0'">
							<table>
								<tbody>
									<tr>
										<td valign="top">
											<span class="normal">Tree*:</span>
										</td>
										<td>
											<select v-model="user.meta.gedcom" class="form-control form-control-sm w-auto" id="treeselect">
												<option value="">Seletc Tree</option>
												<option v-for="tree in trees" :value="tree.gedcom">{{tree.gedcom}}</option>
											</select>
										</td>
									</tr>
									<tr>
										<td valign="top"><span class="normal">Branch**:</span></td>
										<td>
											<span class="normal">
												<select id="branch" class="form-control form-control-sm w-auto" v-model="user.meta.branch">
													<option value="" selected="">All Branches</option>
													<option v-for="branch in branches" :value="branch.branch" v-if="branch.gedcom==user.meta.gedcom">{{branch.branch}}</option>
												</select>
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="custom-control custom-radio">
							<input v-model="user.meta.administrator" value="tp_level_1" class="custom-control-input" type="radio" id="administrator1">
							<label class="custom-control-label" for="administrator1"> Apply the above rights to all trees and branches. </label>
						</div>
						<div class="custom-control custom-radio">
							<input v-model="user.meta.administrator" value="tp_level_2" class="custom-control-input" type="radio" id="administrator2">
							<label class="custom-control-label" for="administrator2"> Apply rights to multiple trees </label>
						</div>
						<div id="multiple" v-if="user.meta.administrator=='tp_level_2'">
							<select v-model="user.meta.gedcom_mult" multiple id="treeselect2" class="form-control form-control-sm w-auto">
								<option v-for="tree in trees" :value="tree.gedcom">{{tree.gedcom}}</option>
							</select>
						</div>
						<br>
						<button class="btn btn-sm btn-primary" @click.prevent="update">Save</button>
						<br>
						<p> *Optional. Assigning no tree to the user will result in the user have rights for all trees and all branches. The site administrator should not be assigned a tree.<br> **Optional. Assigning a branch to the user will constrain the rights granted on this page to the assigned branch within the selected tree.<br>
						</p>
					</div>
				</div>
				<div v-if="user && user.caps && user.caps.administrator"> Not editable. </div>
				<people-find v-if="user && user.meta" :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
			</div>
		</div>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
import peopleFind from '@/components/dashboard/modals/user/edit/people/Find.vue';
export default {
	components: {
		'message': Message,
		'people-find': peopleFind,
	},
	data() {
		return {
			messages: [],
			user: {},
			spinner: {
				loading: {
					spinning: true,
				}
			},
			modalProps: {
				findPeopleArgs: {}
			}
		}
	},
	created: function() {
		this.getData();
	},
	watch: {
		user: {
			handler: function(val, oldVal) {
				this.roleUpdate();
			},
			deep: true
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'].data
		},
		branches: function() {
			return this.$store.getters['branch/data'].data
		},
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'user_get_alt',
				ID: this.$route.params.id
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.user = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		update() {
			

			this.spinner.loading.spinning = true;
			const data = {
				action: 'user_update',
				ID: this.$route.params.id,
				data: this.user,
				security: wpGenealogy.nonce,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.messages = response.data.messages
				this.spinner.loading.spinning = false;
			}).catch(error => {});

		},
		findPeople: function(find) {
			this.modalProps.findPeopleArgs = {gedcom : this.user.meta.mynewgedcom}
			jQuery('#user-edit-people-find').modal('show')
		},
		peopleFound(people) {
			this.user.meta.personID = people.personID
			this.user.meta.gedcom = people.gedcom
			jQuery('#user-edit-people-find').modal('hide')
		},
		checkNotify() {},
		rightUpdated() {
			this.user.meta.role = 'custom';
		},
		roleUpdate() {
			if (this.user.meta && this.user.meta.role == 'guest') {
				this.user.caps.allow_add_data = false;
				this.user.caps.allow_add_media = false;
				this.user.caps.allow_edit_data = false;
				this.user.caps.allow_edit_media = false;
				this.user.caps.allow_add_suggestion = false;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'subm') {
				this.user.caps.allow_add_data = false;
				this.user.caps.allow_add_media = false;
				this.user.caps.allow_edit_data = false;
				this.user.caps.allow_edit_media = false;
				this.user.caps.allow_add_suggestion = true;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'contrib') {
				this.user.caps.allow_add_data = true;
				this.user.caps.allow_add_media = false;
				this.user.caps.allow_edit_data = false;
				this.user.caps.allow_edit_media = false;
				this.user.caps.allow_add_suggestion = false;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'editor') {
				this.user.caps.allow_add_data = true;
				this.user.caps.allow_add_media = false;
				this.user.caps.allow_edit_data = true;
				this.user.caps.allow_edit_media = false;
				this.user.caps.allow_add_suggestion = false;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'mcontrib') {
				this.user.caps.allow_add_data = false;
				this.user.caps.allow_add_media = true;
				this.user.caps.allow_edit_data = false;
				this.user.caps.allow_edit_media = false;
				this.user.caps.allow_add_suggestion = false;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'meditor') {
				this.user.caps.allow_add_data = false;
				this.user.caps.allow_add_media = true;
				this.user.caps.allow_edit_data = false;
				this.user.caps.allow_edit_media = true;
				this.user.caps.allow_add_suggestion = false;
				this.user.caps.allow_delete_data = false;
				this.user.caps.allow_delete_media = false;
			}
			if (this.user.meta && this.user.meta.role == 'custom') {}
			if (this.user.meta && this.user.meta.role == 'administrator') {
				this.user.caps.allow_add_data = true;
				this.user.caps.allow_add_media = true;
				this.user.caps.allow_edit_data = true;
				this.user.caps.allow_edit_media = true;
				this.user.caps.allow_add_suggestion = true;
				this.user.caps.allow_delete_data = true;
				this.user.caps.allow_delete_media = true;
				this.user.caps.allow_living = true;
				this.user.caps.allow_private = true;
				this.user.caps.allow_ged = true;
				this.user.caps.allow_pdf = true;
				this.user.caps.allow_lds = true;
				this.user.caps.allow_profile = true;
			}
		}
	}
}
</script>