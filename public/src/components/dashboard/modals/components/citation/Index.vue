<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Citations: {{citationArgs.type}}</h5>
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
							<td width="10" class="text-center">Sort</td>
							<td>Action</td>
							<td>Title</td>
						</tr>
						<tr v-if="citations.data.length" v-for="citation in citations.data">
							<td><a href="#" @click.prevent="" title="Edit" class="smallicon admin-drag-icon"></a></td>
							<td width="70">
								<a href="#" @click.prevent="editCitation(citation)" title="Edit" class="smallicon admin-edit-icon"></a>
								<a href="#" @click.prevent="deleteCitation(citation.id)" title="Delete" class="smallicon admin-delete-icon" :class="selected.includes(citation.id) && spinner.delete.spinning ? 'loading' : ''"></a>
							</td>
							<td width="445">[{{citation.sourceID}}] - {{citation.source_obj ? citation.source_obj.title : ''}} </td>
						</tr>
						<tr v-if="!citations.data.length">
							<td colspan="3"> No citation found. </td>
						</tr>
						<tr class="bg-transparent">
							<td colspan="2" class="bg-transparent">
								<button @click.prevent="addCitation" class="btn btn-primary btn-sm">Add New</button>
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
	props: ['citationArgs', 'citationNew'],
	data: function() {
		return {
			cid: '',
			messages: [],
			selected: [],
			citations: {
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
	mounted() {
		this.cid = this._uid
	},
	watch: {
		citationArgs: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		},
		citationNew: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		}
	},
	methods: {
		getData() {
			if (this.citationArgs.persfamID && this.citationArgs.eventID) {
				this.spinner.loading.spinning = true;
				const data = {
					action: 'citations_get_alt',
					current_page: this.citations.current_page,
					per_page: this.citations.per_page,
					sort: this.sort,
					order: this.order,
					query: this.citationArgs
				}
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
					this.citations = response.data
					this.spinner.loading.spinning = false;
				}).catch(error => {});
			}
		},
		addCitation: function() {
			this.$emit('addCitation');
		},
		editCitation: function(citation) {
			this.$emit('editCitation', citation);
		},
		deleteCitation: function(id) {
			if (confirm('Are you sure you want to delete this note?')) {
				this.selected = [id]
				this.spinner.delete.spinning = true;
				this.$store.dispatch('citation/delete', {
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