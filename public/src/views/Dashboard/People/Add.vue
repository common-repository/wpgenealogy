<template>
	<div>
		<h3 class="top-breadcrumb"><strong>People</strong><small> Add new person </small> </h3>
		<br>
		<message :messages="messages" />
		<div class="row">

			<div class="col-md-5">
				<div class="card mb-4 bg-primary text-white">
					<div class="card-body people-child people-add">

						<table class="table table-borderless mb-0">
							<tr>
								<td>
									<label>First  Name) </label>
									<input class="form-control form-control-sm" type="text" v-model="people.firstname">
								</td>
								<td>&nbsp;</td>
								<td>
									<label>Last Name </label>
									<input class="form-control form-control-sm" type="text" v-model="people.lastname">
								</td>
							</tr>
							<tr>
								<td>
									<label>Nickname</label>
									<input class="form-control form-control-sm" type="text" v-model="people.nickname">
								</td>
								<td>&nbsp;</td>
								<td><label>Title</label>
									<input class="form-control form-control-sm" type="text" v-model="people.title">
								</td>
							</tr>
							<tr>
								<td>
									<label>Gender</label>
									<select style="width: 100px;" v-model="people.sex" class="form-control form-control-sm w-100">
										<option value="">Gender</option>
										<option value="U">Unknown</option>
										<option value="M">Male</option>
										<option value="F">Female</option>
									</select>
								</td>
								<td>&nbsp;</td>
								<td>
									<label>Name Order</label>
									<select v-model="people.nameorder" class="form-control form-control-sm w-100">
										<option value="0">Default</option>
										<option value="1">First name first</option>
										<option value="2">Surname first (without commas)</option>
										<option value="3">Surname first (with commas)</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label>Suffix</label>
									<input class="form-control form-control-sm" type="text" v-model="people.suffix"> 
								</td>
								<td>&nbsp;</td>
								<td>
									<label>Prefix</label>
									<input class="form-control form-control-sm" type="text" v-model="people.prefix"> 
								</td>
							</tr>
							<tr>

								<td colspan="3">
									<div class="d-flex" style="margin-top: 15px !important;">

							
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="Living" value="1" v-model="people.living">
										<label class="custom-control-label" for="Living">Living</label>
									</div>
								
									<div class="custom-control custom-checkbox ml-4">
										<input type="checkbox" class="custom-control-input" id="Private" value="1" v-model="people.private">
										<label class="custom-control-label" for="Private">Private</label>
									</div>

									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="col-md-7">
				<div class="card mb-4 bg-primary-light">
					<div class="card-body people-child people-add-name">

						<table class="table table-borderless mb-0">
							<thead>
								<tr>
									<td colspan="2">
										<h4 style="font-size: 18px;">Please prefix Person ID with "I" for "Individual"</h4>
										<hr style="color: #7dac68;">
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colspan="2" width="160">
									<label>Tree:</label>
									</td>
								</tr>
								<tr>
									<td>
										<select v-model="people.gedcom" class="form-control">
											<option value="">Select Tree</option>
											<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
										</select>
									</td>
									<td> <button class="btn btn-sm btn-primary primary2 btn-block" type="button" @click.prevent="generate()"><span v-if="spinner.generate.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generate</button>
									</td>
								</tr>
								
								<tr>
									<td colspan="2" valign="top">
									<label>Person ID:</label>
									</td>
								</tr>
								<tr>
									<td>
										<input type="text" class="form-control" v-model="people.personID">
									</td>
									<td>
										<button class="btn btn-sm btn-primary primary2 btn-block" type="button" @click.prevent="lock()"><span v-if="spinner.lock.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Lock</button>
									</td>
								</tr>								
								<tr>
									<td colspan="2">
									<label>Branch:</label>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">
										<select v-model="people.branch" class="form-control" :disabled="!people.gedcom">
											<option value="">Select Branch</option>
											<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==people.gedcom">{{branch.branch}}</option>
										</select>
									</td>
									<td><button class="btn btn-sm btn-primary primary2 btn-block" type="button" @click.prevent="check()"><span v-if="spinner.check.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Check</button>
										<span v-if="checked" class="badge" :class="people.personID ? 'badge-success' : 'badge-danger'">
											{{people.personID ? 'Avalable' : 'Already Exist'}}
										</span>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-body people-child people-add">
				<h4>Events</h4>
				<hr>
				<p>
					<strong>Note:</strong> When entering dates, please use the standard genealogical format DD MMM YYYY. For , 10 Apr 2004.
				</p>
				<div class="row">
				</div>
				<table class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td></td>
							<td>Date</td>
							<td>Place</td>
							<td></td>
							<td></td>
							<template v-if="is_allow_lds">
								<td></td>
								<td>Date</td>
								<td>Place</td>
								<td></td>
							</template>
						</tr>
						<tr>
							<td>Birth</td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.birthdate"> </td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.birthplace"> </td>
							<td valign="middle">
								<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('birthplace')"></button>
							</td>
							<td></td>
							<template v-if="is_allow_lds">
								<td>Baptism (LDS)</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.baptdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.baptplace"> </td>
								<td> 
									<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('baptplace', 'lds')"></button>
								</td>
							</template>
						</tr>
						<tr>
							<td>Christening</td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.altbirthdate"> </td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.altbirthplace"> </td>
							<td>
								<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('altbirthplace')"></button>
								
							</td>
							<td></td>
							<template v-if="is_allow_lds">
								<td>Confirmation (LDS)</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.confdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.confplace"> </td>
								<td> 
									<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('confplace', 'lds')"></button>
								 </td>
							</template>
						</tr>
						<tr>
							<td>Death</td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.deathdate"> </td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.deathplace"> </td>
							<td>
								<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('deathplace')"></button>
								
							</td>
							<td></td>
							<template v-if="is_allow_lds">
								<td>Initiatory (LDS)</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.initdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.initplace"> </td>
								<td> 
									<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('initplace', 'lds')"></button>
									
								</td>
							</template>
						</tr>
						<tr>
							<td>Burial</td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.burialdate"> </td>
							<td> <input type="text" class="form-control form-control-sm" v-model="people.burialplace"> </td>
							<td>
								<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('burialplace')"></button>
								
							</td>
							<td></td>
							<template v-if="is_allow_lds">
								<td>Endowment (LDS)</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.endldate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.endlplace"> </td>
								<td> 
									<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('endlplace', 'lds')"></button>
								</td>
							</template>
						</tr>
						<tr>
							<td colspan="9">
								<br>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="Cremated" value="1" v-model="people.burialtype">
									<label class="custom-control-label" for="Cremated">Cremated</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<p class="mb-5 mt-4">
			<strong>Note:</strong> Additional events, plus event-specific notes and citations, may be added on the next screen.
		</p>
		<button class="btn btn-primary primary2" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save and continue...</button>
		<place-find :gedcom="people.gedcom" :lds="placeFindLds" @placeFound="placeFound" />
	</div>
