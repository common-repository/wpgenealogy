<template>
    <div class="people-edit-event-citation-add">
        <div class="modal" id="people-edit-event-citation-add">
            <citation-add :citationArgs="citationArgs" :aditional_data="aditional_data" @addSource="addSource" @findSource="findSource" @citationAdded="citationAdded" />
        </div>
        <add-source-modal :citationArgs="citationArgs" @sourceAdded="sourceAdded" />
        <find-source-modal :citationArgs="citationArgs" @sourceFound="sourceFound" />
    </div>
</template>
<script>
import citationAdd from '@/components/dashboard/modals/components/citation/Add.vue';
import findSource from './source/Find.vue';
import addSource from './source/Add.vue';
export default {
    components: {
        'citation-add': citationAdd,
        'find-source-modal': findSource,
        'add-source-modal': addSource,
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
        addSource: function() {
            jQuery('#people-edit-event-citation-add-source-add').modal('show')
        },
        sourceAdded(source) {
            jQuery('#people-edit-event-citation-add-source-add').modal('hide')
            this.aditional_data.sourceID = source.sourceID
        },
        findSource: function() {
            jQuery('#people-edit-event-citation-add-source-find').modal('show')
        },
        sourceFound(source) {
            jQuery('#people-edit-event-citation-add-source-find').modal('hide')
            this.aditional_data.sourceID = source.sourceID
        },
        citationAdded: function(data) {
            this.$emit('citationAdded', data);
        }
    }
}
</script>