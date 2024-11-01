<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Event</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" v-if="event">
                <div class="add-new-enent-model">
                    <table class="table table-borderless w-100">
                        <tbody>
                            <tr>
                                <td width="160" valign="top"><span class="normal">Event Type:</span></td>
                                <td>
                                    {{event.event_type ? event.event_type.display : ''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Event Date:</td>
                                <td class="p-0">
                                    <table class="table table-borderless w-auto mb-0">
                                        <tr>
                                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.eventdate"></td>
                                            <td> <span class="normal">(DD MMM YYYY):</span></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>Event Place:</td>
                                <td class="p-0" valign="top">
                                    <table class="table table-borderless w-auto mb-0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input class="form-control form-control-sm w-auto" type="text" v-model="event.eventplace">
                                                </td>
                                                <td> OR </td>
                                                <td><a href="#" @click.prevent="findPlace" title="Find..." class="smallicon admin-find-icon"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top">Detail:</td>
                                <td>
                                    <textarea class="form-control form-control-sm w-auto" v-model="event.info" rows="4" cols="40"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>Duplicate for:</strong></td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td class="p-0">
                                    <table class="table table-borderless w-auto mb-0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="aditional_data.dupID"></td>
                                                <td> OR </td>
                                                <td><a @click.prevent="findPeople" href="#" title="Find..." class="smallicon admin-find-icon"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>(Separate multiple entries with commas)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input v-model="moreActive2" type="checkbox" class="custom-control-input" :id="cid+'-moreActive2'">
                                        <label class="custom-control-label" :for="cid+'-moreActive2'">More</label>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <template>
                                <tr>
                                    <td>Age:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.age" maxlength="12"></td>
                                </tr>
                                <tr>
                                    <td>Agency:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.agency"></td>
                                </tr>
                                <tr>
                                    <td>Cause:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.cause"></td>
                                </tr>
                                <template v-if="event.address">
                                    <tr>
                                        <td>Address 1: {{event.address.address1}}</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.address1"></td>
                                    </tr>
                                    <tr>
                                        <td>Address 2:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.address2"></td>
                                    </tr>
                                    <tr>
                                        <td>City:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.city"></td>
                                    </tr>
                                    <tr>
                                        <td>State/Province:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.state"></td>
                                    </tr>
                                    <tr>
                                        <td>Zip/Postal Code:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.zip"></td>
                                    </tr>
                                    <tr>
                                        <td>Country:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.country"></td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.phone"></td>
                                    </tr>
                                    <tr>
                                        <td>E-mail:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.email"></td>
                                    </tr>
                                    <tr>
                                        <td>Web Site:</td>
                                        <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.www"></td>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="update">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['event', 'aditional_data'],
    data() {
        return {
            cid: '',
            moreActive2: false,
        }
    },
    mounted() {
        this.cid = this._uid
    },
    methods: {
        findPlace: function() {
            this.$emit('findPlace')
        },
        findPeople: function() {
            this.$emit('findPeople')
        },
        update: function() {
            this.$store.dispatch('event/update', {
                ...this.event,
                ...this.aditional_data
            }).then(response => {}).catch(error => {});
        }
    }
}
</script>