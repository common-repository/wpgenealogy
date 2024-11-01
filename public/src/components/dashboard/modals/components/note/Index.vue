<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Notes: {{noteArgs.type}}</h5>
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
					<thead>
						<tr>
							<th width="10" class="text-center">
								<strong>Sort</strong>
							</th>
							<th width="80" class="text-center">
								<strong>Action</strong>
							</th>
							<th>
								<strong>Note</strong>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="note_links.data.length" v-for="note_link in note_links.data">
							<td>
								<a href="#" @click.prevent="" title="Edit" class="smallicon admin-drag-icon"></a>
							</td>
							<td>
								<a @click.prevent="editNote(note_link)" href="#" title="edit" class="smallicon admin-edit-icon"></a>
								<a @click.prevent="deleteNote(note_link.id)" href="#" title="delete" class="smallicon admin-delete-icon" :class="selected.includes(note_link.id) && spinner.delete.spinning ? 'loading' : ''"></a>
								<a @click.prevent="citation(note_link.noteID)" href="#" title="Edit" class="smallicon admin-cite-off-icon"></a>
							</td>
							<td>
								<span v-if="note_link.note && note_link.note.note">
									{{note_link.note.note.slice(0, 75)}}... </span>
							</td>
						</tr>
						<tr v-if="!note_links.data.length">
							<td colspan="3">No note found.</td>
						</tr>
					</tbody>
				</table>
				<button @click.prevent="addNote" class="btn btn-primary btn-sm">Add New</button>
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
	props: ['noteArgs', 'noteNew'],
	data: function() {
		return {
			cid: '',
			messages: [],
			selected: [],
			note_links: {
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
			citationArgs: {
				type: '',
				gedcom: '',
				persfamID: '',
				eventID: '',
			}
		}
	},
	mounted() {
		this.cid = this._uid
	},
	watch: {
		noteArgs: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		},
		noteNew: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		}
	},
	methods: {
		getData() {
			if (this.noteArgs.persfamID && this.noteArgs.eventID) {
				this.spinner.loading.spinning = true;
				const data = {
					action: 'note_links_get_alt',
					current_page: this.note_links.current_page,
					per_page: this.note_links.per_page,
					sort: this.sort,
					order: this.order,
					query: this.noteArgs
				}
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
					this.note_links = response.data
					this.spinner.loading.spinning = false;
				}).catch(error => {});
			}
		},
		addNote: function() {
			this.$emit('addNote');
		},
		editNote: function(note_link) {
			this.$emit('editNote', note_link);
		},
		deleteNote: function(id) {
			if (confirm('Are you sure you want to delete this note?')) {
				this.selected = [id]
				this.spinner.delete.spinning = true;
				this.$store.dispatch('note_link/delete', {
					selected: [id],
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages ? response.data.messages : [];
					this.getData();
				}).catch(error => {});
			}
		},
		citation: function(id) {
			this.$emit('citation', id);
		},
	}
}
</script>