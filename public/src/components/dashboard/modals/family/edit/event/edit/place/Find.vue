<template>
    <div class="family-edit-event-edit-place-find"">
        <div class="modal" id="family-edit-event-edit-place-find">
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