<template>
    <div class="people-edit-event-citation-edit-source-find">
        <div class="modal" id="people-edit-event-citation-edit-source-find">
            <source-find @sourceFound="sourceFound" :citationArgs="citationArgs" />
        </div>
    </div>
</template>
<script>
import sourceFind from '@/components/dashboard/modals/components/source/Find.vue'
export default {
    props: ['citationArgs'],
    components: {
        'source-find': sourceFind
    },
    data() {
        return {
        }
    },
    methods: {
        sourceFound: function(source) {
            this.$emit('sourceFound', sourceFound);
        }
    }
}
</script>