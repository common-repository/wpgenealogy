<template>
	<div class="people-edit-event-add">
		<div class="modal" id="people-edit-event-add">
			<event-add :eventArgs="eventArgs" :aditional_data="aditional_data" @eventAdded="eventAdded" @findPeople="findPeople" @findPlace="findPlace" />
		</div>
		<place-find :findPeopleArgs="modalProps.findPeopleArgs" :eventArgs="eventArgs" @placeFound="placeFound" />
		<people-find :eventArgs="eventArgs" @peopleFound="peopleFound" />
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
		'people-find': peopleFind
	},
	props: ['eventArgs'],
	mounted: function() {
		this.$store.dispatch('event_type/get', this.$data);
	},
	data() {
		return {
			aditional_data: {
				dupID: '',
				eventplace: ''
			},
            modalProps: {
                findPeopleArgs: {}
            }
		}
	},
	methods: {
		findPeople: function() {
            this.modalProps.findPeopleArgs = this.eventArgs

			jQuery('#people-edit-event-add-people-find').modal('show')
		},
		findPlace: function() {
			jQuery('#people-edit-event-add-place-find').modal('show')
		},
		peopleFound: function(people) {
			jQuery('#people-edit-event-add-people-find').modal('hide')
			this.aditional_data.dupID = people.personID
		},
		placeFound(place) {
			jQuery('#people-edit-event-add-place-find').modal('hide')
			this.aditional_data.eventplace = place.place
		},
		eventAdded: function(data){
			this.$emit('eventAdded', data);
		}
	}
}
</script>