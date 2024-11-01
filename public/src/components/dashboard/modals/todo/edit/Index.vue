<template>
    <div class="todo-edit">
        <div class="modal" id="todo-edit">
            <todo-edit :todoArgs="todoArgs" :todo="todo" @todoUpdated="todoUpdated" />
        </div>
    </div>
</template>
<script>
import todoEdit from '@/components/dashboard/modals/components/todo/Edit.vue';
export default {
    components: {
        'todo-edit': todoEdit,
    },
    props: ['todoArgs', 'todo'],
    data() {
        return {}
    },
    methods: {
        todoUpdated: function() {
            this.$emit('todoUpdated');
        },
    }
}
</script>