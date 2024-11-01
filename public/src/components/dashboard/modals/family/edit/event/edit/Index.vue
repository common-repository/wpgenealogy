<template>
    <div class="family-edit-event-edit">
        <div class="modal" id="family-edit-event-edit">
           <event-edit :event="event" :aditional_data="aditional_data" @eventAdded="eventAdded" />   
        </div>
        <people-find :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
        <place-find :findPlaceArgs="findPlaceArgs" @placeFound="placeFound" />
    </div>
</template>
<script>
import eventEdit from '@/components/dashboard/modals/components/event/Edit.vue';
import placeFind from './place/Find.vue';
import findPeople from './people/Find.vue';
export default {
    components: {
        'event-edit': eventEdit,
        'place-find': placeFind,
        'people-find': findPeople,
    },
    props: ['event', 'eventArgs'],
    data() {
        return {
            aditional_data: {
                dupID: null,
            },
            modalProps: {
                findPeopleArgs: {}
            }
        }
    },
    computed: {
        findPeopleArgs(){
            return {
                gedcom: this.event.gedcom
            }
        },
        findPlaceArgs(){
            return {
                gedcom: this.event.gedcom
            }
        }
    },
    methods: {
        placeFound(place) {
            this.$emit('placeFound');
            this.event.eventplace = place.place
        },
        findPeople: function() {
            this.modalProps.findPeopleArgs = this.eventArgs
            jQuery('#family-edit-event-edit-people-find').modal('show')
        },
        peopleFound: function(people) {
            this.$emit('peopleFound');
            this.aditional_data.dupID = people.personID
            jQuery('#family-edit-event-edit-people-find').modal('hide')
        },
        eventAdded: function(){
            this.$emit('eventAdded');
        }
    }
}
</script>