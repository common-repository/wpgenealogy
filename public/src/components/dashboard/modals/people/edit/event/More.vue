<template>
    <div class="people-edit-event-more">
        <div class="modal" id="people-edit-event-more">
            <event-more :eventmoreArgs="eventmoreArgs" @eventAddedOrUpdated="eventAddedOrUpdated" />
        </div>
    </div>
</template>
<script>
import eventMore from '@/components/dashboard/modals/components/event/More.vue'
export default {
    props: ['eventmoreArgs'],
    components: {
        'event-more': eventMore
    },
    data() {
        return {}
    },
    methods: {
        eventAddedOrUpdated: function() {
            this.$emit('eventAddedOrUpdated');
        }
    }
}
</script>