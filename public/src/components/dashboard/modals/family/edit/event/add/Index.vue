<template>
    <div class="family-edit-event-add">
        <div class="modal" id="family-edit-event-add">
            <event-add :eventArgs="eventArgs" :aditional_data="aditional_data" @eventAdded="eventAdded" @findPeople="findPeople" @findPlace="findPlace"/>
        </div>
        <place-find :findPlaceArgs="eventArgs" @placeFound="placeFound" />
        <people-find :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
    </div>
</template>
<script>
import eventAdd from '@/components/dashboard/modals/components/event/Add.vue';
import placeFind from './place/Find.vue';
import peopleFind from './people/Find.vue';
export default {
    components: {
        'event-add': eventAdd,
        'place-find': placeFind,
        'people-find': peopleFind,
    },
    props: ['eventArgs'],
    mounted: function() {
        this.$store.dispatch('event_type/get', this.$data);
    },
    data() {
        return {
            aditional_data: {
                dupID: '',
                eventplace: '',
            },
            modalProps: {
                findPeopleArgs: {}

            }
        }
    },
    methods: {
        findPeople: function() {
            this.modalProps.findPeopleArgs = this.eventArgs
            jQuery('#family-edit-event-add-people-find').modal('show')
        },
        findPlace: function() {
            jQuery('#family-edit-event-add-place-find').modal('show')
        },
        peopleFound: function(people) {
            jQuery('#family-edit-event-add-people-find').modal('hide')
            this.aditional_data.dupID = people.personID
        },
        placeFound(place) {
            jQuery('#family-edit-event-add-place-find').modal('hide')
            this.aditional_data.eventplace = place.place
        },
        eventAdded: function(data) {
            this.$emit('eventAdded', data);
        }
    }
}
</script>