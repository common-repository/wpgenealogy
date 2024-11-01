<template>
	<div class="people-edit-event-add-place-find">
		<div class="modal" id="people-edit-event-add-place-find">
			<place-find :findPlaceArgs="findPlaceArgs" @placeFound="placeFound"/>
		</div>
	</div>
</template>
<script>
import placeFind from '@/components/dashboard/modals/components/place/Find.vue'
export default {
	props: ['findPlaceArgs'],
	components: {
		'place-find': placeFind
	},
	data() {
		return {
		}
	},
	methods:{
		placeFound: function(place) {
			this.$emit('placeFound', place);
		}
	}
}
</script>