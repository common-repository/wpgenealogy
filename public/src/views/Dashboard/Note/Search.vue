<template>
	<div class="event-type-search">
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />

			<div class="d-flex smb-2">
				<div class="flex-fill">
					<div class="buttons">
						<button type="button" @click.prevent="selectAll" class="btn btn-sm btn-outline-secondary">Select All</button>
						<button type=" button" @click.prevent="clearAll" class="btn btn-sm btn-outline-success">Clear All</button>
						<button type=" button" @click.prevent="deleteSelected" class="btn btn-sm btn-outline-danger">Delete Selected</button>
					</div>
				</div>
				<div class=" flex-fill text-center">
					<h4>Notes</h4>
				</div>
				<div class="flex-fill text-right">
					<table class="float-right">
						<tr>
							<td>
								<p class=" mb-0 mr-2">Matches: <span v-if="note_links.total">
										{{note_links.from}} to {{note_links.to }} of {{note_links.total}}
									</span>
									<span v-else>Not found.</span>
								</p>
							</td>
							<td>
								<nav aria-label="Page navigation example">
									<pagination :data="note_links" />
								</nav>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<hr>
				<table class="table table-striped mb-0">
					<thead>
						<tr>
							<th><b>Select</b></th>
							<th><b>Note</b></th>
							<th><b>Tree</b></th>
							<th><b>Linked To</b></th>
							<th style="width: 162px;"><b>Action</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="note_link in note_links.data">
							<td>
								
								<div class="custom-control custom-checkbox">
									<input v-model="selected" :value="note_link.id" type="checkbox" class="custom-control-input" :id="note_link.id">
									<label class="custom-control-label" :for="note_link.id"></label>
								</div>
							</td>
							<td> {{note_link.note.note ? note_link.note.note.substring(0,70) : ''}}</td>
							<td>{{note_link.gedcom}}</td>
							<td>{{note_link.persfamID}}</td>
							<td>
								<div>
									<router-link :to="{name: 'note-edit', params: {id: note_link.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit" title="Edit">Edit</router-link>
									<button @click.prevent="deleteIt(note_link.id)" :class="selected.includes(note_link.id) && spinner.delete.spinning  ? 'loading' : ''" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" title="Delete">Delete</button>
								</div>
							</td>
						</tr>
						<tr v-if="note_links.data.length == 0">
							<td colspan="4">
								<div v-if="spinner.loading.spinning">
									<button class="btn btn-link" type="button">
										<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										<span> Loading...</span>
									</button>
								</div>
								<div v-else> Nothing found. </div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="d-flex justify-content-end mt-3 mb-2">
			<table>
				<tr>
					<td>
						<p class=" mb-0 mr-2">Matches: <span v-if="note_links.total">
								{{note_links.from}} to {{note_links.to }} of {{note_links.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="note_links" />
						</nav>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import Pagination from '@/components/dashboard/Pagination.vue';
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'pagination': Pagination,
		'message': Message
	},
	data() {
		return {
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
				total: 0
			},
			sort: 'created_at',
			order: 'DESC',
			spinner: {
				delete: {
					spinning: false
				},
				loading: {
					spinning: true
				}
			},
			query: {}
		}
	},
	mounted() {
		this.getData()
	},
	watch: {
		'note_links.current_page': function(newValue, oldValue) {
			this.getData()
		},
		sort: function(newValue, oldValue) {
			this.getData()
		},
		order: function(newValue, oldValue) {
			this.getData()
		}
	},
	methods: {
		getData: function() {
			this.note_links.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'note_links_get_alt',
				current_page: this.note_links.current_page,
				per_page: this.note_links.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.note_links = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this note_link?')) {
				this.spinner.delete.spinning = true
				this.selected = [id]
				this.$store.dispatch('note_link/delete', {
					selected: [id]
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages
					this.spinner.delete.spinning = false
					this.getData()
				}).catch(error => {})
			}
		},
		selectAll: function() {
			var selected = [];
			this.note_links.data.forEach(function(note) {
				selected.push(note.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this note?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('note_link/delete', {
					selected: this.selected
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages;
					this.spinner.delete.spinning = false;
					this.getData();

				}).catch(error => {});
			}
		}



	}
}
</script>