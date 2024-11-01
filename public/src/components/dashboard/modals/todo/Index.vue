<template>
    <div class="todo">
        <div class="modal" id="todo">
            <todo :todoNew="todoNew" @addTodo="addTodo" @editTodo="editTodo" @singleTodo="singleTodo"/>
        </div>
        <todo-add @todoAdded="todoAdded" />
        <todo-edit :todo="todo" @todoUpdated="todoUpdated" />
        <todo-single :todo="todo" />
    </div>
</template>
<script>
import todo from '@/components/dashboard/modals/components/todo/Index.vue';
import todoAdd from './add/Index.vue';
import todoEdit from './edit/Index.vue';
import todoSingle from './single/Index.vue';
export default {
    components: {
        'todo': todo,
        'todo-add': todoAdd,
        'todo-edit': todoEdit,
        'todo-single': todoSingle
    },
    data: function() {
        return {
            todo: {},
            todoNew: {}
        }
    },
    methods: {
        addTodo: function() {
            jQuery('#todo-add').modal('show')
        },
        todoAdded: function(data) {
            this.todoNew = data
            jQuery('#todo-add').modal('hide')
        },
        editTodo: function(todo) {
            this.todo = todo;
            jQuery('#todo-edit').modal('show')
        },
        todoUpdated: function() {
            jQuery('#todo-edit').modal('hide')
        },
        singleTodo: function(todo) {
            this.todo = todo;
            jQuery('#todo-single').modal('show')
        },
        
    }
}
</script>