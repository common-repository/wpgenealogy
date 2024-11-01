<template>
	<div class="card-body people-child people-review">
		<div v-if="temp_event">
			<h4>{{temp_event.people ? temp_event.people.name : ''}}</h4>
			<table class="table table-borderless w-auto">
				<tbody>
					<tr>
						<td><span>Tree:</span></td>
						<td colspan="2"><span>{{temp_event.gedcom}}</span></td>
					</tr>
					<tr>
						<td colspan="3">&nbsp;</td>
					</tr>
					<tr>
						<td><span><strong>Event:</strong></span></td>
						<td colspan="2"><span><strong>{{temp_event.eventID}}</strong></span></td>
					</tr>
					<tr>
						<td colspan="3">&nbsp;</td>
					</tr>
					<tr>
						<td>Event Date: </td>
						<td colspan="2"><span>{{eventdate}}</span></td>
					</tr>
					<tr>
						<td><strong>Suggested:</strong></td>
						<td colspan="3"><input v-model="temp_event.eventdate" class="form-control form-control-sm" type="text"></td>
					</tr>
					<tr>
						<td>Event Place:</td>
						<td colspan="2"><span>{{eventplace}}</span></td>
					</tr>
					<tr>
						<td><strong>Suggested:</strong></td>
						<td><input class="form-control form-control-sm" v-model="temp_event.eventplace" type="text"></td>
						<td><a href="#" title="Find..." class="smallicon admin-find-icon"></a></td>
					</tr>
					<tr>
						<td>Detail:</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td style="vertical-align: top;"><strong>Suggested:</strong></td>
						<td colspan="3"><textarea class="form-control form-control-sm" cols="60" rows="4"></textarea></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td colspan="2">
							<a href="#" id="moreiconMARR" class="smallicon admin-more-off-icon"></a>
							<a href="#" id="notesiconMARR" class="smallicon admin-note-off-icon"></a>
							<a href="#" id="citesiconMARR" class="smallicon admin-cite-off-icon"></a>
						</td>
					</tr>
					<tr>
						<td colspan="3">&nbsp;</td>
					</tr>
					<tr>
						<td>Notes regarding<br>suggested change<br>(will not be saved):</td>
						<td style="vertical-align: top;" colspan="2"><textarea class="form-control form-control-sm" cols="60" rows="4" v-model="temp_event.note">cxvx</textarea></td>
					</tr>
					<tr>
						<td colspan="3">&nbsp;</td>
					</tr>
					<tr>
						<td>Posted on:</td>
						<td colspan="2">{{temp_event.created_at}} ({{temp_event.user}})</td>
					</tr>
					<tr>
						<td colspan="3">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="3">
							<button @click.prevent="save" class="btn btn-sm btn-primary">
								<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span> 
								Save and Delete
							</button>
							<button @click.prevent="postpone" class="btn btn-sm btn-primary">Postpone</button>
							<button @click.prevent="deleteIt(temp_event.id)" class="btn btn-sm btn-primary">Ignore and Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
	data() {
		return {
			selected: [],
			temp_event: {},
			spinner: {
				save: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
		}
	},
	mounted: function() {
		this.getData();
	},
	computed: {
		eventdate() {
			if (this.temp_event && this.temp_event) {
				if (this.temp_event.eventID == 'BIRT') {
					return this.temp_event.people.birthdate
				}
				if (this.temp_event.eventID == 'CHR') {
					return this.temp_event.people.altbirthdate
				}
				if (this.temp_event.eventID == 'DEAT') {
					return this.temp_event.people.deathdate
				}
				if (this.temp_event.eventID == 'BURI') {
					return this.temp_event.people.burialdate
				}
				if (this.temp_event.eventID == 'BAPL') {
					return this.temp_event.people.baptdate
				}
				if (this.temp_event.eventID == 'CONL') {
					return this.temp_event.people.confdate
				}
				if (this.temp_event.eventID == 'INIT') {
					return this.temp_event.people.initdate
				}
				if (this.temp_event.eventID == 'ENDL') {
					return this.temp_event.people.endldate
				}
			}
		},
		eventplace() {
			if (this.temp_event && this.temp_event) {
				if (this.temp_event.eventID == 'BIRT') {
					return this.temp_event.people.birthplace
				}
				if (this.temp_event.eventID == 'CHR') {
					return this.temp_event.people.altbirthplace
				}
				if (this.temp_event.eventID == 'DEAT') {
					return this.temp_event.people.deathplace
				}
				if (this.temp_event.eventID == 'BURI') {
					return this.temp_event.people.burialplace
				}
				if (this.temp_event.eventID == 'BAPL') {
					return this.temp_event.people.baptplace
				}
				if (this.temp_event.eventID == 'CONL') {
					return this.temp_event.people.confplace
				}
				if (this.temp_event.eventID == 'INIT') {
					return this.temp_event.people.initplace
				}
				if (this.temp_event.eventID == 'ENDL') {
					return this.temp_event.people.endlplace
				}
			}
		},
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'temp_event_get_alt',
				id: this.$route.params.id
			}
			axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => {
				this.temp_event = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		save() {
			this.spinner.save.spinning = true;
			this.$store.dispatch('temp_event/save_delete', {
				...this.temp_event
			}).then(response => {
				this.spinner.save.spinning = false;
				this.$router.push({
					name: 'people-review',
					params: {
						messages: response.data[0] ? [response.data[0].message] : []
					}
				})
			});
		},
		postpone() {
			this.$router.push({
				name: 'people-review',
				params: {}
			})
		},
		deleteIt: function(id) {
			if (confirm('Are you sure you want to delete this temp_event?')) {
				this.selected = [id]
				this.$store.dispatch('temp_event/delete', {
					selected: [id],
				}).then(response => {
					this.spinner.delete.spinning = false;
					this.$router.push({
						name: 'people-review',
						params: {
							messages: response.data[0] ? [response.data[0].message] : []
						}
					})
				});
			}
		},
	}
}
</script>