<template>
	<div class="family-edit">
		<h3 class="top-breadcrumb"><strong>Family</strong><small> Edit Existing Family </small> </h3>
		<br>
		<message :messages="messages" />
		<div v-if="spinner.loading.spinning">
			<button class="btn btn-link" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading... </span>
			</button>
		</div>
		<div v-if="family.id">
			<table class="table table-borderless mb-0">
				<tr>
					<td style="vertical-align: top;">
						<h5>{{family.husbObj ? family.husbObj.name : ''}} </h5>
						<p class="text-muted small">
							{{family.wifeObj ? family.wifeObj.name : ''}} ({{family.familyID}})
						</p>
					</td>
					<td style="vertical-align: top;">
						<a href="#" @click.prevent="update()" class="btn btn-sm btn-icon btn-icon-left btn-icon-saves  btn-outline-primary">Save</a>
						<a v-if="is_pro" href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-left btn-icon-notes btn-outline-primary">Notes</a>
						<a v-if="is_pro && 1==2" href="#" @click.prevent="eventCitation('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-left btn-icon-sources btn-outline-primary">Sources</a>
						<a v-if="is_pro" href="#" @click.prevent="association()" class="btn btn-sm btn-icon btn-icon-left btn-icon-associations btn-outline-primary">Associations</a>
					</td>
					<td style="vertical-align: top; text-align: right;">
						<router-link :to="{name: 'family-chart', params: {id: family.id}}" title="Test" class="btn btn-sm btn-outline-success">Test</router-link>
						<!-- <a href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-primary"> + Media</a>
						<a href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-help btn-icon-left no-bg" style="padding-right: 0;min-width: 20px;padding-left: 31px;"></a>
						 --><p class="text-muted small mt-2">
							<small>Last Modified: {{family.updated_at}}</small>
						</p>
					</td>
				</tr>
			</table>
			<br>
		</div>
		<div v-if="family.id">
			<div class="card mb-4 bg-primary text-white">
				<div class="card-body">
					<h4>Spouses / Partners</h4>
					<hr>
					<table class="table table-borderless text-white mb-0">
						<tr>
							<td colspan="5">Father:</td>
						</tr>
						<tr>
							<td>
								<input v-if="family.husbObj" type="text" readonly="readonly" class="form-control" v-model="family.husbObj.name" placeholder="Click Find or Create =>">
								<input v-else type="text" readonly="readonly" class="form-control" v-model="family.husband" placeholder="Click Find or Create =>">
							</td>
							<td width="10">
								<button type="button" class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-find" @click.prevent="findPeople('husband')"> Find </button>
							</td>
							<td width="10">
								<button class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-add" @click.prevent="addPeople('husband')"> Add </button>
							</td>
							<td width="10">
								<router-link :to="{name: 'people-edit', params: {id: family.husbObj ? family.husbObj.id : ''}}" class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-edit" :class="family.husbObj ? '' : 'disabled'"> Edit </router-link>
							</td>
							<td width="10">
								<button class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-unlink" @click.prevent="removeSpouse('husband')" :class="family.husbObj ? '' : 'disabled'">Unlink</button>
							</td>
						</tr>
						<tr>
							<td colspan="5">Mother:</td>
						</tr>
						<tr>
							<td>
								<input v-if="family.wifeObj" type="text" readonly="readonly" class="form-control" v-model="family.wifeObj.name" placeholder="Click Find or Create =>">
								<input v-else type="text" readonly="readonly" class="form-control" v-model="family.wife" placeholder="Click Find or Create =>">
							</td>
							<td>
								<button type="button" class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-find" @click.prevent="findPeople('wife')"> Find </button>
							</td>
							<td>
								<button class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-add" @click.prevent="addPeople('wife')"> Add </button>
							</td>
							<td>
								<router-link :to="{name: 'people-edit', params: {id: family.wifeObj ? family.wifeObj.id : ''}}" class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-edit" :class="family.wifeObj ? '' : 'disabled'"> Edit </router-link>
							</td>
							<td>
								<button class="btn btn-sm btn-primary primary2 btn-icon btn-icon-lg btn-icon-left btn-icon-unlink" @click.prevent=" removeSpouse('wife')" :class="family.wifeObj ? '' : 'disabled'">Unlink</button>
							</td>
						</tr>
						<tr>
							<td colspan="6">
								<table class="table table-borderless text-white mb-0 mt-3">
									<tr>
										<td>
											<div class="custom-control custom-checkbox" style="padding-top: 9px;">
												<input type="checkbox" class="custom-control-input" id="Living" value="1" disabled v-model="family.living">
												<label class="custom-control-label" for="Living">Living</label>
											</div>
										</td>
										<td>
											<div class="custom-control custom-checkbox" style="padding-top: 9px;">
												<input type="checkbox" class="custom-control-input" id="Private" value="1" v-model="family.private">
												<label class="custom-control-label" for="Private">Private</label>
											</div>
										</td>
										<td>Tree:</td>
										<td>
											<select disabled="disabled" v-model="family.gedcom" class="form-control">
												<option value="">Select Tree</option>
												<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
											</select>
										</td>
										<td>Branch:</td>
										<td>
											<select v-model="family.branch" class="form-control" :disabled="!family.gedcom">
												<option>Select Branch</option>
												<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==family.gedcom">{{branch.branch}}</option>
											</select>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div v-if="family.id">
			<br>
			<div class="card mb-4">
				<div class="card-body">
					<h4>Events</h4>
					<hr>
					<table class="table table-borderless">
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
								<template v-if="is_pro">
									<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('marrplace')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Married', 'MARR')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Married', 'MARR')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Married', 'MARR')"></button>
								</template>
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
									<template v-if="is_pro">
										<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('sealplace')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Sealed to Spouse (LDS)', 'SLGS')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Sealed to Spouse (LDS)', 'SLGS')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Sealed to Spouse (LDS)', 'SLGS')"></button>
									</template>
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
								<template v-if="is_pro">
									<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('divplace')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Divorced', 'DIV')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Divorced', 'DIV')"></button>
									<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Divorced', 'DIV')"></button>
								</template>
							</td>
						</tr>
					</table>
					<p class="mb-0">
						<strong> Note: </strong> When entering dates, please use the standard genealogical format DD MMM YYYY. For example, 10 Apr 2004.
					</p>
				</div>
			</div>
			<br>
		</div>
		<div v-if="family.id">
			<div class="card mb-4">
				<div class="card-body">
					<h4>Other Events <button class="btn btn-sm btn-primary primary2 primary2-sm float-right" type="button" @click.prevent="addEvent"> + Add </button> </h4>
					<hr>
					<table v-if="family.events && family.events.length" class="table table-striped mb-0">
						<thead>
							<tr>
								<th>
									<b>Event</b>
								</th>
								<th>
									<b>Event Date</b>
								</th>
								<th>
									<b>Event Place</b>
								</th>
								<th>
									<b>Detail</b>
								</th>
								<th style="width: 350px;">
									<b>Action</b>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="event in family.events">
								<td>{{event.event_type ? event.event_type.display : ''}} ({{event.parenttag}})</td>
								<td>{{event.eventdate}}</td>
								<td>{{event.eventplace}}</td>
								<td>{{event.info}}</td>
								<td>
									<a href="#" @click.prevent="editEvent(event)" title="Edit" class="btn btn-sm btn-icon btn-icon-left btn-icon-edit btn-outline-primary"> Edit </a>
									<a href="#" @click.prevent="deleteEvent(event)" title="Delete" class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-primary" :class="selected.includes(event.id) && spinner.delete.spinning  ? 'loading' : ''"> Delete </a>
									<a href="#" @click.prevent="eventNote(event.eventtypeID, event.id)" title="Notes" id="notesicon6" class="btn btn-sm btn-icon btn-icon-left btn-icon-notes btn-outline-primary"> Notes </a>
									<a href="#" @click.prevent="eventCitation(event.eventtypeID, event.id)" title="Sources" id="citesicon6" class="btn btn-sm btn-icon btn-icon-left btn-icon-sources btn-outline-primary">Sources</a>
								</td>
							</tr>
						</tbody>
					</table>
					<div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="family.id">
			<div class="card">
				<div class="card-body">
					<h4>Children <button class="btn btn-sm btn-primary primary2 primary2-sm float-right" type="button" @click.prevent="addPeople('children')"> + Add </button>
						<button class="btn btn-sm btn-primary primary2 primary2-sm float-right mr-2" type="button" @click.prevent="findPeople('children')"> Find </button>
						<span class="float-right small  mr-4 mt-1"> New Children </span>
					</h4>
					<hr>
					<div v-if="family.childrens && family.childrens.length">
						<table class="table table-striped mb-0">
							<thead>
								<tr>
									<th>Sort</th>
									<th>Child</th>
									<th>Birth Date</th>
									<th>Death Date</th>
									<th style="width: 180px;">Action</th>
								</tr>
							</thead>
							<tbody class="childrens-sort">
								<tr v-for="children in computed_children" v-if="children.person" class="children-single" :data-id="children.id">
									<td class="dragarea normal">
										<a title="Drag" class="smallicon admin-drag-icon"></a>
									</td>
									<td class="lightback normal childblock">
										<span v-if="children.person">
											<router-link :to="{name: 'people-edit', params: {id: children.person.id}}">
												 {{ children.person.name }}
											</router-link>
										</span>
									</td>
									<td>{{children.person.birthdate}}</td>
									<td>{{children.person.deathdate}}</td>
									<td>
										<a class="btn btn-sm btn-icon btn-icon-left btn-icon-unlink btn-outline-primary" @click.prevent="unlinkChild(children.id)" href="#">Unlink</a>
										<a class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-primary" href="#" @click.prevent="deleteChild(children.id, children.person.id)">Delete</a>
									</td>
								</tr>
								<tr v-else>
									<td colspan="4">{{children.personID}} (Missing)</td>
									<td>
										<a class="btn btn-sm btn-icon btn-icon-left btn-icon-unlink btn-outline-primary" @click.prevent="unlinkChild(children.id)" href="#">Unlink</a>
										<a class="btn btn-sm btn-icon btn-icon-left btn-icon-delete btn-outline-primary" href="#" @click.prevent="deleteChild(children.id, children.person.id)">Delete</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<br>
		</div>
		<div v-if="family.id">
			<div class="card bg-primary-light mt-3 mb-4">
				<div class="card-body">
					<h4>On Save</h4>
					<hr>
					<div class="custom-control custom-radio">
						<input type="radio" value="self" id="self" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="self">Return to this page </label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" value="menu" id="menu" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="menu">Return to menu</label>
					</div>
				</div>
			</div>
			<br>
			<button class="btn btn-primary btn btn-primary primary2 text-white" @click.prevent="update">
				<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save Changes </button>
			<event-note :noteArgs="modalProps.noteArgs" />
			<event-citation :citationArgs="modalProps.citationArgs" />
			<association :associationArgs="modalProps.associationArgs" />
			<place-find :placeFind="modalProps.placeFind" @placeFound="placeFound" />
			<event-more :eventmoreArgs="modalProps.eventmoreArgs" />
			<people-find v-if="family" :findPeopleArgs="modalProps.findPeopleArgs" :sex="sex" @peopleFound="peopleFound" />
			<people-add v-if="family" :gedcom="family.gedcom" :sex="sex" :branch="family.branch" @peopleAdded="peopleAdded" />
			<event-add :eventArgs="modalProps.eventArgs" @eventAdded="eventAdded" />
			<event-edit v-if="family" :event="event" />
		</div>
	</div>
