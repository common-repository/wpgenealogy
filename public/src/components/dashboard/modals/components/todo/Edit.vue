<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">
                    <strong>Update</strong>
                </h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table>
                    <tbody>
                        <tr>
                            <td><label for="title">Title:</label></td>
                            <td><input class="form-control form-control-sm w-auto" v-model="todo.title" id="title" value="fsf" type="text"></td>
                        </tr>
                        <tr>
                            <td><label for="desc">Description:</label></td>
                            <td><textarea class="form-control form-control-sm w-auto" v-model="todo.desc" id="desc" rows="5" cols="40">sdaf</textarea></td>
                        </tr>
                        <tr>
                            <td><label for="date">Since:</label><br></td>
                            <td>
                                <h6 class="ui-state-error">{{todo.date}}</h6>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="deadline">Deadline:</label></td>
                            <td><input class="form-control form-control-sm w-auto" v-model="todo.until" id="deadline" value="2021-06-28" type="date"></td>
                        </tr>
                        <tr>
                            <td><label for="for">Assigned to:</label></td>
                            <td>
                                <select class="form-control form-control-sm w-auto" v-model="todo.for" id="for">
                                    <option value="">Assigne to</option>
                                    <option v-for="user in users.data" :value="user.ID">{{user.display_name}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="status">Status:</label></td>
                            <td>
                                <select class="form-control form-control-sm w-auto" v-model="todo.status" id="status">
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
                                <select class="form-control form-control-sm w-auto" v-model="todo.priority" id="priority">
                                    <option value="1">Low</option>
                                    <option value="2">Normal</option>
                                    <option value="3">High</option>
                                    <option value="4">Important</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="notify">Send alerts through email?</label></td>
                            <td>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" value="1" id="todo_notifyE" v-model="todo.notify">
                                    <label class="custom-control-label" for="todo_notifyE"></label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="update">
                    <span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Update </button>
                <button type="button" class="btn btn-primary" @click.prevent="update">
                    <span v-if="spinner.delete.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Delete </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close"> Cancel </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['todo'],
    data() {
        return {
            spinner: {
                update: {
                    spinning: false,
                },
                delete: {
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
            },
            status: ['', 'New', 'Open', 'Buggy', 'Solved', 'Closed'],
            priority: ['', 'Low', 'Normal', 'High', 'Important'],
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
        update() {
            this.$store.dispatch('todo/update', {
                ...this.todo,
            }).then(response => {
                this.$emit('todoUpdated');
            }).catch(error => {});
        }
    }
}
</script>