<template>
	<div class="family-review-single">
		<div class="card">
			<div class="card-body">
				<div v-if="temp_event.data">
					<h4>{{temp_event.data.family.husband_obj ? temp_event.data.family.husband_obj.name : ''}} {{temp_event.data.family.husband_obj && temp_event.data.family.wife_obj ? '+' : ''}} {{temp_event.data.family.wife_obj ? temp_event.data.family.wife_obj.name : ''}}</h4>
					<table class="table table-borderless w-auto">
						<tbody>
							<tr>
								<td><span>Tree:</span></td>
								<td colspan="2"><span>{{temp_event.data.gedcom}}</span></td>
							</tr>
							<tr>
								<td colspan="3">&nbsp;</td>
							</tr>
							<tr>
								<td><span><strong>Event:</strong></span></td>
								<td colspan="2"><span><strong>{{temp_event.data.eventID}}</strong></span></td>
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
								<td colspan="3"><input v-model="temp_event.data.eventdate" class="form-control form-control-sm" type="text"></td>
							</tr>
							<tr>
								<td>Event Place:</td>
								<td colspan="2"><span>{{eventplace}}</span></td>
							</tr>
							<tr>
								<td><strong>Suggested:</strong></td>
								<td><input class="form-control form-control-sm" v-model="temp_event.data.eventplace" type="text"></td>
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
								<td style="vertical-align: top;" colspan="2"><textarea class="form-control form-control-sm" cols="60" rows="4" v-model="temp_event.data.note">cxvx</textarea></td>
							</tr>
							<tr>
								<td colspan="3">&nbsp;</td>
							</tr>
							<tr>
								<td>Posted on:</td>
								<td colspan="2">{{temp_event.data.created_at}} ({{temp_event.data.user}})</td>
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
									<button @click.prevent="deleteIt(temp_event.data.id)" class="btn btn-sm btn-primary">Ignore and Delete</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selected: [],
			spinner: {
				save: {
					spinning: false,
				}
			}
		}
	},
	computed: {
		temp_event: function() {
			return {
				data: this.$store.getters['temp_event/data'].data.find(item => item.id == this.$route.params.id),
				loaded: this.$store.getters['temp_event/data'].loaded
			}
		},
		eventdate() {
			if (this.temp_event && this.temp_event.data) {
				if (this.temp_event.data.eventID == 'MARR') {
					return this.temp_event.data.family.marrdate
				}
				if (this.temp_event.data.eventID == 'SLGS') {
					return this.temp_event.data.family.sealdate
				}
				if (this.temp_event.data.eventID == 'DIV') {
					return this.temp_event.data.family.divdate
				}
			}
		},
		eventplace() {
			if (this.temp_event && this.temp_event.data) {
				if (this.temp_event.data.eventID == 'MARR') {
					return this.temp_event.data.family.marrplace
				}
				if (this.temp_event.data.eventID == 'SLGS') {
					return this.temp_event.data.family.sealplace
				}
				if (this.temp_event.data.eventID == 'DIV') {
					return this.temp_event.data.family.divplace
				}
			}
		},
	},
	methods: {
		save() {
			this.spinner.save.spinning = true;
			this.$store.dispatch('temp_event/save_delete', {
				...this.temp_event.data
			}).then(response => {
				this.spinner.save.spinning = false
				this.$router.push({
					name: 'family-review',
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
					this.spinner.delete.spinning = false
					this.$router.push({
						name: 'people-review',
						params: {
							messages: response.data[0] ? [response.data[0].message] : []
						}
					})
				})
			}
		}
	}
}
</script>