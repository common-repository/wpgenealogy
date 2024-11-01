<template>
	<div class="event-type-search">
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />
				<div class="d-flex smb-2">
					<div class="flex-fill">
						<div class="buttons">
							<button type="button" @click.prevent="selectAll" class="btn btn-sm btn-outline-secondary">Select All</button>
							<button type="button" @click.prevent="clearAll" class="btn btn-sm btn-outline-success">Clear All</button>
							<button type="button" @click.prevent="deleteSelected" class="btn btn-sm btn-outline-danger">Delete Selected</button>
						</div>
					</div>
					<div class=" flex-fill text-center">
						<h4>Places</h4>
					</div>
					<div class="flex-fill text-right">
						<table class="float-right">
							<tr>
								<td>
									<p class=" mb-0 mr-2">Matches: <span v-if="event_types.total">
											{{event_types.from}} to {{event_types.to }} of {{event_types.total}}
										</span>
										<span v-else>Not found.</span>
									</p>
								</td>
								<td>
									<nav aria-label="Page navigation example">
										<pagination :data="event_types" />
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
							<th><b>Tag</b></th>
							<th><b>Type / Description</b></th>
							<th><b>Display</b></th>
							<th><b>Order #</b></th>
							<th><b>Ind / Fam</b></th>
							<th style="width: 162px;"><b>Action</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="event_type in event_types.data">
							<td>
								<div class="custom-control custom-checkbox">
									<input v-model="selected" :value="event_type.id" type="checkbox" class="custom-control-input" :id="event_type.id">
									<label class="custom-control-label" :for="event_type.id"></label>
								</div>
							</td>
							<td>{{event_type.tag}}</td>
							<td>{{event_type.description}}</td>
							<td>{{event_type.display}}</td>
							<td>{{event_type.ordernum}}</td>
							<td>{{event_type.type}}</td>
							<td>
								<div>
									<router-link :to="{name: 'event-type-edit', params: {id: event_type.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit" title="Edit">Edit</router-link>
									<button @click.prevent="deleteIt(event_type.id)" :class="selected.includes(event_types.id) && spinner.delete.spinning  ? 'loading' : ''" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" title="Delete">Delete</button>
								</div>
							</td>
						</tr>
						<tr v-if="event_types.data.length == 0">
							<td>
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
						<p class=" mb-0 mr-2">Matches: <span v-if="event_types.total">
								{{event_types.from}} to {{event_types.to }} of {{event_types.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="event_types" />
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
			event_types: {
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
		'event_types.current_page': function(newValue, oldValue) {
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
			this.event_types.data = []
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'event_types_get_alt',
				current_page: this.event_types.current_page,
				per_page: this.event_types.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			})).then(response => {
				this.event_types = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this event type?')) {
				this.spinner.delete.spinning = true;
				this.selected = [id]
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'event_type_delete',
					selected: [id]
				})).then(response => {
					this.spinner.delete.spinning = false;
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this selected event type?')) {
				this.spinner.delete.spinning = true;
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'event_type_delete',
					selected: this.selected
				})).then(response => {
					this.spinner.delete.spinning = false;
					this.messages = response.data.messages;
					this.getData();
				}).catch(error => {});
			}
		},
		selectAll: function() {
			var selected = [];
			this.event_types.data.forEach(function(event_type) {
				selected.push(event_type.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
	}
}
</script>