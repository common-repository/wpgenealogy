<template>
    <div class="people-edit-event-association">
        <div class="modal" id="people-edit-event-association">
            <association :associationArgs="associationArgs" :associationNew="associationNew" @addAssociation="addAssociation" @editAssociation="editAssociation" />
        </div>
        <association-add :associationArgs="associationArgs" @associationAdded="associationAdded" />
        <association-edit :associationArgs="associationArgs" :association="association" @associationUpdated="associationUpdated" />
    </div>
</template>
<script>
import association from '@/components/dashboard/modals/components/association/Index.vue';
import associationAdd from './add/Index.vue';
import associationEdit from './edit/Index.vue';
export default {
    components: {
        'association': association,
        'association-add': associationAdd,
        'association-edit': associationEdit
    },
    props: ['associationArgs'],
    data: function() {
        return {
            association: {},
            associationNew: {}
        }
    },
    methods: {
        addAssociation: function() {
            jQuery('#people-edit-event-association-add').modal('show')
        },
        associationAdded: function(data) {
            this.associationNew = data
            jQuery('#people-edit-event-association-add').modal('hide')
        },
        editAssociation: function(association) {
            this.association = association;
            jQuery('#people-edit-event-association-edit').modal('show')
        },
        associationUpdated: function() {
            jQuery('#people-edit-event-association-edit').modal('hide')
        }
    }
}
</script>