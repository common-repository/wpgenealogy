<template>
    <div class="family-edit-event-place-find">
        <div class="modal" id="family-edit-event-place-find">
            <place-find :gedcom="gedcom" :lds="lds" @placeFound="placeFound"/>
        </div>
    </div>
</template>
<script>
import placeFind from '@/components/dashboard/modals/components/place/Find.vue'
export default {
    props: ['gedcom', 'lds'],
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