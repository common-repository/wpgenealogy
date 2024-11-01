<template>
    <div class="family-edit-event-note-edit">
        <div class="modal" id="family-edit-event-note-edit">
            <note-edit :noteArgs="noteArgs" :note_link="note_link" @noteUpdated="noteUpdated" />
        </div>
    </div>
</template>
<script>
    import noteEdit from '@/components/dashboard/modals/components/note/Edit.vue'
    export default {
        props: ['noteArgs', 'note_link'],
        components: {
            'note-edit': noteEdit
        },
        data: function() {
            return {
            }
        },
        methods: {
            noteUpdated() {
                this.$emit('noteUpdated');
            }
        }
    }
</script>