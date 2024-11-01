<template>
    <div class="todo-add">
        <div class="modal" id="todo-add">
            <todo-add :todoArgs="todoArgs"  @todoAdded="todoAdded" />
        </div>
    </div>
</template>
<script>
import todoAdd from '@/components/dashboard/modals/components/todo/Add.vue';
export default {
    components: {
        'todo-add': todoAdd,
    },
    props: ['todoArgs'],
    data() {
        return {

        }
    },
    methods: {

        todoAdded: function(data) {
            this.$emit('todoAdded', data);
        }
    }
}
</script>