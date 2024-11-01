<template>
    <div class="export">
        <div class="card">
            <div class="card-body">
                <table class="table table-borderless w-auto">
                    <tbody>
                        <tr>
                            <td>Tree: </td>
                            <td>
                                <select name="tree" v-model="exportged.gedcom" class="custom-select custom-select-sm">
                                    <option value="">Select Tree</option>
                                    <option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Branch:</td>
                            <td>
                                <select name="branch" v-model="exportged.branch" class="custom-select custom-select-sm">
                                    <option value="">All Branches</option>
                                    <option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==exportged.gedcom">{{branch.branch}}</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" id="living" v-model="exportged.living" class="custom-control-input">
                    <label class="custom-control-label" for="living">Exclude living</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" id="private" v-model="exportged.private" class="custom-control-input">
                    <label class="custom-control-label" for="private">Exclude private</label>
                </div>
            </div>
        </div>
        <input type="submit" name="submit" class="btn btn-xl btn-primary mt-4" value="Export" @click.prevent="export_gedcom()">
    </div>
</template>
<script>
export default {
    data() {
        return {
            exportged: {
                gedcom: '',
                branch: '',
            },
            routeArg: {
                action: 'export_gedcom',
                security: wpGenealogy.nonce
            }
        }
    },
    computed: {
        trees: function() {
            return this.$store.getters['tree/data'];
        },
        branches: function() {
            return this.$store.getters['branch/data'];
        },
    },
    methods: {
        export_gedcom() {
            this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
                ...this.exportged,
                ...this.routeArg
            })).then(response => {
                window.location.href =response.data
                console.log(response)
            }).catch(error => {});
        }
    }
}
</script>