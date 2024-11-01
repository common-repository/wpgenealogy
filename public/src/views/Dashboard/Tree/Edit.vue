<template>
	<div class="tree-edit">
		<div class="card mb-4">
			<div class="card-body tree-child tree-add">
				<message :messages="messages" />
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<table v-if="tree.id" class="table tabsle-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Tree ID:</td>
							<td><input readonly class="form-control-sm form-control-plaintext" type="text" v-model="tree.gedcom" size="20" maxlength="20"></td>
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
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.owner" size="50" value=""></td>
						</tr>
						<tr>
							<td>E-mail:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.email" size="50" value=""></td>
						</tr>
						<tr>
							<td>Address:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.address" size="50" value=""></td>
						</tr>
						<tr>
							<td>City:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.city" size="50" value=""></td>
						</tr>
						<tr>
							<td>State/Province:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.state" size="50" value=""></td>
						</tr>
						<tr>
							<td>Zip/Postal Code:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.zip" size="50" value=""></td>
						</tr>
						<tr>
							<td>Country:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.country" size="50" value=""></td>
						</tr>
						<tr>
							<td>Phone:</td>
							<td><input class="form-control form-control-sm w-auto" type="text" v-model="tree.phone" size="50" value=""></td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="Private" v-model="tree.secret">
									<label class="custom-control-label" value="1" for="Private">Keep owner information secret</label>
								</div>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="disallowGedCreate" v-model="tree.disallowgedcreate">
									<label class="custom-control-label" value="1" for="disallowGedCreate">Don't allow users to download GEDCOM files</label>
								</div>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" value="1" id="disallowPdf" v-model="tree.disallowpdf">
									<label class="custom-control-label" for="disallowPdf">Don't allow users to create PDF files</label>
								</div>
							</td>
						</tr>
						
					</tbody>
				</table>
			</div>
		</div>
		<button class="btn btn-sm btn-primary primary2" type="button" @click.prevent="save">
									<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span> Save </button>
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
			tree: {},
			messages: [],
			spinner: {
				loading: {
					spinning: false,
				},
				save: {
					spinning: false,
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
				action: 'tree_get_alt',
				id: this.$route.params.id
			})).then(response => {
				this.tree = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		save() {
			if (!this.tree.treename) {
				this.messages = [{
					type: 'alert-info',
					text: 'Please enter a tree name.'
				}]
				return
			}
			this.spinner.save.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.tree,
				...{
					action: 'tree_update'
				}
			})).then(response => {
				this.$store.dispatch('tree/get', this.$data);
				this.$store.dispatch('branch/get', this.$data);
				this.messages = response.data.messages;
				this.spinner.save.spinning = false
			}).catch(error => {});
		}
	}
}
</script>