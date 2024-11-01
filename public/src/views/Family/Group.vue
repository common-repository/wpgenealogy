<template>
	<div class="famlily-group">
		<div>
			<h3>Family Sheet</h3>
			<div class="card mb-4" v-if="family && family.husband">
				<div class="card-body">
					<div>
						<h4>Father </h4>
						<hr>
						<h6 class="mb-3">
							<router-link :to="{name: 'people-single', params: {id:family.husbObj.id}}"><strong>{{family.husbObj.name}}</strong></router-link> 
							 | 
							<router-link :to="{name: 'people-edit', params: {id: family.husbObj.id}}">Edit</router-link>
						</h6>
					</div>
					<table class="table table-bordered">
						<tbody>
							<tr>
								<td style="vertical-align: top;" width="10%">Born</td>
								<td width="10%">{{family.husbObj.birthdate}}</td>
								<td width="30%">{{family.husbObj.birthplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.birthplace" :to="{name:'place-single', params: {place: family.husbObj.birthplace}}"></router-link>
								</td>
								<td width="15%">LDS Ordinances</td>
								<td width="10%">Date</td>
								<td width="30%">Place</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Christened</td>
								<td>{{family.husbObj.altbirthdate}}</td>
								<td>{{family.husbObj.altbirthplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.altbirthplace" :to="{name:'place-single', params: {place: family.husbObj.altbirthplace}}"></router-link>
								</td>
								<td style="vertical-align: top;">Baptized (LDS) </td>
								<td>{{family.husbObj.baptdate}}</td>
								<td>{{family.husbObj.baptplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.baptplace" :to="{name:'place-single', params: {place: family.husbObj.baptplace}}"></router-link>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Died</td>
								<td>{{family.husbObj.deathdate}}</td>
								<td>{{family.husbObj.deathplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.deathplace" :to="{name:'place-single', params: {place: family.husbObj.deathplace}}"></router-link>
								</td>
								<td>Endowed (LDS)</td>
								<td>{{family.husbObj.endldate}}</td>
								<td>{{family.husbObj.endlplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.endlplace" :to="{name:'place-single', params: {place: family.husbObj.endlplace}}"></router-link>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Buried</td>
								<td>{{family.husbObj.burialdate}}</td>
								<td>{{family.husbObj.burialplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="family.husbObj.burialplace" :to="{name:'place-single', params: {place: family.husbObj.burialplace}}"></router-link>
								</td>
								<td>Sealed P (LDS)</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Married</td>
								<td>{{family.marrdate}}</td>
								<td>{{family.marrplace}}
									<router-link class="admin-find-icon-new fnvm" v-if="family.marrplace" :to="{name:'place-single', params: {place: family.marrplace}}"></router-link>

								</td>
								<td>Sealed S (LDS) </td>
								<td>{{family.sealdate}}</td>
								<td>{{family.sealplace}}
									<router-link class="admin-find-icon-new fnvm" v-if="family.sealplace" :to="{name:'place-single', params: {place: family.sealplace}}"></router-link>

								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Father</td>
								<td colspan="5">
									<div v-if="family.husbObj.parents && family.husbObj.parents.length && family.husbObj.parents[0].family && family.husbObj.parents[0].family.husbObj">
										<router-link v-if="family.husbObj.parents[0].family.husbObj" :to="{name: 'people-single', params: {id: family.husbObj.parents[0].family.husbObj.id}}">{{family.husbObj.parents[0].family.husbObj.name}}</router-link> | <router-link :to="{name: 'family-group-sheet', params: {id: family.husbObj.parents[0].family.id}}">{{family.husbObj.parents[0].family.familyID}} Group Sheet </router-link>
									</div>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Mother</td>
								<td colspan="5">
									<div v-if="family.husbObj.parents && family.husbObj.parents.length && family.husbObj.parents[0].family && family.husbObj.parents[0].family.wifeObj">
										<router-link v-if="family.husbObj.parents[0].family.wifeObj" :to="{name: 'people-single', params: {id: family.husbObj.parents[0].family.wifeObj.id}}">{{family.husbObj.parents[0].family.wifeObj.name}}</router-link> | <router-link :to="{name: 'family-group-sheet', params: {id: family.husbObj.parents[0].family.id}}">{{family.husbObj.parents[0].family.familyID}} Group Sheet </router-link>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="card mb-4" v-if="family && family.wife">
				<div class="card-body">
					<div>
						<h4> Mother </h4>
						<hr>
						<h6 class="mb-3">
							<router-link :to="{name: 'people-single', params: {id:family.wifeObj.id}}"><strong>{{family.wifeObj.name}}</strong> </router-link>| <router-link :to="{name: 'people-edit', params: {id: family.wifeObj.id}}">Edit</router-link>
						</h6>
					</div>
					<table class="table table-bordered" v-if="family.wifeObj">
						<tr>
							<td style="vertical-align: top;" width="10%">Born</td>
							<td width="10%">{{family.wifeObj.birthdate}}</td>
							<td width="30%">{{family.wifeObj.birthplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.birthplace" :to="{name:'place-single', params: {place: family.wifeObj.birthplace}}"></router-link>
							</td>
							<td width="15%">LDS Ordinances</td>
							<td width="10%">Date</td>
							<td width="30%">Place</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Christened</td>
							<td>{{family.wifeObj.altbirthdate}}</td>
							<td>{{family.wifeObj.altbirthplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.altbirthplace" :to="{name:'place-single', params: {place: family.wifeObj.altbirthplace}}"></router-link>
							</td>
							<td style="vertical-align: top;">Baptized (LDS) </td>
							<td>{{family.wifeObj.baptdate}}</td>
							<td>{{family.wifeObj.baptplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.baptplace" :to="{name:'place-single', params: {place: family.wifeObj.baptplace}}"></router-link>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Died</td>
							<td>{{family.wifeObj.deathdate}}</td>
							<td>{{family.wifeObj.deathplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.deathplace" :to="{name:'place-single', params: {place: family.wifeObj.deathplace}}"></router-link>
							</td>
							<td>Endowed (LDS)</td>
							<td>{{family.wifeObj.endldate}}</td>
							<td>{{family.wifeObj.endlplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.endlplace" :to="{name:'place-single', params: {place: family.wifeObj.endlplace}}"></router-link>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Buried</td>
							<td>{{family.wifeObj.burialdate}}</td>
							<td>{{family.wifeObj.burialplace}} 
								<router-link class="admin-find-icon-new fnvm" v-if="family.wifeObj.burialplace" :to="{name:'place-single', params: {place: family.wifeObj.burialplace}}"></router-link>
							</td>
							<td>Sealed P (LDS)</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Married</td>
							<td>{{family.marrdate}}</td>
							<td>{{family.marrplace}}
								<router-link class="admin-find-icon-new fnvm" v-if="family.sealplace" :to="{name:'place-single', params: {place: family.sealplace}}"></router-link>
							</td>
							<td>Sealed S (LDS) </td>
							<td>{{family.sealdate}}</td>
							<td>{{family.sealplace}}
								<router-link class="admin-find-icon-new fnvm" v-if="family.sealplace" :to="{name:'place-single', params: {place: family.sealplace}}"></router-link>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Father</td>
							<td colspan="5">
								<div v-if="family.wifeObj.parents && family.wifeObj.parents.length && family.wifeObj.parents.family && family.wifeObj.parents[0].family.husbObj">
									<router-link v-if="family.wifeObj.parents[0].husbObj" :to="{name: 'people-single', params: {id: family.wifeObj.parents[0].husbObj.id}}">{{family.wifeObj.parents[0].husbObj.name}}</router-link> | <router-link :to="{name: 'family-group-sheet', params: {id: family.wifeObj.parents[0].id}}">{{family.wifeObj.parents[0].familyID}} Group Sheet </router-link>
								</div>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">Mother</td>
							<td colspan="5">
								<div v-if="family.wifeObj.parents && family.wifeObj.parents.length && family.wifeObj.parents.family && family.wifeObj.parents[0].family.wifeObj">
									<router-link v-if="family.wifeObj.parents[0].family.wifeObj" :to="{name: 'people-single', params: {id: family.wifeObj.parents[0].family.wifeObj.id}}">{{family.wifeObj.parents[0].family.wifeObj.name}}</router-link> | <router-link :to="{name: 'family-group-sheet', params: {id: family.wifeObj.parents[0].family.id}}">{{family.wifeObj.parents[0].family.familyID}} Group Sheet </router-link>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="card mb-4" v-if="family.childrens.length" v-for="(child, index) in family.childrens">
				<div v-if="child">
					<div class="card-body">
						<div>
							<h4>Child {{index+1}} | {{child.person.sex == 'M' ? 'Male' : ''}} {{child.person.sex == 'F' ? 'Female' : ''}}</h4>
							<hr>
							<h6 class="mb-3">
								<router-link :to="{name: 'people-single', params: {id:child.person.id}}"><strong>{{child.person.name}}</strong></router-link> | <router-link :to="{name: 'people-edit', params: {id: child.person.id}}">Edit</router-link>
							</h6>
						</div>
						<table class="table table-bordered">
							<tr>
								<td style="vertical-align: top;" width="10%">Born</td>
								<td width="10%">{{child.person.birthdate}}</td>
								<td width="30%">{{child.person.birthplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.birthplace" :to="{name:'place-single', params: {place: child.person.birthplace}}"></router-link>
								</td>
								<td width="15%">LDS Ordinances</td>
								<td width="10%">Date</td>
								<td width="30%">Place</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Christened</td>
								<td>{{child.person.altbirthdate}}</td>
								<td>{{child.person.altbirthplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.altbirthplace" :to="{name:'place-single', params: {place: child.person.altbirthplace}}"></router-link>
								</td>
								<td style="vertical-align: top;">Baptized (LDS) </td>
								<td>{{child.person.baptdate}}</td>
								<td>{{child.person.baptplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.baptplace" :to="{name:'place-single', params: {place: child.person.baptplace}}"></router-link>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Died</td>
								<td>{{child.person.deathdate}}</td>
								<td>{{child.person.deathplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.deathplace" :to="{name:'place-single', params: {place: child.person.deathplace}}"></router-link>
								</td>
								<td>Endowed (LDS)</td>
								<td>{{child.person.endldate}}</td>
								<td>{{child.person.endlplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.endlplace" :to="{name:'place-single', params: {place: child.person.endlplace}}"></router-link>
								</td>
							</tr>
							<tr>
								<td style="vertical-align: top;">Buried</td>
								<td>{{child.person.burialdate}}</td>
								<td>{{child.person.burialplace}} 
									<router-link class="admin-find-icon-new fnvm" v-if="child.person.burialplace" :to="{name:'place-single', params: {place: child.person.burialplace}}"></router-link>
								</td>
								<td>Sealed P (LDS)</td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['family'],
	data: function() {
		return {}
	},
}
</script>