</template>
<script>
import placeFind from '@/components/dashboard/modals/people/add/event/place/Find.vue';
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message,
		'place-find': placeFind,
	},
	data() {
		return {
			messages: [],

			spinner: {
				save: {
					spinning: false,
				},
				lock: {
					spinning: false,
				},
				generate: {
					spinning: false,
				},
				check: {
					spinning: false,
				}
			},
			people: {
				branch: '',
				gedcom: '',
				personID: '',
				lnprefix: '',
				lastname: '',
				firstname: '',
				birthdate: '',
				birthdatetr: '',
				sex: '',
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
				nameorder: '0',
				famc: '',
				metaphone: '',
				living: '',
				private: '',
				branch: '',
				changedby: '',
				edituser: '',
				edittime: '',
			},
			checked: false,
			placeFindFor: '',
			placeFindLds: false,
			plan: wpGenealogy.plan
		}
	},
	watch: {
		'people.personID': function (nVal, oVal) {
			if((nVal.length==1 && nVal!='I') || nVal.length==0) {
				this.people.personID = 'I'
			}
			if(nVal.length>1) {
				this.people.personID = 'I'+nVal.split('I')[1].replace(/\D/g, '');
			}
		}
	},
	mounted: function() {
		this.generate()
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		branches: function() {
			return this.$store.getters['branch/data'];
		},
		is_allow_lds() {
			console.log(wpGenealogy.user);
			if(wpGenealogy.addons.includes('WPGenealogy_Lds') && wpGenealogy.user && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta.allow_lds) {
				return true;
			} 
			return false;
		}
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
				if (response.data) {
					this.people.personID = ''
				}
			}).catch(error => {});
		},
		lock: function() {
			this.spinner.lock.spinning = true
			this.$store.dispatch('lock', {
				type: 'personID',
				personID: this.people.personID,
				gedcom: this.people.gedcom
			}).then(response => {
				this.spinner.lock.spinning = false
				if (response.data.people.personID) {
					this.$router.push({
						name: 'people-edit',
						params: {
							id: response.data.people.id
						}
					})
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
			this.spinner.save.spinning = true
			this.$store.dispatch('people/add', this.people).then(response => {
				this.messages = response.data.messages ? response.data.messages : []

				this.spinner.save.spinning = false
				if (response.data.people.id) {
					this.$router.push({
						name: 'people-edit',
						params: {
							id: response.data.people.id
						}
					})
				}
			}).catch(error => {});
		},
		findPlace: function(placeFor, lds = false) {
			this.placeFindFor = placeFor
			this.placeFindLds = lds
			jQuery('#people-add-event-place-find').modal('show')
		},
		placeFound: function(place) {
			if (this.placeFindFor == 'birthplace') {
				this.people.birthplace = place.place
			}
			if (this.placeFindFor == 'altbirthplace') {
				this.people.altbirthplace = place.place
			}
			if (this.placeFindFor == 'deathplace') {
				this.people.deathplace = place.place
			}
			if (this.placeFindFor == 'burialplace') {
				this.people.burialplace = place.place
			}
			if (this.placeFindFor == 'baptplace') {
				this.people.baptplace = place.place
			}
			if (this.placeFindFor == 'confplace') {
				this.people.confplace = place.place
			}
			if (this.placeFindFor == 'initplace') {
				this.people.initplace = place.place
			}
			if (this.placeFindFor == 'endlplace') {
				this.people.endlplace = place.place
			}
			jQuery('#people-add-event-place-find').modal('hide')

		}
	}
}
</script>