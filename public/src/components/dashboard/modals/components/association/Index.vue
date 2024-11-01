<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content" v-if="associationArgs">
			<div class="modal-header">
				<h5 class="modal-title">Association</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<message :messages="messages" />
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
				<table class="table table-striped" v-if="!spinner.loading.spinning">
					<tbody>
						<tr>
							<td>Action</td>
							<td>Description</td>
						</tr>
						<tr v-if="associations.data.length" v-for="association in associations.data">
							<td width="70">
								<a href="#" @click.prevent="editAssociation(association)" title="Edit" class="smallicon admin-edit-icon"></a>
								<a href="#" @click.prevent="deleteAssociation(association.id)" title="Delete" class="smallicon admin-delete-icon" :class="selected.includes(association.id) && spinner.delete.spinning ? 'loading' : ''"></a>
							</td>
							<td width="445">[{{association.passocID}}] : {{association.relationship}}</td>
						</tr>
						<tr v-if="!associations.data.length">
							<td colspan="2"> No association found. </td>
						</tr>
						<tr style="background-color: transparent;">
							<td colspan="2" style="background-color: transparent;">
								<button @click.prevent="addAssociation" class="btn btn-primary btn-sm text-white">Add New</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message
	},
	props: ['associationArgs', 'associationNew'],
	data: function() {
		return {
			cid: '',
			messages: [],
			selected: [],
			associations: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 15,
				prev_page_url: null,
				to: 15,
				total: 0,
			},
			sort: 'ID',
			order: 'DESC',
			spinner: {
				delete: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
			query: {},
		}
	},
	watch: {
		associationArgs: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		},
		associationNew: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		getData() {
			if (this.associationArgs.persfamID) {
				this.spinner.loading.spinning = true;
				const data = {
					action: 'associations_get_alt',
					current_page: this.associations.current_page,
					per_page: this.associations.per_page,
					sort: this.sort,
					order: this.order,
					query: this.associationArgs
				}
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
					this.associations = response.data
					this.spinner.loading.spinning = false;
				}).catch(error => {});
			}
		},
		addAssociation: function() {
			this.$emit('addAssociation');
		},
		editAssociation: function(association) {
			this.$emit('editAssociation', association);
		},
		deleteAssociation: function(id) {
			if (confirm('Are you sure you want to delete this note?')) {
				this.selected = [id]
				this.spinner.delete.spinning = true;
				this.$store.dispatch('association/delete', {
					selected: [id],
				}).then(response => {
					this.getData();
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
				}).catch(error => {});
			}
		}
	}
}
</script>