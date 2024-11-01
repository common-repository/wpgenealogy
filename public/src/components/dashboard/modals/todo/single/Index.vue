<template>
    <div class="todo-single">
        <div class="modal" id="todo-single">
            <todo-single :todo="todo" />
        </div>
    </div>
</template>
<script>
import singleEdit from '@/components/dashboard/modals/components/todo/Single.vue';
export default {
    components: {
        'todo-single': singleEdit,
    },
    props: ['todo'],
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