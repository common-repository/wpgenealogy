<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">
                    <strong>Add New Source</strong>
                </h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>Please prefix Source ID with "S" for "Source"</strong></p>
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><strong> Source ID:</strong></td>
                            <td class="p-0">
                                <table class="table table-borderless w-auto">
                                    <tr>
                                        <td>
                                            <input class="form-control form-control-sm w-auto" type="text" v-model="source.sourceID" size="10">
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-primary" type="button" @click.prevent="generate()"><span v-if="spinner.generate.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generate</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-primary" type="button" @click.prevent="check()"><span v-if="spinner.check.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Check</button>
                                            <span v-if="checked" class="badge" :class="source.sourceID ? 'badge-success' : 'badge-danger'"> {{source.sourceID ? 'Avalable' : 'Already Exist'}} </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td><strong> Short Title:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="source.shorttitle"></td>
                        </tr>
                        <tr>
                            <td><strong> Long Title:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="source.title"></td>
                        </tr>
                        <tr>
                            <td><strong> Author:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="source.author"></td>
                        </tr>
                        <tr>
                            <td><strong> Call Number:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="source.callnum"></td>
                        </tr>
                        <tr>
                            <td>Publisher:</td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="source.publisher"></td>
                        </tr>
                        <tr>
                            <td><strong> Repository:</strong></td>
                            <td>
                                <select v-model="source.repoID" class="form-control form-control-sm w-auto">
                                    <option value=""></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top"><strong> Actual Text:</strong></td>
                            <td><textarea class="form-control form-control-sm w-auto" v-model="source.actualtext"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <p><strong>Note: Additional events and notes may be added after the new source has been saved.</strong></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal"> Close </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['citationArgs'],
    data() {
        return {
            cid: '',
            source: {
                type: 'sourceID',
                gedcom: '',
                sourceID: '',
                callnum: '',
                title: '',
                author: '',
                publisher: '',
                shorttitle: '',
                actualtext: '',
                repoID: '',
            },
            checked: false,
            spinner: {
                save: {
                    spinning: false,
                },
                generate: {
                    spinning: false,
                },
                check: {
                    spinning: false,
                }
            }
        }
    },
    mounted() {
        this.cid = this._uid
    },
    methods: {
        generate: function() {
            this.checked = false;
            this.spinner.generate.spinning = true;
            this.$store.dispatch('generate', this.source).then(response => {
                this.spinner.generate.spinning = false;
                this.source.sourceID = response.data
            }).catch(error => {});
        },
        check: function() {
            this.spinner.check.spinning = true;
            this.$store.dispatch('check', this.source).then(response => {
                this.checked = true;
                this.spinner.check.spinning = false;
                if (response.data) {
                    this.source.sourceID = ''
                }
            }).catch(error => {});
        },
        add() {
            this.spinner.save.spinning = true
            this.$store.dispatch('source/add', {
                ...this.source,
                ...this.citationArgs
            }).then(response => {
                this.spinner.save.spinning = false
                this.$emit('sourceAdded', response.data[0].source);
            }).catch(error => {});
        },
    }
}
</script>