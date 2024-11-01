<template>
    <div class="family-edit-event-citation">
        <div class="modal" id="family-edit-event-citation">
            <citation :citationArgs="citationArgs" :citationNew="citationNew" @addCitation="addCitation" @editCitation="editCitation" />
        </div>
        <citation-add :citationArgs="citationArgs" @citationAdded="citationAdded" />
        <citation-edit :citationArgs="citationArgs" @citationUpdated="citationUpdated" :citation="citation" />
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
            jQuery('#family-edit-event-citation-add').modal('show')
        },
        citationAdded: function(data) {
            jQuery('#family-edit-event-citation-add').modal('hide')
            this.citationNew = data[0];
        },
        editCitation: function(citation) {
            this.citation = citation;
            jQuery('#family-edit-event-citation-edit').modal('show')
        },
        citationUpdated: function(data) {
            jQuery('#family-edit-event-citation-edit').modal('hide')
        }
    }
}
</script>