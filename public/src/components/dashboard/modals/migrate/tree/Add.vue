<template>
    <div class="migrate-tree-add">
        <div class="modal" id="migrate-tree-add">
            <tree-add @treeAdded="treeAdded"/>
        </div>
    </div>
</template>
<script>
import treeAdd from '@/components/dashboard/modals/components/tree/Add.vue'
export default {
    props: [''],
    components: {
        'tree-add': treeAdd
    },
    data() {
        return {}
    },
    methods: {
        treeAdded: function(tree) {
            console.log(tree)
            this.$emit('treeAdded', tree);
        }
    }
}
</script>