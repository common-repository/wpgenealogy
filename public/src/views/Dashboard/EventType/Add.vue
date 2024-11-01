<template>
	<div class="event-type-add">

		<div class="card mb-4">
			<div class="card-body">
		<message :messages="messages" />
				
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>Associated with:</td>
							<td>
								<select v-model="event_type.type" class="form-control form-control-sm">
									<option value="I">Individual</option>
									<option value="F">Family</option>
									<option value="S">Source</option>
									<option value="R">Repository</option>
								</select>
							</td>
						</tr>

						<tr>
							<td>Enter Tag Name: </td>
							<td>
								<input class="form-control form-control-sm" type="text" v-model="event_type.tag"> 
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
			</div>
		</div>
		<button @click.prevent="add" class="btn btn-primary primary2">
			<span v-if="spinner.add.spinning" class="spinner-border spinner-border-sm"></span> Save </button>
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
			spinner: {
				add: {
					spinning: false,
				}
			},
			event_type_new: {},
			event_type_data: [
				{
					tag: 'EVEN',
					display: 'Event'
				},
				{
					tag: 'ADOP',
					display: 'Adopted'
				},
				{
					tag: 'ADDR',
					display: 'Address'
				},
				{
					tag: 'ALIA',
					display: 'Also Known As'
				},
				{
					tag: 'ANCI',
					display: 'Ancestor Interest'
				},
				{
					tag: 'BARM',
					display: 'Barmitzvah'
				},
				{
					tag: 'BASM',
					display: 'Basmitzvah'
				},
				{
					tag: 'CAST',
					display: 'Caste'
				},
				{
					tag: 'CENS',
					display: 'Census'
				},
				{
					tag: 'CHRA',
					display: 'Adult Christening'
				},
				{
					tag: 'CONF',
					display: 'Confirmation'
				},
				{
					tag: 'CREM',
					display: 'Cremated'
				},
				{
					tag: 'DESI',
					display: 'Descendant Interest'
				},
				{
					tag: 'DSCR',
					display: 'Physical Description'
				},
				{
					tag: 'EDUC',
					display: 'Education'
				},
				{
					tag: 'EMIG',
					display: 'Emigration'
				},
				{
					tag: 'FCOM',
					display: 'First Communion'
				},
				{
					tag: 'GRAD',
					display: 'Graduation'
				},
				{
					tag: 'IDNO',
					display: 'National ID Number'
				},
				{
					tag: 'IMMI',
					display: 'Immigration'
				},
				{
					tag: 'LANG',
					display: 'Language'
				},
				{
					tag: 'NATI',
					display: 'Nationality'
				},
				{
					tag: 'NATU',
					display: 'Naturalization'
				},
				{
					tag: 'NCHI',
					display: 'Count of Children'
				},
				{
					tag: 'NMR',
					display: 'Count of Marriages'
				},
				{
					tag: 'OCCU',
					display: 'Occupation'
				},
				{
					tag: 'ORDI',
					display: 'Ordinance'
				},
				{
					tag: 'ORDN',
					display: 'Ordained'
				},
				{
					tag: 'PHON',
					display: 'Phone'
				},
				{
					tag: 'PROB',
					display: 'Probate'
				},
				{
					tag: 'PROP',
					display: 'Possessions'
				},
				{
					tag: 'REFN',
					display: 'Reference Number'
				},
				{
					tag: 'RELI',
					display: 'Religion'
				},
				{
					tag: 'RESI',
					display: 'Residence'
				},
				{
					tag: 'RESN',
					display: 'Restriction Notice'
				},
				{
					tag: 'RETI',
					display: 'Retired'
				},
				{
					tag: 'RFN',
					display: 'Permanent Record Number'
				},
				{
					tag: 'RIN',
					display: 'Record ID Number'
				},
				{
					tag: 'SSN',
					display: 'Social Security Number'
				},
				{
					tag: 'WILL',
					display: 'Will'
				},
			],
			event_type: {
				tag: '',
				description: '',
				display: '',
				keep: '',
				collapse: '',
				ordernum: '',
				ldsevent: '',
				type: '',
			}
		}
	},
	watch: {
		'event_type_new.tag': function(newValue, oldValue) {
			var base = this;
			this.event_type_data.push({
				tag: base.event_type_new.tag,
				display: base.event_type.display,
			})
			this.event_type.tag = this.event_type_new.tag;
		},
		'event_type.display': function(newValue, oldValue) {
			var base = this;
			if(this.event_type.tag) {
				var even = this.event_type_data.find(function(ev){
					if(ev.tag == base.event_type.tag) {
						ev.display =  base.event_type.display
					}
				})
			}
		},
		'event_type.tag': function(newValue, oldValue) {
			var base = this;
			var display = this.event_type_data.find(function(ev){
				if(ev.tag == base.event_type.tag) {
					return ev;
				}
			})
			this.event_type.display = display.display;
		}
	},
	methods: {
		add: function() {
			this.spinner.add.spinning = true
			const data = this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.event_type,
				...{
					action: 'event_type_add'
				}
			})).then(response => {
				this.spinner.add.spinning = false
				this.messages = response.data.messages ? response.data.messages : []
				if (response.data.eventtype && response.data.eventtype.id) {
					this.$router.push({
						name: 'dashboard-event-type-search',
						params: {
							messages: response.data ? response.data.messages : []
						}
					})
				}

			}).catch(error => {})
		},
	}
}
</script>