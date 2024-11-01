<template>
    <div class="people-edit-event-association-add">
        <div class="modal" id="people-edit-event-association-add">
            <association-add :associationArgs="associationArgs" :aditional_data="aditional_data" @associationAdded="associationAdded" @findPeople="findPeople" />
        </div>
        <people-find :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
    </div>
</template>
<script>
import findPeople from './people/Find.vue';
import associationAdd from '@/components/dashboard/modals/components/association/Add.vue'
export default {
    props: ['associationArgs'],
    components: {
        'association-add': associationAdd,
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
        associationAdded: function(data) {
            this.$emit('associationAdded', data);
        },
        findPeople: function() {
            this.modalProps.findPeopleArgs = this.associationArgs

            jQuery('#people-edit-event-association-add-people-find').modal('show')
        },
        peopleFound: function(people) {
            jQuery('#people-edit-event-association-add-people-find').modal('hide')
            this.aditional_data.passocID = people.personID;
        },
    }
}
</script>