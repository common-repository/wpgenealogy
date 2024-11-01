<template>
    <div class="people-edit-event-citation-edit">
        <div class="modal" id="people-edit-event-citation-edit">
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
        citationUpdated: function() {
            this.$emit('citationUpdated');
        },
        addSource: function() {
            jQuery('#people-edit-event-citation-edit-source-add').modal('show')
        },
        sourceAdded(source) {
            jQuery('#people-edit-event-citation-edit-source-add').modal('hide')
            this.citation.sourceID = source.sourceID
        },
        findSource: function() {
            jQuery('#people-edit-event-citation-edit-source-find').modal('show')
        },
        sourceFound(source) {
            jQuery('#people-edit-event-citation-edit-source-find').modal('hide')
            this.citation.sourceID = source.sourceID
        }
    }
}
</script>