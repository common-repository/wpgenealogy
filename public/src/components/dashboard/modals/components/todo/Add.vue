<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title">
					<strong>Add New</strong>
				</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table border="0" cellpadding="2" class="table table-borderless ">
					<tbody>
						<tr>
							<td><label for="title">Title:</label></td>
							<td><input class="form-control w-auto form-control-sm" type="text" v-model="todo.title" id="title" placeholder="Enter Title" required=""></td>
						</tr>
						<tr>
							<td><label for="desc">Description:</label></td>
							<td><textarea class="form-control w-auto form-control-sm" v-model="todo.desc" id="desc" placeholder="Enter Description" required=""></textarea></td>
						</tr>
						<tr>
							<td><label for="until">Deadline:</label></td>
							<td><input class="form-control w-auto form-control-sm" v-model="todo.until" id="until" value="yyyy-MM-dd" type="date" required=""></td>
						</tr>
						<tr>
							<td><label for="for">Assigne to:</label></td>
							<td>
								<select class="form-control w-auto form-control-sm" v-model="todo.for" id="for">
									<option value="">Assigne to</option>
									<option v-for="user in users.data" :value="user.ID">{{user.display_name}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="status">Status:</label></td>
							<td>
								<select class="form-control w-auto form-control-sm" v-model="todo.status" id="status" required="">
									<option value="1">New</option>
									<option value="2">Open</option>
									<option value="3">Buggy</option>
									<option value="4">Solved</option>
									<option value="5">Closed</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="priority">Priority:</label></td>
							<td>
								<select class="form-control w-auto form-control-sm" v-model="todo.priority" id="priority" required="">
									<option value="1">Low</option>
									<option value="2">Normal</option>
									<option value="3">High</option>
									<option value="4">Important</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="notify">Send alerts</label></td>
							<td>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" value="1" id="todo_notify" v-model="todo.notify">
									<label class="custom-control-label" for="todo_notify"></label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click.prevent="add">
					<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save </button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			todo: {
				title: '',
				desc: '',
				until: '',
				for: '',
				status: '',
				priority: '',
				notify: '',
			},
			spinner: {
				save: {
					spinning: false,
				},
				loading: {
					spinning: false,
				}
			},
			users: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 100000,
				prev_page_url: null,
				to: 100000,
				total: 0
			}
		}
	},
	mounted: function(){
		this.spinner.loading.spinning = true
		this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
			action: 'users_get_alt',
			per_page: this.users.per_page,
			current_page: this.users.current_page,
			sort: 'ID',
			order: this.order,
			query: this.query
		})).then(response => {
			this.users = response.data
			this.spinner.loading.spinning = false
		}).catch(error => {})
	},
	methods: {
		add() {
			this.spinner.save.spinning = true;
			this.$store.dispatch('todo/add', {
				...this.todo,
			}).then(response => {
				this.spinner.save.spinning = false;
				this.todo = {
					title: '',
					desc: '',
					until: '',
					for: '',
					status: '',
					priority: '',
					notify: '',
				}
				this.$emit('todoAdded', response.data);
			}).catch(error => {});
		},
	}
}
</script>