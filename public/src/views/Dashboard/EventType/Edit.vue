<template>
	<div class="event-type-edit">
		<div class="card mb-4">
			<div class="card-body">
				<message :messages="messages" />

				<table v-if="event_type.id" class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Associated with:</td>
							<td>
								<select v-model="event_type.type" class="form-control form-control-sm" name="type">
									<option value="I">Individual</option>
									<option value="F">Family</option>
									<option value="S">Source</option>
									<option value="R">Repository</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Select Tag:</td>
							<td>
								<select v-model="event_type.tag" class="form-control form-control-sm" name="tag1">
								


									<option value=""></option>




									<option value="EVEN">EVEN - Event</option>
									<option value="ADOP">ADOP - Adopted</option>
									<option value="ADDR">ADDR - Address</option>
									<option value="ALIA">ALIA - Also Known As</option>
									<option value="ANCI">ANCI - Ancestor Interest</option>
									<option value="BARM">BARM - Barmitzvah</option>
									<option value="BASM">BASM - Basmitzvah</option>
									<option value="CAST">CAST - Caste</option>
									<option value="CENS">CENS - Census</option>
									<option value="CHRA">CHRA - Adult Christening</option>
									<option value="CONF">CONF - Confirmation</option>
									<option value="CREM">CREM - Cremated</option>
									<option value="DESI">DESI - Descendant Interest</option>
									<option value="DSCR">DSCR - Physical Description</option>
									<option value="EDUC">EDUC - Education</option>
									<option value="EMIG">EMIG - Emigration</option>
									<option value="FCOM">FCOM - First Communion</option>
									<option value="GRAD">GRAD - Graduation</option>
									<option value="IDNO">IDNO - National ID Number</option>
									<option value="IMMI">IMMI - Immigration</option>
									<option value="LANG">LANG - Language</option>
									<option value="NATI">NATI - Nationality</option>
									<option value="NATU">NATU - Naturalization</option>
									<option value="NCHI">NCHI - Count of Children</option>
									<option value="NMR">NMR - Count of Marriages</option>
									<option value="OCCU">OCCU - Occupation</option>
									<option value="ORDI">ORDI - Ordinance</option>
									<option value="ORDN">ORDN - Ordained</option>
									<option value="PHON">PHON - Phone</option>
									<option value="PROB">PROB - Probate</option>
									<option value="PROP">PROP - Possessions</option>
									<option value="REFN">REFN - Reference Number</option>
									<option value="RELI">RELI - Religion</option>
									<option value="RESI">RESI - Residence</option>
									<option value="RESN">RESN - Restriction Notice</option>
									<option value="RETI">RETI - Retired</option>
									<option value="RFN">RFN - Permanent Record Number</option>
									<option value="RIN">RIN - Record ID Number</option>
									<option value="SSN">SSN - Social Security Number</option>
									<option value="WILL">WILL - Will</option>
									<option value="ANUL">ANUL - Annulled</option>
									<option value="DIV">DIV - Divorced</option>
									<option value="DIVF">DIVF - Divorce Filed</option>
									<option value="ENGA">ENGA - Engaged</option>
									<option value="MARB">MARB - Marriage Banns</option>
									<option value="MARC">MARC - Marriage Contract</option>
									<option value="MARR">MARR - Married</option>
									<option value="MARL">MARL - Marriage License</option>
									<option value="MARS">MARS - Marriage Settlement</option>






 
 





								</select>
							</td>
						</tr>
						<tr>
							<td>or enter: </td>
							<td>
								<input class="form-control form-control-sm" type="text" v-model="tag_new.tag"> 
								(will take precedence if both fields contain data)
							</td>
						</tr>
						<tr id="tdesc">
							<td>Type/Description*:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="event_type.description"></td>
						</tr>
						<tr id="displaytr">
							<td>Display:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="event_type.display"></td>
						</tr>
						<tr>
							<td>Display Order:</td>
							<td><input class="form-control form-control-sm" type="text" v-model="event_type.ordernum"></td>
						</tr>
						<tr>
							<td>Event Data:</td>
							<td>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="keep-1" class="custom-control-input" value="1" v-model="event_type.keep">
									<label class="custom-control-label" for="keep-1">Yes</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="keep-0" class="custom-control-input" checked v-model="event_type.keep">
									<label class="custom-control-label" for="keep-0">No</label>
								</div>
							</td>
						</tr>
						<tr>
							<td>Collapse Event:</td>
							<td>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="collapse-1" class="custom-control-input" value="1" v-model="event_type.collapse">
									<label class="custom-control-label" for="collapse-1">Yes</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="collapse-0" class="custom-control-input" checked v-model="event_type.collapse">
									<label class="custom-control-label" for="collapse-0">No</label>
								</div>
							</td>
						</tr>
						<tr>
							<td>LDS Event:</td>
							<td>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="ldsevent-1" name="ldsevent-1" class="custom-control-input" value="1" v-model="event_type.ldsevent">
									<label class="custom-control-label" for="ldsevent-1">Yes</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="ldsevent-0" class="custom-control-input" checked v-model="event_type.ldsevent">
									<label class="custom-control-label" for="ldsevent-0">No</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div v-if="spinner.loading.spinning">
					<button class="btn btn-link" type="button">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span> Loading... </span>
					</button>
				</div>
			</div>
		</div>
		<button @click.prevent="update" class="btn btn-primary primary2" >
			<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm"></span> 
			Save
		</button>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message,
	},
	data() {
			return {
				messages: [],
				event_type: {},
				tag_new: {},
				spinner: {
					loading: {
						spinning: true
					},
					update: {
						spinning: false
					}
				}
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData: function() {
				this.spinner.loading.spinning = true
				
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'event_type_get_alt',
					id: this.$route.params.id
				})).then(response => {
					this.event_type = response.data
					this.spinner.loading.spinning = false
				}).catch(error => {})
			},
			update: function() {
				this.spinner.update.spinning = true
		
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({...{
					action: 'event_type_update'
				}, ...this.event_type, ...this.tag_new})).then(response => {
					this.spinner.update.spinning = false
					this.messages = response.data.messages
				}).catch(error => {})
			},
		}
	}
</script>