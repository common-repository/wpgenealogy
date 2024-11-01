<template>
    <div class="family-edit-event-citation-edit">
        <div class="modal" id="family-edit-event-citation-edit">
            <citation-edit :citationArgs="citationArgs" :citation="citation" @citationUpdated="citationUpdated" @addSource="addSource" @findSource="findSource" />
        </div>
        <source-add :citationArgs="citationArgs" @sourceAdded="sourceAdded" />
        <source-find :citationArgs="citationArgs" @sourceFound="sourceFound" />
    </div>
</template>
<script>
import citationEdit from '@/components/dashboard/modals/components/citation/Edit.vue';
import findSource from './source/Find.vue';
import addSource from './source/Add.vue';
export default {
    components: {
        'citation-edit': citationEdit,
        'source-find': findSource,
        'source-add': addSource,
    },
    props: ['citationArgs', 'citation'],
    data() {
        return {}
    },
    methods: {
        sourceFound(source) {
            jQuery('#family-edit-event-citation-edit-source-find').modal('hide')
            this.citation.sourceID = source.sourceID
        },
        sourceAdded(source) {
            jQuery('#family-edit-event-citation-edit-source-add').modal('hide')
            this.citation.sourceID = source.sourceID
        },
        citationUpdated: function() {
            this.$emit('citationUpdated');
        },
        addSource: function() {
            jQuery('#family-edit-event-citation-edit-source-add').modal('show')
        },
        findSource: function() {
            jQuery('#family-edit-event-citation-edit-source-find').modal('show')
        }
    }
}
</script>