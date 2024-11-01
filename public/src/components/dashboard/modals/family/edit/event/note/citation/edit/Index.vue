<template>
    <div class="family-edit-event-note-citation-edit">
        <div class="modal" id="family-edit-event-note-citation-edit">
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
        addSource: function() {
            jQuery('#family-edit-event-note-citation-edit-source-add').modal('show')
        },
        sourceAdded(source) {
            jQuery('#family-edit-event-note-citation-edit-source-add').modal('hide')
            this.citation.sourceID = source.sourceID
        },
        findSource: function() {
            jQuery('#family-edit-event-note-citation-edit-source-find').modal('show')
        },
        sourceFound(source) {
            jQuery('#family-edit-event-note-citation-edit-source-find').modal('hide')
            this.citation.sourceID = source.sourceID
        },
        citationUpdated: function() {
            this.$emit('citationUpdated', data);
        }
    }
}
</script>