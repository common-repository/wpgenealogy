<template>
    <div class="family-edit-event-note-citation">
        <div class="modal" id="family-edit-event-note-citation">
            <citation :citationArgs="citationArgs" :citationNew="citationNew" @addCitation="addCitation" @editCitation="editCitation" />
        </div>
        <citation-add :citationArgs="citationArgs" @citationAdded="citationAdded" />
        <citation-edit :citationArgs="citationArgs" :citation="citation" />
    </div>
</template>
<script>
import citation from '@/components/dashboard/modals/components/citation/Index.vue';
import citationAdd from './add/Index.vue';
import citationEdit from './edit/Index.vue';
export default {
    components: {
        'citation': citation,
        'citation-add': citationAdd,
        'citation-edit': citationEdit
    },
    props: ['citationArgs'],
    data: function() {
        return {
            citationNew: {},
            citation: {}
        }
    },
    methods: {
        addCitation: function() {
            jQuery('#family-edit-event-note-citation-add').modal('show')
        },
        citationAdded: function(data) {
            this.citationNew = data[0];
            jQuery('#family-edit-event-note-citation-add').modal('hide')
        },
        editCitation: function(citation) {
            this.citation = citation;
            jQuery('#family-edit-event-note-citation-edit').modal('show')
        },
        citationUpdated: function(citation) {
            jQuery('#family-edit-event-note-citation-edit').modal('hide')
        }
    }
}
</script>