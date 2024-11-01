<template>
    <div class="people-edit-event-note-citation-add">
        <div class="modal" id="people-edit-event-note-citation-add">
            <citation-add :citationArgs="citationArgs" :aditional_data="aditional_data" @citationAdded="citationAdded" @addSource="addSource" @findSource="findSource" />
        </div>
        <source-add :citationArgs="citationArgs" @sourceAdded="sourceAdded" />
        <source-find :citationArgs="citationArgs" @sourceFound="sourceFound" />
    </div>
</template>
<script>
import citationAdd from '@/components/dashboard/modals/components/citation/Add.vue';
import findSource from './source/Find.vue';
import addSource from './source/Add.vue';
export default {
    components: {
        'citation-add': citationAdd,
        'source-find': findSource,
        'source-add': addSource,
    },
    props: ['citationArgs'],
    data() {
        return {
            aditional_data: {
                sourceID: ''
            }
        }
    },
    methods: {
        citationAdded: function(data) {
            this.$emit('citationAdded', data);
        },
        addSource: function() {
            jQuery('#people-edit-event-note-citation-add-source-add').modal('show')
        },
        sourceAdded(source) {
            jQuery('#people-edit-event-note-citation-add-source-add').modal('hide')
            this.aditional_data.sourceID = source.sourceID
        },
        findSource: function() {
            jQuery('#people-edit-event-note-citation-add-source-find').modal('show')
        },
        sourceFound(source) {
            jQuery('#people-edit-event-note-citation-add-source-find').modal('hide')
            this.aditional_data.sourceID = source.sourceID
        }
    }
}
</script>