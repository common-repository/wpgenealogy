<template>
    <div class="family-edit-event-note">
        <div class="modal" id="family-edit-event-note">
            <note :noteArgs="noteArgs" :noteNew="noteNew" @addNote="addNote" @editNote="editNote" @citation="citation" />
        </div>
        <note-edit :noteArgs="noteArgs" :note_link="note_link" @noteUpdated="noteUpdated" />
        <note-add :noteArgs="noteArgs" @noteAdded="noteAdded" />
        <citation :citationArgs="citationArgs" />
    </div>
</template>
<script>
import note from '@/components/dashboard/modals/components/note/Index.vue';
import noteAdd from './Add.vue';
import noteEdit from './Edit.vue';
import citation from './citation/Index.vue';
export default {
    components: {
        'note': note,
        'citation': citation,
        'note-add': noteAdd,
        'note-edit': noteEdit,
    },
    props: ['noteArgs'],
    data: function() {
        return {
            note_link: {},
            noteNew: {},
            citationArgs: {}
        }
    },
    methods: {
        addNote: function() {
            jQuery('#family-edit-event-note-add').modal('show')
        },
        noteAdded: function(data) {
            this.noteNew = data[0];
            jQuery('#family-edit-event-note-add').modal('hide')
        },
        editNote: function(note_link) {
            this.note_link = note_link;
            jQuery('#family-edit-event-note-edit').modal('show')
        },
        noteUpdated: function(note_link) {
            jQuery('#family-edit-event-note-edit').modal('hide')
        },
        citation: function(id) {
            this.citationArgs = {
                type: this.noteArgs.type,
                gedcom: this.noteArgs.gedcom,
                persfamID: this.noteArgs.persfamID,
                eventID: 'N' + id,
            }
            jQuery('#family-edit-event-note-citation').modal('show')
        },
    }
}
</script>