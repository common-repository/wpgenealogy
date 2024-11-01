<template>
    <div class="family-edit-event-more">
        <div class="modal" id="family-edit-event-more">
            <event-more :eventmoreArgs="eventmoreArgs" @addedORupdated="addedORupdated" />
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
        addedORupdated: function() {
            Query('#family-edit-event-more').modal('hide')
        }
    }
}
</script>