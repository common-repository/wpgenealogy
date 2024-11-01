<template>
    <div class="people-edit-event-association-edit">
        <div class="modal" id="people-edit-event-association-edit">
            <association-edit :associationArgs="associationArgs" :aditional_data="aditional_data" :association="association" @associationUpdated="associationUpdated" @findPeople="findPeople" />
        </div>
        <people-find :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
    </div>
</template>
<script>
import findPeople from './people/Find.vue';
import associationEdit from '@/components/dashboard/modals/components/association/Edit.vue'
export default {
    props: ['associationArgs', 'association'],
    components: {
        'association-edit': associationEdit,
        'people-find': findPeople
    },
    data() {
        return {
            aditional_data: {
                passocID: ''
            },
            modalProps: {
                findPeopleArgs: {}
            }
        }
    },
    methods: {
        associationUpdated: function() {
            this.$emit('associationUpdated')
        },
        findPeople: function() {
            this.modalProps.findPeopleArgs = this.associationArgs
            jQuery('#people-edit-event-association-edit-people-find').modal('show')
        },
        peopleFound: function(people) {
            jQuery('#people-edit-event-association-edit-people-find').modal('hide')
            this.aditional_data.passocID = people.personID;
        },
    }
}
</script>