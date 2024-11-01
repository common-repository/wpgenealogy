<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Person</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="p-3 bg-light" style="border: 1px solid rgba(0, 0, 0, 0.125);">
                    <table class="table table-borderless w-auto">
                        <thead>
                            <tr>
                                <th colspan="5">Please prefix Person ID with "I" for "Individual"</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th valign="top">Person ID:</th>
                                <td>
                                    <input type="text" class="form-control form-control-sm" v-model="people.personID">
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary" type="button" @click.prevent="generate">
                                        <span v-if="spinner.generate.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generate </button>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary" type="button" @click.prevent="check">
                                        <span v-if="spinner.check.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Check </button>
                                    <span v-if="checked" class="badge" :class="people.personID ? 'badge-success' : 'badge-danger'">
                                        {{people.personID ? 'Avalable' : 'Already Exist'}}
                                    </span>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="Name" class="collapse show" aria-labelledby="NameHeader" data-parent="#accordionName">
                        <table class="table table-borderless w-auto">
                            <tr>
                                <td colspan="2"> First/Given Name(s) </td>
                                <td colspan="2"> Surname Prefix </td>
                                <td colspan="2">Last/Surname</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input class="form-control form-control-sm" type="text" v-model="people.firstname">
                                </td>
                                <td colspan="2">
                                    <input class="form-control form-control-sm" type="text" v-model="people.lnprefix">
                                </td>
                                <td colspan="2">
                                    <input class="form-control form-control-sm" type="text" v-model="people.lastname">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">Gender</td>
                                <td colspan="2">Nickname</td>
                                <td colspan="2">Title</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <select v-model="people.sex" class="form-control form-control-sm">
                                        <option value="U">Unknown</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </td>
                                <td colspan="2">
                                    <input class="form-control form-control-sm" type="text" v-model="people.nickname">
                                </td>
                                <td colspan="2">
                                    <input class="form-control form-control-sm" type="text" v-model="people.title">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">Prefix</td>
                                <td colspan="2">Suffix</td>
                                <td colspan="2">Name Order</td>
                            </tr>
                            <tr>
                                <td colspan="2"> <input class="form-control form-control-sm" type="text" v-model="people.prefix"> </td>
                                <td colspan="2"> <input class="form-control form-control-sm" type="text" v-model="people.suffix"> </td>
                                <td colspan="2" width="200">
                                    <select v-model="people.nameorder" class="form-control form-control-sm">
                                        <option value="0">Default</option>
                                        <option value="1">First name first</option>
                                        <option value="2">Surname first (without commas)</option>
                                        <option value="3">Surname first (with commas)</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="form-check form-group">
                                            <input class="form-check-input" type="checkbox" value="1" v-model="people.living" :id="cid+'-defaultCheck1'">
                                            <label class="form-check-label" :for="cid+'-defaultCheck1'"> Living </label>
                                        </div>
                                        <div class="form-check form-group">
                                            <input class="form-check-input" type="checkbox" value="1" v-model="people.private" :id="cid+'-defaultCheck1'">
                                            <label class="form-check-label" :for="cid+'-defaultCheck1'"> Private </label>
                                        </div>
                                    </div>
                                </td>
                                <th width="160" class="text-right">Tree:</th>
                                <td>
                                    <select v-model="people.gedcom" class="form-control form-control-sm">
                                        <option value="">Select Tree</option>
                                        <option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
                                    </select>
                                </td>
                                <th class="text-right">Branch:</th>
                                <td>
                                    <select v-model="people.branch" class="form-control form-control-sm" :disabled="!people.gedcom">
                                        <option>Select Branch</option>
                                        <option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==people.gedcom">{{branch.branch}}</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="Events" class="collapse show" aria-labelledby="EventsHeader" data-parent="#accordionEvents">
                        <p>
                            <strong>Note:</strong> When entering dates, please use the standard genealogical format DD MMM YYYY. For , 10 Apr 2004.
                        </p>
                        <table class="table table-borderless w-auto">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>Date</td>
                                    <td>Place</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Birth</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.birthdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.birthplace"> </td>
                                    <td valign="middle">
                                        <a href="#" class="smallicon admin-find-icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Christening</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.altbirthdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.altbirthplace"> </td>
                                    <td>
                                        <a href="#" class="smallicon admin-find-icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Death</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.deathdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.deathplace"> </td>
                                    <td>
                                        <a href="#" class="smallicon admin-find-icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Burial</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.burialdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.burialplace"> </td>
                                    <td>
                                        <a href="#" class="smallicon admin-find-icon"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="form-check form-group">
                                            <input class="form-check-input" type="checkbox" v-model="people.burialtype" :id="cid+'-defaultCheck1'">
                                            <label class="form-check-label" :for="cid+'-defaultCheck1'"> Cremated </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Baptism (LDS)</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.baptdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.baptplace"> </td>
                                    <td> <a href="#" class="admin-temp-icon smallicon"></a> </td>
                                </tr>
                                <tr>
                                    <td>Confirmation (LDS)</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.confdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.confplace"> </td>
                                    <td> <a href="#" class="admin-temp-icon smallicon"></a> </td>
                                </tr>
                                <tr>
                                    <td>Initiatory (LDS)</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.initdate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.initplace"> </td>
                                    <td> <a href="#" class="admin-temp-icon smallicon"></a> </td>
                                </tr>
                                <tr>
                                    <td>Endowment (LDS)</td>
                                    <td> <input type="date" class="form-control form-control-sm" v-model="people.endldate"> </td>
                                    <td> <input type="text" class="form-control form-control-sm" v-model="people.endlplace"> </td>
                                    <td> <a href="#" class="admin-temp-icon smallicon"></a> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>Note:</strong> Additional events, plus event-specific notes and citations, may be added on the next screen.
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Create</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['gedcom', 'branch', 'sex'],
    data() {
        return {
            cid: '',
            people: {
                personID: '',
                lnprefix: '',
                lastname: '',
                firstname: '',
                birthdate: '',
                birthdatetr: '',
                sex: this.sex,
                birthplace: '',
                deathdate: '',
                deathdatetr: '',
                deathplace: '',
                altbirthdate: '',
                altbirthdatetr: '',
                altbirthplace: '',
                burialdate: '',
                burialdatetr: '',
                burialplace: '',
                burialtype: '',
                baptdate: '',
                baptdatetr: '',
                baptplace: '',
                confdate: '',
                confdatetr: '',
                confplace: '',
                initdate: '',
                initdatetr: '',
                initplace: '',
                endldate: '',
                endldatetr: '',
                endlplace: '',
                changedate: '',
                nickname: '',
                title: '',
                prefix: '',
                suffix: '',
                nameorder: '',
                famc: '',
                metaphone: '',
                living: '',
                private: '',
                branch: this.branch,
                gedcom: this.gedcom,
                changedby: '',
                edituser: '',
                edittime: '',
            },
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
            },
            checked: false
        }
    },
    watch: {
        gedcom(value) {
            this.people.gedcom = value;
        },
        branch(value) {
            this.people.branch = value;
        },
        sex(value) {
            this.people.sex = value;
        },
        'people.personID': function (nVal, oVal) {
            if((nVal.length==1 && nVal!='I') || nVal.length==0) {
                this.people.personID = 'I'
            }

            if(nVal.length>1) {
                this.family.personID = 'I'+nVal.split('I')[1].replace(/\D/g, '');
            }

        }
    },
    mounted: function() {
        let component = this;
        jQuery('#family-add-people-add').on('shown.bs.modal', function() {
            component.generate()
        })
        this.cid = this._uid
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
        generate: function() {
            this.checked = false;
            this.spinner.generate.spinning = true;
            this.$store.dispatch('generate', {
                type: 'personID'
            }).then(response => {
                this.spinner.generate.spinning = false;
                this.people.personID = response.data
            }).catch(error => {});
        },
        check: function() {
            this.spinner.check.spinning = true;
            this.$store.dispatch('check', {
                type: 'personID',
                personID: this.people.personID,
                gedcom: this.people.gedcom
            }).then(response => {
                this.checked = true;
                this.spinner.check.spinning = false;
                if (!response.data) {
                    this.people.personID
                } else {
                    this.people.personID = ''
                }
            }).catch(error => {});
        },
        add: function() {
            if (!this.people.gedcom) {
                alert('Please select a tree.');
                return
            }
            if (!this.people.branch) {
                alert('Please select a branch.');
                return
            }
            if (!this.people.sex) {
                alert('Please select gender.');
                return
            }
            this.spinner.save.spinning = true;
            this.$store.dispatch('people/add', this.people).then(response => {
                if (response.data[0].people) {
                    this.spinner.save.spinning = false;
                    this.$emit('peopleAdded', response.data[0].people);
                    this.people = {}
                }
            }).catch(error => {});
        }
    }
}
</script>