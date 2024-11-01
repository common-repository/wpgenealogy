<template>
    <div class="family-edit-event-citation-edit-source-find">
        <div class="modal" id="family-edit-event-citation-edit-source-find">
            <source-find :citationArgs="citationArgs" @sourceFound="sourceFound"/>
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