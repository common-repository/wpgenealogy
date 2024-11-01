<template>
    <div class="family-edit-event-note-add">
        <div class="modal" id="family-edit-event-note-add">
            <note-add :noteArgs="noteArgs" @noteAdded="noteAdded" />
        </div>
    </div>
</template>
<script>
    import noteAdd  from '@/components/dashboard/modals/components/note/Add.vue'
    export default {
        props: ['noteArgs'],
        components: {
            'note-add': noteAdd
        },
        methods: {
            noteAdded(data){
                this.$emit('noteAdded', data);
            }
        }
    }
</script>