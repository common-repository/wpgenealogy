<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Citation</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table v-if="citation" border="0" cellpadding="2" class="table table-borderless ">
                    <tbody>
                        <tr>
                            <th>Source ID:</th>
                            <td class="p-0">
                                <table class="table table-borderless w-auto mb-0">
                                    <tr>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="citation.sourceID" size="20"></td>
                                        <td><input class="btn btn-primary btn-sm" type="button" @click.prevent="findSource" value="Find..."></td>
                                        <td>OR</td>
                                        <td><input class="btn btn-primary btn-sm" type="button" @click.prevent="addSource" value="Create..."></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td id="sourceTitle"></td>
                        </tr>
                        <tr>
                            <th>Page:</th>
                            <td><input class="form-control form-control-sm w-auto" v-model="citation.page" type="text"></td>
                        </tr>
                        <tr>
                            <th>Reliability:</th>
                            <td class="p-0">
                                <table class="table table-borderless w-auto mb-0">
                                    <tr>
                                        <td>
                                            <select class="form-control form-control-sm w-auto" name="quay" id="quay" v-model="citation.quay">
                                                <option value="">Reliability</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </td>
                                        <td>(Higher numbers indicate greater reliability.)</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th>Citation Date:</th>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="citation.citedate"></td>
                        </tr>
                        <tr>
                            <th>Actual Text:</th>
                            <td><textarea class="form-control form-control-sm w-auto" v-model="citation.citetext"></textarea></td>
                        </tr>
                        <tr>
                            <th>Notes:</th>
                            <td><textarea class="form-control form-control-sm w-auto" v-model="citation.note"></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="update">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['citationArgs', 'citation'],
    data() {
        return {
            cid: '',
        }
    },
    mounted() {
        this.cid = this._uid
    },
    methods: {
        addSource() {
            this.$emit('addSource');
        },
        findSource() {
            this.$emit('findSource');
        },
        update() {
            this.$store.dispatch('citation/update', {
                ...this.citation,
                ...this.citationArgs,
            }).then(response => {
                this.$emit('citationUpdated');
            }).catch(error => {});
        },
    }
}
</script>