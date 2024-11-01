<template>
    <div class="family-edit-event-citation-edit-source-add">
        <div class="modal" id="family-edit-event-citation-edit-source-add">
            <source-add :citationArgs="citationArgs" @sourceAdded="sourceAdded" />
        </div>
    </div>
</template>
<script>
import sourceAdd from '@/components/dashboard/modals/components/source/Add.vue'
export default {
    props: ['citationArgs'],
    components: {
        'source-add': sourceAdd
    },
    data() {
        return {
        }
    },
    methods: {
        sourceAdded: function(source) {
            this.$emit('sourceAdded', source);
        }
    }
}
</script>