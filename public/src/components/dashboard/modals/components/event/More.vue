<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">More Information: {{eventmoreArgs.type}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" v-if="event">
                <table class="table table-borderless w-auto">
                    <tbody>
                        <tr>
                            <td><strong>Age:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.age" size="12" maxlength="12" value=""></td>
                        </tr>
                        <tr>
                            <td><strong>Agency:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.agency" size="50" value=""></td>
                        </tr>
                        <tr>
                            <td><strong>Cause:</strong></td>
                            <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.cause" size="50" value=""></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h5>Address</h5>
                            </td>
                        </tr>
                        <template v-if="event.address">
                            <tr>
                                <td><strong>Address 1:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.address1" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>Address 2:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.address2" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>City:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.city" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>State/Province:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.state" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>Zip/Postal Code:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.zip" size="20" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>Country:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.country" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.phone" size="30" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>E-mail:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.email" size="50" value=""></td>
                            </tr>
                            <tr>
                                <td><strong>Web Site:</strong></td>
                                <td><input class="form-control form-control-sm w-auto" type="text" v-model="event.address.www" size="50" value=""></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="addOrUpdate"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['eventmoreArgs'],
    data() {
        return {
            cid: '',
            spinner: {
                save: {
                    spinning: false,
                },
            }
        }
    },
    mounted() {
        this.cid = this._uid
    },
    computed: {
        event: function() {
            let event = this.$store.getters['event/data'].data.find(event => event.parenttag == this.eventmoreArgs.parenttag && event.persfamID == this.eventmoreArgs.persfamID)
            if (!event) {
                event = {
                    age: '',
                    agency: '',
                    cause: '',
                }
            }
            event.address = this.$store.getters['address/data'].data.find(address => address.id == event.addressID)
            if (!event.address) {
                event.address = {
                    address2: '',
                    address1: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: '',
                    email: '',
                }
            }
            return event
        }
    },
    methods: {
        addOrUpdate: function() {
            this.spinner.save.spinning = true
            this.$store.dispatch('event/addOrUpdate', {
                ...this.event,
                ...this.eventmoreArgs
            }).then(response => {
                console.log(response)
                this.spinner.save.spinning = false
                this.$emit('eventAddedOrUpdated');
            }).catch(error => {});
        }
    }
}
</script>