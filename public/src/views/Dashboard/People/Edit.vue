<template>
	<div class="people-edit">
		<h3 class="top-breadcrumb"><strong>People</strong><small> Edit existing person </small> </h3>
		<br>
		<message :messages="messages" />
		<div v-if="spinner.loading.spinning">
			<button class="btn btn-link" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading... </span>
			</button>
		</div>
		<div v-if="people.id">
			<table class="table table-borderless mb-0">
				<tr>
					<td style="vertical-align: top;">
						<h5>{{people.name}} ({{people.personID}})</h5>
						<p class="text-muted small">
							{{people.birthdate}} - {{people.deathdate}}
						</p>
					</td>
					<td style="vertical-align: top;">
						<a href="#" @click.prevent="update()" class="btn btn-sm btn-icon btn-icon-left btn-icon-saves  btn-outline-primary">Save</a>
						<a v-if="is_pro" href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-left btn-icon-notes btn-outline-primary">Notes</a>
						<a v-if="is_pro && 1==2" href="#" @click.prevent="eventCitation('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-left btn-icon-sources btn-outline-primary">Sources</a>
						<a v-if="is_pro" href="#" @click.prevent="association()" class="btn btn-sm btn-icon btn-icon-left btn-icon-associations btn-outline-primary">Associations</a>
					</td>
					<td style="vertical-align: top; text-align: right;">
						<router-link :to="{name: 'people-single', params: {id: people.id}}" title="Test" class="btn btn-sm btn-outline-success">Test</router-link>
						<!-- <a href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-primary"> + Media</a>
						<a href="#" @click.prevent="eventNote('General', 'GENERAL')" class="btn btn-sm btn-icon btn-icon-help btn-icon-left no-bg" style="padding-right: 0;min-width: 20px;padding-left: 31px;"></a>
						 --><p class="text-muted small mt-2">
							<small>Last Modified: {{people.updated_at}}</small>
						</p>
					</td>
				</tr>
			</table>
			<br>
		</div>
		<div v-if="people.id">
			<div class="card mb-4 bg-primary text-white">
				<div class="card-body people-child people-edit">
					<h4>Edit general information</h4>
					<hr>
					<div class="row">
						<div class="col-md-4">
							<label>First / Given Name(s)</label>
							<input class="form-control" type="text" v-model="people.firstname">
						</div>
						<div class="col-md-4">
							<label> Last /Surname</label>
							<input class="form-control" type="text" v-model="people.lastname">
						</div>
						<div class="col-md-4">
							<div style="margin-top: 32px;" v-if="is_pro">
								<button class="btn btn-outline-primary btn-icon btn-icon-note-alt btn-icon-note" @click.prevent="eventNote('Name', 'NAME')"></button>
								<button class="btn btn-outline-primary btn-icon btn-icon-citation-alt btn-icon-citation" @click.prevent="eventCitation('Name', 'NAME')"></button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-6">
									<label class="mt-3 mb-1">Gender</label>
									<select v-model="people.sex" class="form-control">
										<option value="U">Unknown</option>
										<option value="M">Male</option>
										<option value="F">Female</option>
									</select>
								</div>
								<div class="col-md-6">
									<label class="mt-3 mb-1">Nickname</label>
									<input class="form-control" type="text" v-model="people.nickname">
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-6">
									<label class="mt-3 mb-1">Title</label>
									<input class="form-control" type="text" v-model="people.title">
								</div>
								<div class="col-md-6">
									<label class="mt-3 mb-1">Prefix</label>
									<input class="form-control" type="text" v-model="people.prefix">
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-6">
									<label class="mt-3 mb-1">Suffix</label>
									<input class="form-control" type="text" v-model="people.suffix">
								</div>
								<div class="col-md-6">
									<label class="mt-3 mb-1">Name Order</label>
									<select v-model="people.nameorder" class="form-control">
										<option value="0">Default</option>
										<option value="1">First name first</option>
										<option value="2">Surname first (without commas)</option>
										<option value="3">Surname first (with commas)</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="row" style="margin-top: 50px;">
								<div class="col-md-6">
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="Living" value="1" v-model="people.living">
										<label class="custom-control-label" for="Living">Living</label>
									</div>
								</div>
								<div class="col-md-6">
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="Private" value="1" v-model="people.private">
										<label class="custom-control-label" for="Private">Private</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-8">
							<div class="row">
								<div class="col-md-6">
									<label class="mt-3 mb-1">Tree</label>
									<select v-model="people.gedcom" class="form-control">
										<option value="">Select Tree</option>
										<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
									</select>
								</div>
								<div class="col-md-6">
									<label class="mt-3 mb-1">Branch</label>
									<select v-model="people.branch" class="form-control" :disabled="!people.gedcom">
										<option>Select Branch</option>
										<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==people.gedcom">{{branch.branch}}</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="is_pro" class="card mb-4">
				<div class="card-body people-child people-edit"> 
					<div class="custom-file" :class="!people.image.placholder ? 'has-file' : ''" v-bind:style="{ backgroundImage: 'url(' + people.image.url + ')' }">
						<input type="file" id="customFile" class="custom-file-input" accept="image/*" @change="uploadImage" />
						<label class="custom-file-label upl" for="customFile"></label>
						<label class="custom-file-label rmv" for="None" @click.prevent="removeImage"></label>
					</div>
				</div>
			</div>
			<div class="card mb-4">
				<div class="card-body people-child people-edit">
					<h4>Events </h4>
					<hr>
					<table class="table table-borderless">
						<tbody>
							<tr>
								<td></td>
								<td>Date</td>
								<td>Place</td>
								<td></td>
							</tr>
							<tr>
								<td>Birth</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.birthdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.birthplace"> </td>
								<td valign="middle">
									<template v-if="is_pro">
										<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('birthplace')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Birth', 'BIRT')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Birth', 'BIRT')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Birth', 'BIRT')"></button>
									</template>
								</td>
							</tr>
							<tr>
								<td>Christening</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.altbirthdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.altbirthplace"> </td>
								<td>
									<template v-if="is_pro">
										<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('altbirthplace')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Christening', 'CHR')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Christening', 'CHR')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Christening', 'CHR')"></button>
									</template>
								</td>
							</tr>
							<tr>
								<td>Death</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.deathdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.deathplace"> </td>
								<td>
									<template v-if="is_pro">
										<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('deathplace')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Death', 'DEAT')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Death', 'DEAT')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Death', 'DEAT')"></button>
									</template>
								</td>
							</tr>
							<tr>
								<td>Burial</td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.burialdate"> </td>
								<td> <input type="text" class="form-control form-control-sm" v-model="people.burialplace"> </td>
								<td>
									<template v-if="is_pro">
										<button class="btn btn-outline-primary btn-icon btn-icon-find" @click.prevent="findPlace('burialplace')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Burial', 'BURI')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Burial', 'BURI')"></button>
										<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Burial', 'BURI')"></button>
									</template>
								</td>
							</tr>
							<tr>
								<td>
								</td>
								<td colspan="3">
									<br>
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="Cremated" v-model="people.burialtype">
										<label class="custom-control-label" for="Cremated">Cremated</label>
									</div>
								</td>
							</tr>
							<template v-if="is_allow_lds">
								<tr>
									<td>Baptism (LDS)</td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.baptdate"> </td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.baptplace"> </td>
									<td>
										<template v-if="is_pro">
											<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('baptplace')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Baptism (LDS)', 'BAPL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Baptism (LDS)', 'BAPL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Baptism (LDS)', 'BAPL')"></button>
										</template>
									</td>
								</tr>
								<tr>
									<td>Confirmation (LDS)</td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.confdate"> </td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.confplace"> </td>
									<td>
										<template v-if="is_pro">
											<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('confplace')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Confirmation (LDS)', 'CONL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Confirmation (LDS)', 'CONL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Confirmation (LDS)', 'CONL')"></button>
										</template>
									</td>
								</tr>
								<tr>
									<td>Initiatory (LDS)</td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.initdate"> </td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.initplace"> </td>
									<td>
										<template v-if="is_pro">
											<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('initplace')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Initiatory (LDS)', 'INIT')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Initiatory (LDS)', 'INIT')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Initiatory (LDS)', 'INIT')"></button>
										</template>
									</td>
								</tr>
								<tr>
									<td>Endowment (LDS)</td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.endldate"> </td>
									<td> <input type="text" class="form-control form-control-sm" v-model="people.endlplace"> </td>
									<td>
										<template v-if="is_pro">
											<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('endlplace')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-more" @click.prevent="eventMore('Endowment (LDS)', 'ENDL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-note" @click.prevent="eventNote('Endowment (LDS)', 'ENDL')"></button>
											<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Endowment (LDS)', 'ENDL')"></button>
										</template>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
					<p class="mt-2">
						<strong>Note:</strong> When entering dates, please use the standard genealogical format DD MMM YYYY. For , 10 Apr 2004.
					</p>
				</div>
			</div>
			<div class="card mb-4">
				<div class="card-body people-child people-edit">
					<h4 class="mb-0">Others Events <button class="btn btn-sm float-right btn-primary primary2 primary2-sm " type="button" data-toggle="modal" @click.prevent="addEvent"> + Add </button>
					</h4>
					<hr v-if="people.events && people.events.length">
					<table v-if="is_pro && people.events && people.events.length" class="table table-striped">
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
							<tr v-for="event in people.events">
								<td>{{event.event_type ? event.event_type.display : ''}}</td>
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
				</div>
			</div>
			<div class="card mb-4">
				<div class="card-body people-child people-edit">
					<h4 class="mb-0">Parents <span v-if="people.parents">({{people.parents.length}})</span> <router-link :to="{name: 'family-add', params: {child: people.personID, gedcom: people.gedcom, branch: people.branch}}" class="btn btn-sm btn-primary primary2 primary2-sm float-right"> + Add </router-link>
					</h4>
					<hr v-if="people.parents && people.parents.length" >
					<div v-if="people.parents" v-for="(parent, index) in people.parents">
						<div class="  bg-white w-auto mb-3">
							<table class="table table-borderless mb-0">
								<tbody>
									<tr>
										<td colspan="2" width="150" valign="top"><strong>Family:</strong>
											<router-link :to="{name: 'family-edit', params: {id: parent.family.id}}"> {{parent.family.familyID}} </router-link>
											<button class="btn btn-sm btn-icon btn-icon-left btn-icon-unlink btn-outline-primary" @click.prevent="unlinkAsChild(parent.family.familyID, people.personID)">Unlink</button>
										</td>
										<td>
											<div valign="top" class="nw">Sealed to Parents (LDS):</div>
										</td>
									</tr>
									<tr>
										<td>
											<div valign="top">Mother:</div>
											<div v-if="parent.family.wifeObj">
												<div valign="top" colspan="4">
													<router-link :to="{name: 'people-edit', params: {id: parent.family.wifeObj.id}}">
														{{parent.family.wifeObj.name}}
													</router-link> {{parent.family.wifeObj.date}}
												</div>
											</div>
											<div v-else>No Data</div>
										</td>
										<td>
											<div valign="top">Father:</div>
											<div v-if="parent.family.husbObj">
												<div valign="top" colspan="4">
													<router-link :to="{name: 'people-edit', params: {id: parent.family.husbObj.id}}">
														{{parent.family.husbObj.name}}
													</router-link> {{parent.family.husbObj.date}}
												</div>
											</div>
											<div v-else>No Data</div>
										</td>
										<td>
											<div>Date</div>
											<div><input class="form-control form-control-sm" type="text" v-model="parent.sealdate"></div>
										</td>
									</tr>
									<tr>
										<td width="33%">
											<div v-if="parent.family.wifeObj">
												<div valign="top">Relationship:</div>
												<div valign="top" colspan="4">
													<select v-model="parent.mrel" class="form-control form-control-sm" name="mrelF2">
														<option value=""></option>
														<option value="Adopted" selected="">Adopted</option>
														<option value="Birth">Birth</option>
														<option value="Foster">Foster</option>
														<option value="Sealing">Sealing</option>
														<option value="Step">Stepchild</option>
														<option value="Putative">Putative</option>
													</select>
												</div>
											</div>
										</td>
										<td width="33%">
											<div v-if="parent.family.husbObj">
												<div valign="top">Relationship:</div>
												<div valign="top" colspan="4">
													<select v-model="parent.frel" class="form-control form-control-sm" name="mrelF2">
														<option value=""></option>
														<option value="Adopted" selected="">Adopted</option>
														<option value="Birth">Birth</option>
														<option value="Foster">Foster</option>
														<option value="Sealing">Sealing</option>
														<option value="Step">Stepchild</option>
														<option value="Putative">Putative</option>
													</select>
												</div>
											</div>
										</td>
										<td width="33%">
											<div>Place</div>
											<table class="table table-borderless  mb-0">
												<tr>
													<td class="p-0">
														<div><input class="form-control form-control-sm" type="text" v-model="parent.sealplace"></div>
													</td>
													<td class="p-0">&nbsp;</td>
													<td class="p-0">
														<div>
															<button class="btn btn-outline-primary btn-icon btn-icon-find-lds" @click.prevent="findPlace('sealplace', '', index)"></button>
															<button class="btn btn-outline-primary btn-icon btn-icon-citation" @click.prevent="eventCitation('Sealed to Parents (LDS)','SLGC', parent.family.familyID)"></button>
														</div>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<hr v-if="people.parents && people.parents.length>=(index+2)">
					</div>
				</div>
			</div>
			<div class="card mb-4">
				<div class="card-body people-child people-edit">
					<h4 class="mb-0">Spouses / Partners <span v-if="people.families">({{people.families.length}})</span>  <router-link :to="{name: 'family-add', params: {spouse: people.id, sex: people.sex, gedcom: people.gedcom, branch: people.branch}}" class="btn btn-sm btn-primary primary2 primary2-sm float-right"> + Add </router-link>
					</h4>
					<hr>
					<div v-if="people.families" v-for="family in people.families" class="bg-white w-auto mb-3">
						<table class="table table-borderless">
							<tbody>
								<tr>
									<td valign="top"><strong>Family:</strong></td>
									<td valign="top" width="94%">
										<router-link :to="{name: 'family-edit', params: {id: family.id}}">
											{{family.familyID}}
										</router-link>
										<button class="btn btn-sm btn-icon btn-icon-left btn-icon-unlink btn-outline-primary" @click.prevent="unlinkAsSpouse(family.id, people.personID)">Unlink</button>
									</td>
								</tr>
								<tr>
									<td valign="top"><span>Spouse:</span></td>
									<td valign="top">
										<span v-if="family.husband!==people.personID && family.husbObj">
											<router-link :to="{name: 'people-edit', params: {id: family.husbObj ? family.husbObj.id : ''}}">
												{{family.husbObj.name }}
											</router-link> {{family.husbObj.date }}
										</span>
										<span v-if="family.wife!==people.personID && family.wifeObj">
											<router-link :to="{name: 'people-edit', params: {id: family.wifeObj ? family.wifeObj.id : ''}}">
												{{family.wifeObj.name }}
											</router-link> {{family.wifeObj.date }}
										</span>
									</td>
								</tr>
								<tr v-if="family.marrdate">
									<td valign="top">
										<span>Married:</span>
									</td>
									<td valign="top">
										<span>{{family.marrdate}}</span>
									</td>
								</tr>
								<tr v-if="family.childrens.length">
									<td valign="top" style="vertical-align: top;">
										<span>Children:</span>
									</td>
									<td valign="top" class="p-0">
										<table class="table table-borderless w-auto mb-0">
											<tr v-for="(chidren, index) in family.childrens" v-if="chidren.person">
												<td>{{index+1}}. [{{chidren.person.personID}}]</td>
												<td>
													<router-link :to="{name: 'people-edit', params: {id: chidren.person.id  } }">
														{{ chidren.person.name }}
													</router-link> {{ chidren.person.date  }}
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="card mb-4 bg-primary-light ">
				<div class="card-body people-child people-edit">
					<h4>On Save</h4>
					<hr>
					<div class="custom-control custom-radio">
						<input type="radio" value="familyAsChild" id="familyAsChild" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="familyAsChild">Go to new family with current individual (I2) as child</label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" value="familyAsSpouse" id="familyAsSpouse" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="familyAsSpouse">Go to new family with current individual (I2) as spouse</label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" value="self" id="self" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="self">Return to this page</label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" value="menu" id="menu" v-model="returnTo" class="custom-control-input">
						<label class="custom-control-label" for="menu">Return to menu</label>
					</div>
				</div>
				<event-note :noteArgs="modalProps.noteArgs" />
				<event-citation :citationArgs="modalProps.citationArgs" />
				<association :associationArgs="modalProps.associationArgs" />
				<place-find :findPlaceArgs="modalProps.findPlaceArgs" @placeFound="placeFound" />
				<event-more :eventmoreArgs="modalProps.eventmoreArgs" @eventAddedOrUpdated="eventAddedOrUpdated" />
				<event-add :eventArgs="modalProps.eventArgs" @eventAdded="eventAdded" />
				<event-edit :event="event" />
			</div>
			<br>
			<button class="btn btn-primary primary2" @click.prevent="update"> <span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save Changes</button>
		</div>
	</div>
</template>
<script>
import findPlace from '@/components/dashboard/modals/people/edit/event/place/Find.vue';
import Message from '@/components/dashboard/Message.vue';
import addEvent from '@/components/dashboard/modals/people/edit/event/add/Index.vue';
import editEvent from '@/components/dashboard/modals/people/edit/event/edit/Index.vue';
import eventMore from '@/components/dashboard/modals/people/edit/event/More.vue';
import eventNote from '@/components/dashboard/modals/people/edit/event/note/Index.vue';
import eventCitation from '@/components/dashboard/modals/people/edit/event/citation/Index.vue';
import association from '@/components/dashboard/modals/people/edit/event/association/Index.vue';
export default {
	components: {
		'message': Message,
		'place-find': findPlace,
		'event-more': eventMore,
		'event-add': addEvent,
		'event-edit': editEvent,
		'event-note': eventNote,
		'association': association,
		'event-citation': eventCitation,
	},
	data() {
		return {
			people: {},
			messages: [],
			selected: [],
			working: false,
			type: 'people',
			editEventObj: '',
			returnTo: 'self',
			modalProps: {
				eventArgs: {},
				eventmoreArgs: {},
				noteArgs: {},
				citationArgs: {},
				associationArgs: {},
				findPlaceArgs: {}
			},
			event: {},
			plan: wpGenealogy.plan,
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
			}
		}
	},
	mounted: function() {
		this.getData();
	},
	watch: {
		$route(to, from) {
			if (to.path != from.path) {
				this.getData();
			}
		}
	},
	computed: {
		is_pro() {
			if (this.plan == 'premium') {
				return true
			}
			else {
				return false;
			}
		},
		// get trees
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		//get branches
		branches: function() {
			return this.$store.getters['branch/data'];
		},
		is_allow_lds() {
			if (wpGenealogy.addons.includes('WPGenealogy_Lds') && wpGenealogy.user && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta && wpGenealogy.user.data.meta.allow_lds) {
				return true;
			}
			return false;
		}
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'people_get_full',
				id: this.$route.params.id
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.people = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		// event more
		eventMore: function(type, eventID) {
			this.modalProps.eventmoreArgs = {
				gedcom: this.people.gedcom,
				persfamID: this.people.personID,
				type: type,
				parenttag: eventID
			}
			jQuery('#people-edit-event-more').modal('show')
		},
		eventAddedOrUpdated() {
			jQuery('#people-edit-event-more').modal('hide')
		},
		// event note
		eventNote: function(type, eventID) {
			this.modalProps.noteArgs = {
				gedcom: this.people.gedcom,
				persfamID: this.people.personID,
				type: type,
				eventID: eventID
			}
			jQuery('#people-edit-event-note').modal('show')
		},
		// event citation
		eventCitation(type, eventID, familyID = false) {
			let persfamID = this.people.personID
			if (familyID) {
				persfamID = persfamID + ':' + familyID
			}
			this.modalProps.citationArgs = {
				gedcom: this.people.gedcom,
				persfamID: persfamID,
				type: type,
				eventID: eventID
			}
			jQuery('#people-edit-event-citation').modal('show')
		},
		// event association
		association(familyID = false) {
			this.modalProps.associationArgs = {
				gedcom: this.people.gedcom,
				persfamID: this.people.personID
			}
			jQuery('#people-edit-event-association').modal('show')
		},
		// event add
		addEvent() {
			this.modalProps.eventArgs = {
				gedcom: this.people.gedcom,
				persfamID: this.people.personID,
				type: 'I',
			}
			jQuery('#people-edit-event-add').modal('show')
		},
		eventAdded() {
			this.getData();
			jQuery('#people-edit-event-add').modal('hide')
		},
		// event edit
		editEvent(event) {
			this.event = event;
			jQuery('#people-edit-event-edit').modal('show')
		},
		// event citation
		deleteEvent(event) {
			if (confirm('Are you sure you want to delete this event?')) {
				this.spinner.delete.spinning = true
				this.selected = [event.id]
				this.$store.dispatch('event/delete', {
					selected: [event.id]
				}).then(response => {
					this.spinner.delete.spinning = false
					this.getData();
				}).catch(error => {});
			}
		},
		// event place
		findPlace: function(placeFor, lds = null, index = null) {
			this.modalProps.findPlaceArgs = {
				gedcom: this.people.gedcom,
				placeFor: placeFor,
				placeLds: lds,
				placeIndex: index,
			}
			jQuery('#people-edit-event-place-find').modal('show')
			
		},
		// set place
		placeFound: function(place) {
			if (this.modalProps.findPlaceArgs.placeFor == 'birthplace') {
				this.people.birthplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'altbirthplace') {
				this.people.altbirthplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'deathplace') {
				this.people.deathplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'burialplace') {
				this.people.burialplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'baptplace') {
				this.people.baptplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'confplace') {
				this.people.confplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'initplace') {
				this.people.initplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'endlplace') {
				this.people.endlplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'endlplace') {
				this.people.endlplace = place.place
			}
			if (this.modalProps.findPlaceArgs.placeFor == 'sealplace') {
				this.people.parents[this.modalProps.findPlaceArgs.placeIndex].sealplace = place.place
			}
			jQuery('#people-edit-event-place-find').modal('hide')
		},
		// update people
		update: function() {
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
			let newData = {
				id: this.people.id,
				branch: this.people.branch,
				gedcom: this.people.gedcom,
				personID: this.people.personID,
				lnprefix: this.people.lnprefix,
				lastname: this.people.lastname,
				firstname: this.people.firstname,
				birthdate: this.people.birthdate,
				birthdatetr: this.people.birthdatetr,
				sex: this.people.sex,
				birthplace: this.people.birthplace,
				deathdate: this.people.deathdate,
				deathdatetr: this.people.deathdatetr,
				deathplace: this.people.deathplace,
				altbirthdate: this.people.altbirthdate,
				altbirthdatetr: this.people.altbirthdatetr,
				altbirthplace: this.people.altbirthplace,
				burialdate: this.people.burialdate,
				burialdatetr: this.people.burialdatetr,
				burialplace: this.people.burialplace,
				burialtype: this.people.burialtype,
				baptdate: this.people.baptdate,
				baptdatetr: this.people.baptdatetr,
				baptplace: this.people.baptplace,
				confdate: this.people.confdate,
				confdatetr: this.people.confdatetr,
				confplace: this.people.confplace,
				initdate: this.people.initdate,
				initdatetr: this.people.initdatetr,
				initplace: this.people.initplace,
				endldate: this.people.endldate,
				endldatetr: this.people.endldatetr,
				endlplace: this.people.endlplace,
				changedate: this.people.changedate,
				nickname: this.people.nickname,
				title: this.people.title,
				prefix: this.people.prefix,
				suffix: this.people.suffix,
				nameorder: this.people.nameorder,
				famc: this.people.famc,
				metaphone: this.people.metaphone,
				living: this.people.living,
				private: this.people.private,
				branch: this.people.branch,
				changedby: this.people.changedby,
				edituser: this.people.edituser,
				edittime: this.people.edittime,
			};

			this.spinner.update.spinning = true

			this.$store.dispatch('people/update', newData).then(response => {
				this.spinner.update.spinning = false
				this.messages = response.data.messages;
			}).catch(error => {});

			for (var i = 0; i < this.people.parents.length; i++) {
				this.spinner.update.spinning = true
				let children = {
					id: 		this.people.parents[i].id,
					created_by: this.people.parents[i].created_by,
					gedcom: 	this.people.parents[i].gedcom,
					familyID: 	this.people.parents[i].familyID,
					personID: 	this.people.parents[i].personID,
					frel: 		this.people.parents[i].frel,
					mrel: 		this.people.parents[i].mrel,
					sealdate: 	this.people.parents[i].sealdate,
					sealdatetr: this.people.parents[i].sealdatetr,
					sealplace: 	this.people.parents[i].sealplace,
					haskids: 	this.people.parents[i].haskids,
					ordernum: 	this.people.parents[i].ordernum,
					parentorder:this.people.parents[i].parentorder,
				};
				this.$store.dispatch('children/update', children).then(response => {
					this.spinner.update.spinning = false
					this.messages = response.data.messages;
				}).catch(error => {});
			}

			if(this.returnTo != 'self') {
				if(this.returnTo == 'familyAsChild') {
				}
				if(this.returnTo == 'familyAsSpouse') {
				}
				if(this.returnTo == 'menu') {
				}
			}
		},
		unlinkAsChild(familyID, personID) {
			const data = {
				action: 'people_unlink_as_child',
				familyID: familyID,
				personID: personID,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.people = response.data
				this.spinner.loading.spinning = false;
				this.getData();
			}).catch(error => {});
		},
		unlinkAsSpouse(familyID, personID) {
			const data = {
				action: 'people_unlink_as_spouse',
				familyID: familyID,
				personID: personID,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.people = response.data
				this.spinner.loading.spinning = false;
				this.getData();
			}).catch(error => {});
		},
		uploadImage(e) {
			let data = new FormData();
			const file = e.target.files[0]
			this.people.image.url = URL.createObjectURL(file)
			data.append('file', file);
			data.append('personID', this.people.personID);
			data.append('gedcom', this.people.gedcom);
			data.append('action', 'upload_profile_image');
			let config = {
				header: {
					'Content-Type': 'image/png'
				}
			}
			if(file){
				this.$http.post(wpGenealogy.ajax_url, data, config).then(response => {
					this.people.image = response.data
				})
			}
		},
		removeImage(){
			jQuery('.custom-file-input').val('');
			const data = {
				action: 'remove_profile_imagef',
				gedcom: this.people.image.gedcom,
				personID: this.people.image.personID,
				file: this.people.image.file,
				url: this.people.image.url,
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.people.image = response.data
			})
		}
	}
}
</script>