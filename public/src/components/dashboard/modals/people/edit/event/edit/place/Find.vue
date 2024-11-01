<template>
    <div class="people-edit-event-edit-place-find"">
        <div class="modal" id="people-edit-event-edit-place-find">
            <place-find :gedcom="gedcom" @placeFound="placeFound"/>
        </div>
    </div>
</template>
<script>
import placeFind from '@/components/dashboard/modals/components/place/Find.vue'
export default {
    props: ['gedcom'],
    components: {
        'place-find': placeFind
    },
    data() {
        return { }
    },
    methods:{
        placeFound: function(place) {
            this.$emit('placeFound', place);
        }
    }
}
</script>