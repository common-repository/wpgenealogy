<template>
    <div class="family-edit-event-citation-add-source-find">
        <div class="modal" id="family-edit-event-citation-add-source-find">
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
            this.$emit('sourceFound', source);
        }
    }
}
</script>