<template>
	<div>
		<tentative :tentative="tentative" :title="title" />
		<div v-if="!people">
			<button class="btn btn-link" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading...</span>
			</button>
		</div>
		<div id="sec-information" v-if="people">
			<div class="card bg-primary text-white">
				<div class="card-body">
					<h4>{{people.name}} <span style="font-size: 12px;" class="small float-right" v-if="people.updated_at"> Last Modified {{people.updated_at}} | <router-link :to="{name: 'people-edit', params: {id: people.id}}">Edit</router-link>
						</span></h4>
					<hr>
					<div class="row">
						<div class="col-md-9" style="font-size: 20px;">
							<div class="row">
								<div class="col-md-12">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Name</strong></td>
											<td width="50"></td>
											<td>{{people.name}}
												<ind-sources-link :citations="citations" :eventID="'NAME'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'NAME').length">
													<div>
														<event-note :citations="citations" :eventID="'NAME'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Gender</strong></td>
											<td width="50"></td>
											<td>{{people.sex == 'M' ? 'Male' : ''}} {{people.sex == 'F' ? 'Female' : ''}}</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.deathdate || people.deathplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Died </strong></td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'DEAT', eventName: 'Died'}, {date:people.deathdate, place: people.deathplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.deathdate}} / {{people.deathplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.deathplace" :to="{name:'place-single', params: {place: people.deathplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'DEAT'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'DEAT').length">
													<div>
														<event-note :citations="citations" :eventID="'DEAT'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.birthdate || people.birthplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Born</strong> </td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'BIRT', eventName: 'Birth'}, {date:people.birthdate, place: people.birthplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.birthdate}} / {{people.birthplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.birthplace" :to="{name:'place-single', params: {place: people.birthplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'BIRT'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'BIRT').length">
													<div>
														<event-note :citations="citations" :eventID="'BIRT'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.burialdate || people.burialplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Buried </strong></td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'BURI', eventName: 'Buried'}, {date:people.burialdate, place: people.burialplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.burialdate}} / {{people.burialplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.burialplace" :to="{name:'place-single', params: {place: people.burialplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'BURI'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'BURI').length">
													<div>
														<event-note :citations="citations" :eventID="'BURI'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.altbirthdate || people.altbirthplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Christened</strong></td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'CHR', eventName: 'Christened'}, {date:people.altbirthdate, place: people.altbirthplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.altbirthdate}} / {{people.altbirthplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.altbirthplace" :to="{name:'place-single', params: {place: people.altbirthplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'CHR'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'CHR').length">
													<div>
														<event-note :citations="citations" :eventID="'CHR'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.baptdate || people.baptplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"></td>
											<td width="50"></td>
											<td></td>
										</tr>
									</table>
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Baptized (LDS)</strong> </td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'BAPL', eventName: 'Baptized (LDS)'}, {date:people.baptdate, place: people.baptplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.baptdate}} / {{people.baptplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.baptplace" :to="{name:'place-single', params: {place: people.baptplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'BAPL'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'BAPL').length">
													<div>
														<event-note :citations="citations" :eventID="'BAPL'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.confdate || people.confplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Confirmed (LDS)</strong> </td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'CONL', eventName: 'Confirmed (LDS)'}, {date:people.confdate, place: people.confplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.confdate}} / {{people.confplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.confplace" :to="{name:'place-single', params: {place: people.confplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'CONL'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'CONL').length">
													<div>
														<event-note :citations="citations" :eventID="'CONL'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.initdate || people.initplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;"><strong>Initiatory (LDS) </strong></td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'INIT', eventName: 'Initiatory (LDS)'}, {date:people.initdate, place: people.initplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.initdate}} / {{people.initplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.initplace" :to="{name:'place-single', params: {place: people.initplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'INIT'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'INIT').length">
													<div>
														<event-note :citations="citations" :eventID="'INIT'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.endldate || people.endlplace">
									<table class="table table-borderless">
										<tr>
											<td width="150" style="vertical-align: top;">Endowed (LDS)</strong>
											</td>
											<td width="50"><span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({people: people}, {eventID: 'ENDL', eventName: 'Endowed (LDS)'}, {date:people.endldate, place: people.endlplace})"><i class="far fa-edit"></i></span></td>
											<td>{{people.endldate}} / {{people.endlplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="people.endlplace" :to="{name:'place-single', params: {place: people.endlplace}}"></router-link>
												<ind-sources-link :citations="citations" :eventID="'ENDL'" :persfamID="people.personID" />
												<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'ENDL').length">
													<div>
														<event-note :citations="citations" :eventID="'ENDL'" :note_links="people.note_links" :persfamID="people.personID" />
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="col-md-12" v-if="people.personID">
									<table class="table table-borderless mb-0">
										<tr>
											<td width="150" style="vertical-align: top;">
												<strong>Person ID</strong>
											</td>
											<td width="50"></td>
											<td>{{people.personID}} / <router-link :to="{name: 'tree-single', params: {gedcom: people.gedcom}}">{{people.gedcom}}</router-link>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<img :src="people.image.url ? people.image.url : no_avater" class="mr-3 rounded w-100">
						</div>
					</div>
				</div>
			</div>
		</div>
		<br>
		<div v-if="people && people.parents && people.parents.length">
			<div class="card">
				<div class="card-body ">
					<h4>Parents' Details</h4>
					<hr>
					<div class="row" v-for="parent in people.parents">
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-4">
									<div v-if="parent.family && parent.family.husbObj">
										<div><strong> Father </strong><br>
											<people-inline :people="parent.family.husbObj" />
										</div>
										<div class="mt-3"><strong>Relationship</strong><br> {{parent.frel ? parent.frel : 'Natural'}}</div>
									</div>
								</div>
								<div class="col-md-4">
									<div v-if="parent.family && parent.family.wifeObj">
										<div><strong> Mother </strong><br>
											<people-inline :people="parent.family.wifeObj" />
										</div>
										<div class="mt-3"><strong>Relationship</strong><br> {{parent.mrel ? parent.mrel : 'Natural'}}</div>
									</div>
								</div>
								<div class="col-md-4">
									<div v-if="parent.family.marrdate || parent.family.marrplace">
										<div>Married <span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({family: parent.family}, {eventID: 'MARR', eventName: 'Married'}, {date:parent.family.marrdate, place: parent.family.marrplace},)"><i class="far fa-edit"></i></span></div>
										<div>
											<strong>Date:</strong> {{parent.family.marrdate}}
										</div>
										<div>
											<span v-if="parent.family.marrplace">{{parent.family.marrplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="parent.family.marrplace" :to="{name:'place-single', params: {place: parent.family.marrplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'MARR'" :persfamID="parent.familyID" />
										</div>
									</div>
									<div v-if="parent.sealdate || parent.sealplace">
										<div>Sealed P (LDS) <span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({children: parent}, {eventID: 'SLGC', eventName: 'Sealed P (LDS)'}, {date:parent.sealdate, place: parent.sealplace})"><i class="far fa-edit"></i></span></div>
										<div>
											{{parent.sealdate}}
										</div>
										<div>
											<span v-if="parent.sealplace">, {{parent.sealplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="parent.sealplace" :to="{name:'place-single', params: {place: parent.sealplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'SLGC'" :persfamID="parent.personID+':'+parent.familyID " />
										</div>
									</div>
									<div v-if="parent.divdate || parent.divplace">
										<div>Divorced <span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({family: parent}, {eventID: 'DIV', eventName: 'Married'}, {date:parent.divdate, place: parent.divplace})"><i class="far fa-edit"></i></span></div>
										<div>
											{{parent.divdate}}
											<span v-if="parent.divplace">, {{parent.divplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="parent.divplace" :to="{name:'place-single', params: {place: parent.divplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'DIV'" :persfamID="parent.familyID" />
										</div>
									</div>
									<div class="mt-3">
										<div> <strong> Family ID </strong></div>
										<div>
											{{parent.familyID}} <br>
											<router-link :to="{name: 'family-group-sheet', params: {id: parent.family.id}}">Group Sheet</router-link> | <router-link :to="{name: 'family-chart', params: {id: parent.family.id}}">Family Chart</router-link>
										</div>
										<div>
											<router-link :to="{name: 'family-edit', params: {id: parent.family.id}}">Edit</router-link> | <span>Last Modified : </span> {{parent.family.updated_at}}
										</div>
									</div>
								</div>
							</div>
							<hr>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br>
		<div v-if="people && people.families && people.families.length">
			<div class="card">
				<div class="card-body ">
					<h4>Family Details </h4>
					<hr>
					<div class="row" v-for="(spouse, index) in people.families">
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-4">
									<div><strong> Family # {{index+1}}</strong> </div>
									<div colspan="2">
										<span v-if="spouse.husband!==people.personID && spouse.husbObj">
											<people-inline :people="spouse.husbObj" />
										</span>
										<span v-if="spouse.wife!==people.personID && spouse.wifeObj">
											<people-inline :people="spouse.wifeObj" />
										</span>
									</div>
								</div>
								<div class="col-md-4">
									<div v-if="spouse.marrdate || spouse.marrplace">
										<div><strong>Married</strong> <span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({family: spouse}, {eventID: 'MARR', eventName: 'Married'}, {date:spouse.marrdate, place: spouse.marrplace})"><i class="far fa-edit"></i></span>
										</div>
										<div>
											{{spouse.marrdate}}
										</div>
										<div>
											<span v-if="spouse.marrplace"> {{spouse.marrplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="spouse.marrplace" :to="{name:'place-single', params: {place: spouse.marrplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'MARR'" :persfamID="spouse.familyID" />
										</div>
									</div>
									<div class="mt-2" v-if="spouse.sealdate || spouse.sealplace">
										<div><strong>Sealed P (LDS)</strong>
											<span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({family: spouse}, {eventID: 'SLGS', eventName: 'Sealed P (LDS)'}, {date:spouse.sealdate, place: spouse.sealplace})"><i class="far fa-edit"></i></span>
										</div>
										<div>
											{{spouse.sealdate}}
										</div>
										<div>
											<span v-if="spouse.sealplace">
												{{spouse.sealplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="spouse.sealplace" :to="{name:'place-single', params: {place: spouse.sealplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'SLGS'" :persfamID="spouse.familyID" />
										</div>
									</div>
									<div class="mt-2" v-if="spouse.divdate || spouse.divplace">
										<div><strong>Divorced</strong> <span v-if="user.allcaps.allow_add_suggestion" @click.prevent="showTentative({family: spouse}, {eventID: 'DIV', eventName: 'Divorced'}, {date:spouse.divdate, place: spouse.divplace})"><i class="far fa-edit"></i></span>
										</div>
										<div colspan="2">
											{{spouse.divdate}}
											<span v-if="spouse.divplace">, {{spouse.divplace}}
												<router-link class="admin-find-icon-new fnvm" v-if="spouse.divplace" :to="{name:'place-single', params: {place: spouse.divplace}}"></router-link>
											</span>
											<ind-sources-link :citations="citations" :eventID="'DIV'" :persfamID="spouse.familyID" />
										</div>
									</div>
								</div>
								<div class="col-md-4">
									<div width="10">
										<div><strong>Family ID</strong></div>
									</div>
									<div colspan="2">
										{{spouse.familyID}} <br>
										<router-link :to="{name: 'family-group-sheet', params: {id: spouse.id}}">Group Sheet</router-link> | <router-link :to="{name: 'family-chart', params: {id: spouse.id}}">Family Chart</router-link>
									</div>
									<div>
										<router-link :to="{name: 'family-edit', params: {id: spouse.id}}">Edit</router-link> | <span>Last Modified : </span> {{spouse.updated_at}}
									</div>
								</div>
							</div>
							<div class="row mt-3">
								<div class="col-md-12" v-if="spouse.childrens.length">
									<div><strong>Children</strong></div>
									<div class="row">
										<div class="col-md-6 mb-3" v-if="spouse.childrens" v-for="(children, index) in spouse.childrens">
											{{index+1}}.
											<people-inline :people="children.person" :frel="children.frel" :mrel="children.mrel" :child="true" />
										</div>
									</div>
								</div>
							</div>
							<hr v-if="people.families.length > (index+1)">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="sec-notes" v-if="plan =='premium' && people && people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'GENERAL').length">
			<br>
			<div class="card bg-primary-light ">
				<div class="card-body">
					<h4>Notes</h4>
					<hr>
					<div v-if="people.note_links && people.note_links.filter(note_link=> note_link.eventID == 'GENERAL').length">
						<event-note :citations="citations" :eventID="'GENERAL'" :note_links="people.note_links" :persfamID="people.personID" />
					</div>
				</div>
			</div>
			<br>
		</div>
		<div id="sec-sources" v-if="citations && citations.length && 1==2">
			<br>
			<div class="card bg-primary-light ">
				<div class="card-body ">
					<h4>Sources</h4>
					<hr>
					<ol class="mb-0" v-if="citations.length">
						<li class="mb-2" v-for="(citation, index) in citations">
							<div :id="'citation-'+citation.id" v-if="citation.source_obj">
								<a href="">[{{citation.sourceID}}]</a>
								{{citation.source_obj.shorttitle ? citation.source_obj.shorttitle : citation.source_obj.title}}
								{{citation.source_obj.author ? ', '+citation.source_obj.author : ''}}
								{{citation.source_obj.publisher ? ', ('+citation.source_obj.publisher+')' : ''}}
								{{citation.source_obj.callnum ? ', '+citation.source_obj.callnum : ''}}
								<small>
									{{citation.page ? ', '+citation.page : ''}}
									{{citation.citedate ? ', '+citation.citedate : ''}}
									<span v-if="citation.citetext"> <br>{{citation.citetext}}</span>
									<span v-if="citation.note"> <br>{{citation.note}}</span>
								</small>
							</div>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import PeopleDetailsInline from '@/components/PeopleDetailsInline.vue';
import Tentative from '@/components/modals/people/Tentative.vue';
export default {
	props: ['people'],
	components: {
		'people-inline': PeopleDetailsInline,
		'tentative': Tentative,
	},
	data() {
		return {
			tentative: {},
			title: '',
			user: wpGenealogy.user,
			spinner: {
				loading: {
					spinning: false,
				},
			},
			no_avater: wpGenealogy.plugin_dir_url + 'public/src/assets/images/no-avatar.png',
			plan: wpGenealogy.plan
		}
	},
	computed: {
		citations() {
			let citations = [];
			let people = this.people
			if (people) {
				if (people.citations) {
					for (var i = 0; i < people.citations.length; i++) {
						citations.push(people.citations[i])
					}
				}
				if (people.parents) {
					for (var i = 0; i < people.parents.length; i++) {
						if (people.parents[i].parents && people.parents[i].parents.citations) {
							for (var j = 0; j < people.parents[i].parents.citations.length; j++) {
								citations.push(people.parents[i].parents.citations[j])
							}
						}
					}
				}
				if (people.families) {
					for (var i = 0; i < people.families.length; i++) {
						if (people.families[i] && people.families[i].citations) {
							for (var j = 0; j < people.families[i].citations.length; j++) {
								citations.push(people.families[i].citations[j])
							}
						}
					}
				}
			}
			citations = citations.filter((citation) => {
				if (!Number.isInteger(parseInt(citation.eventID))) {
					return citation
				}
			})
			return citations;
		}
	},
	methods: {
		showTentative(pfc = {}, eventID = {}, data = {}) {
			this.tentative = {
				...pfc,
				...eventID,
				...data
			}
			if (pfc.people) {
				this.$store.dispatch('get_people_by_id', {
					id: pfc.people.id
				}).then(response => {
					this.title = response.data.name
				}).catch(error => {});;
			}
			if (pfc.family) {
				this.$store.dispatch('get_family_by_id', {
					id: pfc.family.id
				}).then(response => {
					let husband_name = response.data.husband_obj ? response.data.husband_obj.name : ''
					let wife_name = response.data.wife_obj ? response.data.wife_obj.name : ''
					this.title = 'Family ' + response.data.familyID + ' ' + husband_name + (husband_name && wife_name ? ', ' : '') + wife_name;
				}).catch(error => {});;
			}
			if (pfc.children) {
				this.$store.dispatch('get_children_by_id', {
					id: pfc.children.id
				}).then(response => {
					this.title = response.data.people_obj.name
				}).catch(error => {});;
			}
			jQuery('#Tentative').modal('show')
		}
	}
}
Vue.component('ind-sources-link', {
	props: ['citations', 'eventID', 'persfamID'],
	data: function() {
		return {
			childrenCitations: []
		}
	},
	methods: {
		scroll(citation) {
			jQuery('html, body').animate({
				scrollTop: jQuery('#citation-' + citation.id).offset().top
			}, 'fast');
		}
	},
	template: '<span v-if="citations && citations.filter(citation=> citation.eventID == eventID && citation.persfamID == persfamID).length"> [<span class="ind-sources-link"><a @click.prevent="scroll(citation)" v-for="(citation, index) in citations" :href="\'#citation-\'+citation.id" v-if="citation.eventID == eventID && citation.persfamID == persfamID">{{index+1}}</a></span>]</span>'
})
Vue.component('event-note', {
	props: ['note_links', 'eventID', 'citations', 'persfamID'],
	data: function() {
		return {}
	},
	template: '<ul class="event-note mb-0"><li class="" style="white-space: break-spaces;" v-for="(note_link, index) in note_links" v-if="note_link.eventID == eventID">{{note_link.note ? note_link.note.note : \'\'}} <ind-sources-link :citations="citations" :persfamID="persfamID" :eventID="\'N\'+note_link.noteID" /> </li></ul>'
})
</script>