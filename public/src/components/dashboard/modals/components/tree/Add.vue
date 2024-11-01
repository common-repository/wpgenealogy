<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add New Tree</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<message :messages="messages" />
				<table class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Tree ID:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.gedcom" size="20" maxlength="20"></td>
						</tr>
						<tr>
							<td>Tree Name:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.treename" size="50" value=""></td>
						</tr>
						<tr>
							<td valign="top">Description:</td>
							<td><textarea class="form-control form-control-sm w-auto" cols="40" rows="3" v-model="tree.description"></textarea></td>
						</tr>
						<tr>
							<td>Owner:</td>
							<td><input class="form-control form-control-sm w-auto" name="owner" type="text" v-model="tree.owner" size="50" value=""></td>
						</tr>
						<tr>
							<td>E-mail:</td>
							<td><input class="form-control form-control-sm w-auto" name="email" type="email" v-model="tree.email" size="50" value=""></td>
						</tr>
						<tr>
							<td>Address:</td>
							<td><input class="form-control form-control-sm w-auto" name="address" type="text" v-model="tree.address" size="50" value=""></td>
						</tr>
						<tr>
							<td>City:</td>
							<td><input class="form-control form-control-sm w-auto" name="city" type="text" v-model="tree.city" size="50" value=""></td>
						</tr>
						<tr>
							<td>State/Province:</td>
							<td><input class="form-control form-control-sm w-auto" name="state" type="text" v-model="tree.state" size="50" value=""></td>
						</tr>
						<tr>
							<td>Zip/Postal Code:</td>
							<td><input class="form-control form-control-sm w-auto" name="zip" type="text" v-model="tree.zip" size="50" value=""></td>
						</tr>
						<tr>
							<td>Country:</td>
							<td><input class="form-control form-control-sm w-auto" name="country" type="text" v-model="tree.country" size="50" value=""></td>
						</tr>
						<tr>
							<td>Phone:</td>
							<td><input class="form-control form-control-sm w-auto" name="phone" type="text" v-model="tree.phone" size="50" value=""></td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="Private" v-model="tree.secret">
									<label class="custom-control-label" for="Private">Keep owner information secret</label>
								</div>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="disallowGedCreate" v-model="tree.disallowgedcreate">
									<label class="custom-control-label" for="disallowGedCreate">Don't allow users to download GEDCOM files</label>
								</div>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="disallowPdf" v-model="tree.disallowpdf">
									<label class="custom-control-label" for="disallowPdf">Don't allow users to create PDF files</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<button class="btn btn-primary primary2" type="button" @click.prevent="add">
					<span v-if="spinner.add.spinning" class="spinner-border spinner-border-sm"></span> Save </button>
			</div>
		</div>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message,
	},
	data() {
		return {
			spinner: {
				add: {
					spinning: false,
				}
			},
			tree: {
				gedcom: null,
				treename: null,
				description: null,
				owner: null,
				email: null,
				address: null,
				city: null,
				state: null,
				zip: null,
				country: null,
				phone: null,
				secret: false,
				disallowgedcreate: false,
				disallowpdf: false,
			},
			messages: [],
			plan: wpGenealogy.plan
		}
	},
	computed: {
		user() {
			return wpGenealogy.user
		}
	},
	methods: {
		add() {
			if (!this.tree.gedcom) {
				this.messages = [{
					type: 'alert-info',
					text: 'Please enter a tree ID.'
				}]
				return
			}
			if (!this.alphaNumericCheck(this.tree.gedcom)) {
				this.messages = [{
					type: 'alert-info',
					text: 'Please use only alphanumeric characters in your Tree ID.'
				}]
				return
			}
			if (!this.tree.treename) {
				this.messages = [{
					type: 'alert-info',
					text: 'Please enter a tree name.'
				}]
				return
			}
			this.spinner.add.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.tree,
				...{
					action: 'tree_add',
					security: wpGenealogy.nonce
				}
			})).then(response => {
				this.messages = response.data.messages;
				if (response.data.tree && response.data.tree.id) {
					
					this.$store.dispatch('tree/get', this.$data);
					this.$store.dispatch('branch/get', this.$data);

					this.$emit('treeAdded', response.data.tree);
					this.spinner.add.spinning = false
				}
			}).catch(error => {});
		},
		alphaNumericCheck(string) {
			var regex = /^[0-9A-Za-z_-]+$/;
			return regex.test(string);
		}
	}
}
</script>