<template>
	<div class="timeline-search">
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
						<h4>Timelines</h4>
					</div>
					<div class="flex-fill text-right">
						<table class="float-right">
							<tr>
								<td>
									<p class=" mb-0 mr-2">Matches: <span v-if="timelines.total">
											{{timelines.from}} to {{timelines.to }} of {{timelines.total}}
										</span>
										<span v-else>Not found.</span>
									</p>
								</td>
								<td>
									<nav aria-label="Page navigation example">
										<pagination :data="timelines" />
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
							<th><b>Event year </b></th>
							<th><b>End Date </b></th>
							<th><b>Event title </b></th>
							<th><b>Event detail </b></th>
							<th style="width: 175px;"><b>Action</b></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="timeline in timelines.data">
							<td>
								<div class="custom-control custom-checkbox">
									<input v-model="selected" :value="timeline.id" type="checkbox" class="custom-control-input" :id="timeline.id">
									<label class="custom-control-label" :for="timeline.id"></label>
								</div>
							</td>
							<td>{{timeline.evyear}}</td>
							<td>{{timeline.endday}}</td>
							<td>{{timeline.evtitle}}</td>
							<td>{{timeline.evdetail}}</td>
							<td>
								<div>
									<router-link :to="{name: 'timeline-edit', params: {id: timeline.id}}" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-edit" title="Edit">Edit</router-link>
									<button @click.prevent="deleteIt(timeline.id)" :class="selected.includes(timeline.id) && spinner.delete.spinning  ? 'loading' : ''" class="btn btn-sm btn-outline-primary btn-icon btn-icon-left btn-icon-delete" title="Delete">Delete</button>
								</div>
							</td>
						</tr>
						<tr v-if="timelines.data.length == 0">
							<td colspan="5">
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
		<div class="d-flex justify-content-end mt-3  mb-2">
			<table>
				<tr>
					<td>
						<p class=" mb-0 mr-2">Matches: 
							<span v-if="timelines.total">
								{{timelines.from}} to {{timelines.to }} of {{timelines.total}}
							</span>
							<span v-else>Not found.</span>
						</p>
					</td>
					<td>
						<nav aria-label="Page navigation example">
							<pagination :data="timelines" />
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
			timelines: {
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
		'timelines.current_page': function(newValue, oldValue) {
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
			this.timelines.data = []
			this.spinner.loading.spinning = true;
			const data = {
				action: 'timelines_get_alt',
				current_page: this.timelines.current_page,
				per_page: this.timelines.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.timelines = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		deleteIt: function(id, index) {
			if (confirm('Are you sure you want to delete this timeline type?')) {
				this.spinner.delete.spinning = true
				this.selected = [id]
				this.$store.dispatch('timeline/delete', {
					selected: [id]
				}).then(response => {
					this.selected = []
					this.messages = response.data.messages
					this.spinner.delete.spinning = false
					this.getData()
				}).catch(error => {})
			}
		},
		deleteSelected: function() {
			if (confirm('Are you sure you want to delete this selected timeline?')) {
				this.spinner.delete.spinning = true;
				this.$store.dispatch('timeline/delete', {
					selected: this.selected
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
					this.getData()
				}).catch(error => {});
			}
		},
		selectAll: function() {
			var selected = [];
			this.timelines.data.forEach(function(timeline) {
				selected.push(timeline.id);
			})
			this.selected = selected;
		},
		clearAll: function() {
			this.selected = [];
		},
	}
}
</script>