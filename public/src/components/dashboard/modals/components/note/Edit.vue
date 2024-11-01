<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Note: {{noteArgs.type}} </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table border="0" cellpadding="2" class="normal" v-if="note_link">
                    <tbody>
                        <tr>
                            <td valign="top">Note:</td>
                            <td>
                                <textarea class="form-control form-control-sm" wrap="" cols="60" rows="12" v-if="note_link.note" v-model="note_link.note.note"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><input type="checkbox" v-model="note_link.secret" value="1"> Private</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="update"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Save </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['noteArgs', 'note_link'],
    data: function() {
        return {
            cid: '',
            spinner: {
                save: {
                    spinning: false,
                }
            },
        }
    },
    mounted() {
        this.cid = this._uid
    },
    methods: {
        update() {
            this.spinner.save.spinning = true;
            this.$store.dispatch('note/update', {
                ...this.note_link,
                ...this.noteArgs
            }).then(response => {
                this.spinner.save.spinning = false;
                this.$emit('noteUpdated');
            }).catch(error => {});
        }
    }
}
</script>