</template>
<script>

import Message from '@/components/dashboard/Message.vue';
import peopleFind from '@/components/dashboard/modals/family/edit/people/Find.vue';
import peopleAdd from '@/components/dashboard/modals/family/edit/people/Add.vue';
import placeFind from '@/components/dashboard/modals/family/edit/event/place/Find.vue';
import eventMore from '@/components/dashboard/modals/family/edit/event/More.vue';
import eventNote from '@/components/dashboard/modals/family/edit/event/note/Index.vue';
import eventCitation from '@/components/dashboard/modals/family/edit/event/citation/Index.vue';
import eventAdd from '@/components/dashboard/modals/family/edit/event/add/Index.vue';
import eventEdit from '@/components/dashboard/modals/family/edit/event/edit/Index.vue';
import association from '@/components/dashboard/modals/family/edit/event/association/Index.vue';
export default {
	components: {
		'message': Message,
		'people-find': peopleFind,
		'people-add': peopleAdd,
		'place-find': placeFind,
		'event-more': eventMore,
		'event-add': eventAdd,
		'event-edit': eventEdit,
		'event-note': eventNote,
		'event-citation': eventCitation,
		'association': association,
	},
	data() {
		return {
			user: wpGenealogy.user,
			family: {},
			plan: wpGenealogy.plan,
			messages: [],
			selected: [],
			spinner: {
				loading: {
					spinning: false,
				},
				update: {
					spinning: false,
				},
				delete: {
					spinning: false,
				}
			},
			find: '',
			sex: '',
			event: '',
			returnTo: 'self',
			findType: '',
			familyOb: '',
			editEventObj: '',
			modalProps: {
				eventArgs: {},
				placeFind: {},
				eventmoreArgs: {},
				noteArgs: {},
				citationArgs: {},
				associationArgs: {},
				findPeopleArgs: {}
			}
		}
	},
	created: function() {
		this.getData();
	},
	watch: {

		'family.husbObj': function(nVal, oVal) {
			console.log(nVal)

			if(nVal.living || this.family.husbObj.living){
				this.family.living = true;
			} else {
				this.family.living = false;

			}

		},
		'family.wifeObj': function(nVal, oVal) {
			if(nVal.living ||this.family.wifeObj.living){
				this.family.living = true;
			} else {
				this.family.living = false;

			}
		}
	},
	computed: {
		is_pro() {
			if (this.plan == 'premium') {
				return true
			} else {
				return false;
			}
		},
		// Get all trees
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		// Get all branches
		branches: function() {
			return this.$store.getters['branch/data'];
		},
		// Get all branches
		event_type: function() {
			return this.$store.getters['event_type/data'];
		},
		is_allow_lds() {
			console.log(wpGenealogy.user);
			if (wpGenealogy.user && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta.allow_lds) {
				return true;
			}
			return false;
		},
		computed_children: function(){
			if(this.family && this.family.childrens){
				return this.family.childrens.sort(function(a,b){ 
					return a.ordernum - b.ordernum;
				})
			}
			return []
		}
	},
	mounted: function() {
		var mystore = this.$store
		jQuery(window).on('load', function() {
			var checkExist = setInterval(function() {
				if (jQuery('.childrens-sort').length) {
					jQuery('.childrens-sort').sortable({
						axis: 'y',
						handle: '.admin-drag-icon',
						cancel: '',
						update: function(event, ui) {
							var orderArray = jQuery(this).find('.children-single')
							var oreder = []
							for (var i = 0; i < orderArray.length; i++) {
								oreder[i] = jQuery(orderArray[i]).data('id')
							}
							mystore.dispatch('children/oreder', oreder).then(response => {
								console.log(oreder)
							})
						}
					})
					clearInterval(checkExist)
				}
			}, 100)
		})
	},
	methods: {
		getData() {
			this.family = {}
			this.spinner.loading.spinning = true;
			const data = {
				action: 'family_get_full',
				id: this.$route.params.id
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.family = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		// Notes for default event / custom event
		eventNote: function(type, eventID) {
			this.modalProps.noteArgs = {
				type: type,
				gedcom: this.family.gedcom,
				persfamID: this.family.familyID,
				eventID: eventID
			}
			jQuery('#family-edit-event-note').modal('show')
		},
		// Citation for default event / custom event
		eventCitation(type, eventID) {
			this.modalProps.citationArgs = {
				type: type,
				gedcom: this.family.gedcom,
				persfamID: this.family.familyID,
				eventID: eventID
			}
			jQuery('#family-edit-event-citation').modal('show')
		},
		// event association
		association(familyID = false) {
			this.modalProps.associationArgs = {
				gedcom: this.family.gedcom,
				persfamID: this.family.familyID
			}
			console.log(this.modalProps.associationArgs)
			jQuery('#family-edit-event-association').modal('show')
		},
		// for finding husband, wife and children
		findPeople: function(find) {
			this.find = find
			this.modalProps.findPeopleArgs =  {gedcom: this.family.gedcom}
			jQuery('#family-edit-people-find').modal('show')
		},
		peopleFound: function(people) {
			if (this.find == 'wife') {
				this.family.wife = people.personID;
				this.family.wifeObj = people
			}
			if (this.find == 'husband') {
				this.family.husband = people.personID
				this.family.husbObj = people
			}
			if (this.find == 'children') {
				this.addChildren(people)
			}
			jQuery('#family-edit-people-find').modal('hide')
		},
		// for adding husband, wife and children
		addPeople: function(find) {
			this.find = find;
			if (find == 'husband') {
				this.sex = 'M';
			} else if (find == 'wife') {
				this.sex = 'F';
			} else if (find == 'children') {
				this.sex = '';
			} else {
				this.sex = '';
			}
			jQuery('#family-edit-people-add').modal('show')
		},
		peopleAdded: function(people) {
			if (this.find == 'wife') {
				this.family.wife = people.personID;
				this.family.wifeObj = people;
			}
			if (this.find == 'husband') {
				this.family.husband = people.personID;
				this.family.husbObj = people;
			}
			if (this.find == 'children') {
				this.addChildren(people);
			}
			jQuery('#family-edit-people-add').modal('hide')
		},
		// Unlink spouse from family
		removeSpouse: function(spouse) {
			if (spouse == 'wife') {
				this.family.wife = '';
				this.family.wifeObj = {};
			}
			if (spouse == 'husband') {
				this.family.husband = '';
				this.family.husbObj = {};
			}
		},
		// Find place for default event
		findPlace: function(find) {
			this.find = find;
			jQuery('#family-edit-event-place-find').modal('show')
		},
		// Set place when place found.
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
			jQuery('#family-edit-event-place-find').modal('hide')
		},
		// More details of default event.
		eventMore: function(type, eventID) {
			this.modalProps.eventmoreArgs = {
				type: type,
				gedcom: this.family.gedcom,
				persfamID: this.family.familyID,
				parenttag: eventID
			}
			jQuery('#family-edit-event-more').modal('show')
		},
		// Add custom event.
		addEvent() {
			this.modalProps.eventArgs = {
				gedcom: this.family.gedcom,
				persfamID: this.family.familyID,
				type: 'F',
			}
			jQuery('#family-edit-event-add').modal('show')
		},
		eventAdded() {
			this.getData();
			jQuery('#family-edit-event-add').modal('hide')
		},
		// Edit custom event.
		editEvent(event) {
			this.event = event;
			jQuery('#family-edit-event-edit').modal('show')
		},
		// Delete custom event.
		deleteEvent(event) {
			if (confirm('Are you sure you want to delete this event?')) {
				this.selected = [event.id]
				this.spinner.delete.spinning = true
				this.$store.dispatch('event/delete', {
					selected: [event.id]
				}).then(response => {
					this.getData()
					this.spinner.delete.spinning = false
				}).catch(error => {});
			}
		},
		// Attach children to family
		addChildren: function(people) {
			people.familyID = this.family.familyID
			this.$store.dispatch('children/add', people).then(response => {
				this.getData();
				this.messages = response.data[0] ? [response.data[0].message] : []
				if (!response.data[0].children) {
					alert(this.messages[0].text)
				}
			}).catch(error => {});
		},
		// Deattach children to family
		unlinkChild(id) {
			if (confirm('Are you sure you want to unlink this child?')) {
				this.$store.dispatch('children/delete', {
					selected: [id]
				}).then(response => {
					this.getData();
				}).catch(error => {});
			}
		},
		// Delete children permenently
		deleteChild(cid=null, id=null) {
			if (confirm('Are you sure you want to delete this person? The individual will be entirely deleted from your tree.')) {
				if(cid){
					this.$store.dispatch('children/delete', {
						selected: [cid]
					}).then(response => {
						this.getData();
					}).catch(error => {});
				}

				if(id){
					this.$store.dispatch('people/delete', {
						selected: [id]
					}).then(response => {
						this.getData();
					}).catch(error => {});
				}
			}
		},
		// Update family
		update: function() {
			if (!this.family.gedcom) {
				alert('Please select a tree.');
				return
			}
			if (!this.family.branch) {
				alert('Please select a branch.');
				return
			}
			let newFamily = {
				id: this.family.id,
				gedcom: this.family.gedcom,
				familyID: this.family.familyID,
				husband: this.family.husband,
				wife: this.family.wife,
				marrdate: this.family.marrdate,
				marrdatetr: this.family.marrdatetr,
				marrplace: this.family.marrplace,
				marrtype: this.family.marrtype,
				divdate: this.family.divdate,
				divdatetr: this.family.divdatetr,
				divplace: this.family.divplace,
				status: this.family.status,
				sealdate: this.family.sealdate,
				sealdatetr: this.family.sealdatetr,
				sealplace: this.family.sealplace,
				husborder: this.family.husborder,
				wifeorder: this.family.wifeorder,
				changedate: this.family.changedate,
				living: this.family.living,
				private: this.family.private,
				branch: this.family.branch,
				childID: this.family.childID
			};
			this.spinner.update.spinning = true;
			this.$store.dispatch('family/update', newFamily).then(response => {
				this.spinner.update.spinning = false;
				this.messages = response.data[0] ? [response.data[0].message] : []
				if (this.redirect == 'home') {
					this.$router.push({
						name: 'dashboard-family-search',
					})
				}
			}).catch(error => {});
		},
	}
}
</script>
