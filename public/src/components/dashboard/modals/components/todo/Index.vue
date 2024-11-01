<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Todos | <button @click.prevent="addTodo" class="btn btn-primary btn-sm">Add New</button> <a href="#">Help for this area</a></h5>

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
						<tr role="row">
							<th aria-sort="ascending" aria-label="ID: activate to sort column descending">ID</th>
							<th aria-label="Title: activate to sort column ascending">Action</th>
							<th aria-label="Title: activate to sort column ascending">Title</th>
							<th aria-label="Submitter: activate to sort column ascending">Submitter</th>
							<th aria-label="Asigned: activate to sort column ascending">Asigned</th>
							<th aria-label="Added: activate to sort column ascending">Added</th>
							<th aria-label="Deadline: activate to sort column ascending">Deadline</th>
							<th aria-label="Status: activate to sort column ascending">Status</th>
							<th aria-label="Priority: activate to sort column ascending">Priority</th>
							<th aria-label="Notify: activate to sort column ascending">Notify</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="todos.data.length" v-for="todo in todos.data">
							<td>{{todo.id}}</td>
							<td width="70">
								<a href="#" @click.prevent="editTodo(todo)" title="Edit" class="smallicon admin-edit-icon"></a>
								<a href="#" @click.prevent="deleteTodo(todo.id)" title="Delete" class="smallicon admin-delete-icon" :class="selected.includes(todo.id) && spinner.delete.spinning ? 'loading' : ''"></a>
							</td>
							<td><a href="#" @click.prevent="singleTodo(todo)" title="View">{{todo.title}}</a></td>
							<td>{{todo.submitter ? todo.submitter.display_name : ''}}</td>
							<td>{{todo.asigned ? todo.asigned.display_name : ''}}</td>
							<td>{{todo.date}}</td>
							<td>{{todo.until}}</td>
							<td>{{status[todo.status]}}</td>
							<td>{{priority[todo.priority]}}</td>
							<td>{{(todo.notify==1) ? 'Yes' : 'No'}}</td>
						</tr>
						<tr v-if="!todos.data.length">
							<td colspan="3"> No todo found. </td>
						</tr>
						<tr class="bg-transparent">
							<td colspan="2" class="bg-transparent">
								
							</td>
						</tr>
					</tbody>
				</table>
				<nav class="float-right" aria-label="Page navigation example">
						<pagination :data="todos" @currentPageChanged="currentPageChanged" />
				</nav>
			</div>
		</div>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
import Pagination from '@/components/dashboard/Pagination.vue';

export default {
	components: {
		'message': Message,
		'pagination': Pagination,

	},
	props: ['todoArgs', 'todoNew'],
	data: function() {
		return {
			status: ['', 'New', 'Open', 'Buggy', 'Solved', 'Closed'],
			priority: ['', 'Low', 'Normal', 'High', 'Important'],
			cid: '',
			messages: [],
			selected: [],
			todos: {
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
		todoArgs: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		},
		todoNew: {
			immediate: true,
			deep: true,
			handler(val, oldVal) {
				this.getData();
			}
		}
	},
	methods: {
		currentPageChanged() {
			this.getData();
		},
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'todos_get_alt',
				current_page: this.todos.current_page,
				per_page: this.todos.per_page,
				sort: this.sort,
				order: this.order,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.todos = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		addTodo: function() {
			this.$emit('addTodo');
		},
		editTodo: function(todo) {
			this.$emit('editTodo', todo);
		},
		singleTodo(todo) {
			this.$emit('singleTodo', todo);
		},
		deleteTodo: function(id) {
			if (confirm('Are you sure you want to delete this note?')) {
				this.selected = [id]
				this.spinner.delete.spinning = true;
				this.$store.dispatch('todo/delete', {
					selected: [id],
				}).then(response => {
					this.getData();
					this.spinner.delete.spinning = false;
					this.selected = []
					this.messages = response.data.messages;
				}).catch(error => {});
			}
		},
		calculateStatus(st) {
			return this.status.st
		},
		calculatePriority(pr) {
			return this.priority.pr
		}
	}
}
</script>