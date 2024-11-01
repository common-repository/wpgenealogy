<template>
	<div class="family-add">
		<h3 class="top-breadcrumb"><strong>Family</strong><small> Add New Family </small> </h3>
		<br>
		<message :messages="messages" />
		<div class="card mb-4 bg-primary text-white">
			<div class="card-body family-child family-search">
				<table class="table table-borderless text-white mb-0 w-auto">
					<tr>
						<td>
							<strong>Tree:</strong>
						</td>
						<td>
							<strong>Branch:</strong>
						</td>
						<td width="150">
							<strong>Family ID:</strong>
						</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>
							<select v-model="family.gedcom" class="form-control">
								<option value="">Select Tree</option>
								<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
							</select>
						</td>
						<td>
							<select v-model="family.branch" class="form-control" :disabled="!family.gedcom">
								<option value="">Select Branch</option>
								<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==family.gedcom">{{branch.branch}}</option>
							</select>
						</td>
						<td>
							<input type="text" class="form-control" v-model="family.familyID">
						</td>
						<td width="10">
							<button class="btn btn-sm btn-primary btn-block primary2" @click.prevent="generate"> <span v-if="spinner.generate.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generate</button>
						</td>
						<td width="10">
							<button class="btn btn-sm btn-primary btn-block primary2" @click.prevent="lock"> <span v-if="spinner.lock.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Lock</button>
						</td>
						<td width="10">
							<button class="btn btn-sm btn-primary btn-block primary2" @click.prevent="check"> <span v-if="spinner.check.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Check </button>
						</td>
						<td width="10">
							<span v-if="checked" class="badge" :class="family.familyID ? 'badge-success' : 'badge-danger'">
								{{family.familyID ? 'Avalable' : 'Already Exist'}}
							</span>
						</td>
					</tr>
					<tr>
						<td colspan="7"><strong> Father: </strong></td>
					</tr>
					<tr>
						<td colspan="3">
							<input readonly="readonly" class="form-control" type="text" v-model="spouses.husband.name" placeholder="Click Find or Create =>">
							<input type="hidden" v-model="family.husband" placeholder="Click Find or Create =>">
						</td>
						<td width="10">
							<button type="button" class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-find" @click.prevent="findPeople('husband')"> Find </button>
						</td>
						<td width="10">
							<button class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-add" @click.prevent="addPeople('husband')"> Add </button>
						</td>
						<td width="10">
							<router-link :to="family.husband ? {name: 'people-edit', params: {id: spouses.husband.id}} : ''" class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-edit" :class="family.husband ? '' : 'disabled'"> Edit </router-link>
						</td>
						<td width="10">
							<button class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-unlink" @click.prevent="removeSpouse('husband')" :class="family.husband ? '' : 'disabled'">Unlink</button>
						</td>
					</tr>
					<tr>
						<td colspan="7"><strong> Mother: </strong></td>
					</tr>
					<tr>
						<td colspan="3">
							<input readonly="readonly" class="form-control" type="text" v-model="spouses.wife.name" placeholder="Click Find or Create =>">
							<input type="hidden" v-model="family.wife" placeholder="Click Find or Create =>">
						</td>
						<td width="10">
							<button type="button" class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-find" @click.prevent="findPeople('wife')"> Find </button>
						</td>
						<td width="10">
							<button class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-add" @click.prevent="addPeople('wife')"> Add </button>
						</td>
						<td width="10">
							<router-link :to="family.wife ? {name: 'people-edit', params: {id: spouses.wife.id}} : '' " class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-edit" :class="family.wife ? '' : 'disabled'"> Edit </router-link>
						</td>
						<td width="10">
							<button class="btn btn-block btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-unlink" @click.prevent="removeSpouse('husband')" :class="family.wife ? '' : 'disabled'">Unlink</button>
						</td>
					</tr>
					<tr>
						<td colspan="7">
							<div class="d-flex mt-3">
								<div class="custom-control custom-checkbox mr-4">
									<input type="checkbox" class="custom-control-input" id="Living" v-model="family.living" disabled>
									<label class="custom-control-label" for="Living">Living</label>
								</div>
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="Private" v-model="family.private">
									<label class="custom-control-label" for="Private">Private</label>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-body family-child family-search">
				<p>
					<strong> Note: </strong> When entering dates, please use the standard genealogical format DD MMM YYYY. For example , 10 Apr 2004.
				</p>
				<table class="table table-borderless w-auto mb-0">
					<tr>
						<td></td>
						<td>Date</td>
						<td>Place</td>
						<td></td>
					</tr>
					<tr>
						<td> Married: </td>
						<td>
							<input v-model="family.marrdate" type="text" class="form-control form-control-sm">
						</td>
						<td>
							<input v-model="family.marrplace" type="text" class="form-control form-control-sm">
						</td>
						<td>
							<a v-if="is_pro" href="#" @click.prevent="placeFind('marrplace')" title="Find..." class="smallicon admin-find-icon"></a>
						</td>
					</tr>
					<tr>
						<td> Marriage Type: </td>
						<td colspan="2">
							<input v-model="family.marrtype" type="text" class="form-control form-control-sm">
						</td>
						<td>
							<small><i>e.g. Civil, Church, Sealing only (LDS), Common Law, Not Married.</i></small>
						</td>
					</tr>
					<template v-if="is_allow_lds">
						<tr>
							<td> Sealed to Spouse (LDS): </td>
							<td>
								<input v-model="family.sealdate" type="text" class="form-control form-control-sm">
							</td>
							<td>
								<input v-model="family.sealplace" type="text" class="form-control form-control-sm">
							</td>
							<td>
								<a v-if="is_pro" href="#" @click.prevent="placeFind('sealplace', 'lds')" title="Find..." class="smallicon admin-temp-icon"></a>
							</td>
						</tr>
					</template>
					<tr>
						<td> Divorced: </td>
						<td>
							<input v-model="family.divdate" type="text" class="form-control form-control-sm">
						</td>
						<td>
							<input v-model="family.divplace" type="text" class="form-control form-control-sm">
						</td>
						<td>
							<a v-if="is_pro" href="#" @click.prevent="placeFind('divplace')" title="Find..." class="smallicon admin-find-icon"></a>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<p class="mb-5 mt-4">
			<strong>Note:</strong> Note: Children and additional events, plus event-specific notes and citations, may be added on the next screen.
		</p>
		<button class="btn btn-primary primary2" @click.prevent="add"> <span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save and continue...</button>
		<people-add :gedcom="family.gedcom" :branch="family.branch" @peopleAdded="peopleAdded" />
		<people-find @peopleFound="peopleFound" :findPeopleArgs="modalProps.findPeopleArgs" />
		<place-find :gedcom="family.gedcom" @placeFound="placeFound" />
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
import peopleFind from '@/components/dashboard/modals/family/add/people/Find.vue';
import peopleAdd from '@/components/dashboard/modals/family/add/people/Add.vue';
import placeFind from '@/components/dashboard/modals/family/add/event/place/Find.vue';
export default {
	components: {
		'people-find': peopleFind,
		'people-add': peopleAdd,
		'place-find': placeFind,
		'message': Message,
	},
	data() {
		return {
			plan: wpGenealogy.plan,
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
			find: '',
			family: {
				gedcom: '',
				familyID: '',
				husband: '',
				wife: '',
				marrdate: '',
				marrdatetr: '',
				marrplace: '',
				marrtype: '',
				divdate: '',
				divdatetr: '',
				divplace: '',
				status: '',
				sealdate: '',
				sealdatetr: '',
				sealplace: '',
				husborder: '',
				wifeorder: '',
				changedate: '',
				living: '',
				private: '',
				branch: '',
				childID: ''
			},
			spouses: {
				husband: {
					name: ''
				},
				wife: {
					name: ''
				},
			},
			checked: false,
			modalProps: {
				placeFind: {
					gedcom: '',
					placeFor: '',
					type: '',
				},
				findPeopleArgs: {}
			}
		}
	},
	watch: {
		'family.familyID': function(nVal, oVal) {
			if ((nVal.length == 1 && nVal != 'F') || nVal.length == 0) {
				this.family.familyID = 'F'
			}
			if (nVal.length > 1) {
				this.family.familyID = 'F' + nVal.split('F')[1].replace(/\D/g, '');
			}
		},
		'spouses.husband': function(nVal, oVal) {
			if(nVal.living || this.spouses.wife.living){
				this.family.living = true;
			} else {
				this.family.living = false;

			}

		},
		'spouses.wife': function(nVal, oVal) {
			if(nVal.living ||this.spouses.husband.living){
				this.family.living = true;
			} else {
				this.family.living = false;

			}
		}
	},
	mounted: function() {
		if (this.$route.params.spouse) {
			if (this.$route.params.sex == 'F') {
				this.getWife();
			}
			if (this.$route.params.sex == 'M' || !this.$route.params.sex) {
				this.getHusband();
			}
		}
		if (this.$route.params.child) {
			this.family.childID = this.$route.params.child
		}
		if (this.$route.params.gedcom) {
			this.family.gedcom = this.$route.params.gedcom
		}
		if (this.$route.params.branch) {
			this.family.branch = this.$route.params.branch
		}
		this.generate()
	},
	computed: {
		is_pro() {
			if (this.plan == 'premium') {
				return true
			} else {
				return false;
			}
		},
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		branches: function() {
			return this.$store.getters['branch/data'];
		},
		is_allow_lds() {
			console.log(wpGenealogy.user);
			if (wpGenealogy.user && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta.allow_lds) {
				return true;
			}
			return false;
		}
	},
	methods: {
		getWife: function() {
			const data = {
				action: 'get_people_by_id',
				id: this.$route.params.spouse,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.family.wife = response.data.personID
				this.spouses.wife = response.data
			}).catch(error => {});
		},
		getHusband: function() {
			const data = {
				action: 'get_people_by_id',
				id: this.$route.params.spouse,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.family.husband = response.data.personID
				this.spouses.husband = response.data
			}).catch(error => {});
		},
		generate: function() {
			this.checked = false;
			this.spinner.generate.spinning = true;
			this.$store.dispatch('generate', {
				type: 'familyID'
			}).then(response => {
				this.spinner.generate.spinning = false;
				this.family.familyID = response.data
			}).catch(error => {});
		},
		check: function() {
			this.spinner.check.spinning = true;
			this.$store.dispatch('check', {
				type: 'familyID',
				familyID: this.family.familyID,
				gedcom: this.family.gedcom
			}).then(response => {
				this.checked = true;
				this.spinner.check.spinning = false;
				if (!response.data) {
					this.family.familyID
				} else {
					this.family.familyID = ''
				}
			}).catch(error => {});
		},
		lock: function() {
			if (!this.family.gedcom) {
				alert('Please select a tree.');
				return
			}
			if (!this.family.branch) {
				alert('Please select a branch.');
				return
			}
			this.spinner.lock.spinning = true;
			this.$store.dispatch('family/lock', {
				type: 'familyID',
				familyID: this.family.familyID,
				gedcom: this.family.gedcom
			}).then(response => {
				this.spinner.lock.spinning = false;
				if (response.data.family.familyID) {
					this.$router.push({
						name: 'family-edit',
						params: {
							id: response.data.family.id
						}
					})
				}
			}).catch(error => {});
		},
		add: function() {
			if (!this.family.gedcom) {
				alert('Please select a tree.');
				return
			}
			if (!this.family.branch) {
				alert('Please select a branch.');
				return
			}
			this.spinner.save.spinning = true;
			this.$store.dispatch('family/add', this.family).then(response => {
				this.spinner.save.spinning = false;
				this.messages = response.data.message ? response.data.message : []
				if (response.data && response.data.family && response.data.family.id) {
					this.$router.push({
						name: 'family-edit',
						params: {
							id: response.data.family.id
						}
					})
				}
			}).catch(error => {});
		},
		addPeople: function(find) {
			this.find = find;
			jQuery('#family-add-people-add').modal('show')
		},
		findPeople: function(find) {
			this.find = find;
			this.modalProps.findPeopleArgs = {
				gedcom: this.family.gedcom
			}
			jQuery('#family-add-people-find').modal('show')
		},
		peopleFound: function(people) {
			if (this.find == 'wife') {
				this.family.wife = people.personID;
				this.spouses.wife = people;
			}
			if (this.find == 'husband') {
				this.family.husband = people.personID;
				this.spouses.husband = people;
			}
			jQuery('#family-add-people-find').modal('hide')
		},
		peopleAdded: function(people) {
			if (this.find == 'wife') {
				this.family.wife = people.personID;
				this.spouses.wife = people;
			}
			if (this.find == 'husband') {
				this.family.husband = people.personID;
				this.spouses.husband = people;
			}
			jQuery('#family-add-people-add').modal('hide')
		},
		removeSpouse: function(spouseType) {
			if (spouseType == 'wife') {
				this.family.wife = '';
				this.spouses.wife = {};
			}
			if (spouseType == 'husband') {
				this.family.husband = '';
				this.spouses.husband = {};
			}
		},
		placeFind: function(find) {
			this.find = find;
			jQuery('#family-add-event-place-find').modal('show')
		},
		placeFound: function(place) {
			if (this.find == 'marrplace') {
				this.family.marrplace = place.place
			}
			if (this.find == 'sealplace') {
				this.family.sealplace = place.place
			}
			if (this.find == 'divplace') {
				this.family.divplace = place.place
			}
			jQuery('#family-add-event-place-find').modal('hide')
		}
	}
}
</script>