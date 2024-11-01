<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Event</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				
				<div class="add-new-enent-model">
					<table class="table table-borderless w-100">
						<tbody>
							<tr>
								<td width="160" valign="top"><span class="normal">Event Type:</span></td>
								<td>
									<span class="normal">
										<select v-model="event.eventtypeID" id="eventtypeID" class="form-control form-control-sm w-auto">
											<option value="">Event Type</option>
											<option v-for="event_type in event_types.data" :value="event_type.tag">{{event_type.display}}</option>
										</select>
									</span>
								</td>
							</tr>
							<tr>
								<td>Event Date:</td>
								<td class="p-0">
									<table class="table table-borderless w-auto mb-0">
										<tr>
											<td><input class="form-control form-control-sm w-auto" type="text" v-model="event.eventdate"></td>
											<td><span class=" normal">(DD MMM YYYY):</span></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>Event Place:</td>
								<td class="p-0" valign="top">
									<table class="table table-borderless w-auto mb-0">
										<tbody>
											<tr>
												<td>
													<input class="form-control form-control-sm w-auto" type="text" v-model="aditional_data.eventplace">
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
									<textarea class="form-control form-control-sm w-auto" v-model="event.info"></textarea>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<strong>Duplicate for:</strong>
								</td>
							</tr>
							<tr>
								<td>ID:</td>
								<td class="p-0">
									<table class="table table-borderless w-auto mb-0" cellpadding="0">
										<tbody>
											<tr>
												<td><input class="form-control form-control-sm w-auto" type="text" v-model="aditional_data.dupID"></td>
												<td> OR </td>
												<td><a href="#" @click.prevent="findPeople" title="Find..." class="smallicon admin-find-icon"></a></td>
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
										<input v-model="moreActive" type="checkbox" class="custom-control-input" :id="cid+'-moreActive'">
										<label class="custom-control-label" :for="cid+'-moreActive'">More</label>
									</div>
								</td>
								<td></td>
							</tr>
							<template v-if="moreActive">
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
								<tr>
									<td>Address 1:</td>
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
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['eventArgs', 'aditional_data'],
	mounted: function() {
		this.$store.dispatch('event_type/get', this.$data);
	},
	data() {
		return {
			cid: '',
			moreActive: false,
			spinner: {
				save: {
					spinning: false,
				}
			},
			event: {
				gedcom: '',
				persfamID: '',
				eventtypeID: '',
				eventdate: '',
				eventplace: '',
				info: '',
				age: '',
				agency: '',
				cause: '',
				addressID: '',
				address: {
					gedcom: '',
					address1: '',
					address2: '',
					city: '',
					state: '',
					zip: '',
					country: '',
					www: '',
					email: '',
					phone: '',
				}
			}
		}
	},
	mounted() {
		this.cid = this._uid
	},
	computed: {
		event_types: function() {
			if (this.type == 'people') {
				return this.$store.getters['event_type/data'];
			}
			if (this.type == 'family') {
				return this.$store.getters['event_type/data'];
			}
			return this.$store.getters['event_type/data'];
		},
	},
	methods: {
		add: function() {
			if (!this.event.eventtypeID) {
				alert('Please select Event Type.');
				return
			}
			this.spinner.save.spinning = true;
			this.$store.dispatch('event/add', {
				...this.$data.event,
				...this.eventArgs,
				...this.aditional_data
			}).then(response => {
				this.event = {
					gedcom: this.eventArgs.gedcom,
					eventtypeID: '',
					address: {}
				}
				this.spinner.save.spinning = false;
				this.$emit('eventAdded', response.data);
			}).catch(error => {});;
		},
		findPeople: function() {
			this.$emit('findPeople');
		},
		findPlace: function() {
			this.$emit('findPlace');
		}
	}
}
</script>