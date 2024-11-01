<template>
	<div class="pedigree-container">
		<p class="pedigree-container-p" v-if="ptype == 'pedigree standard' || ptype == 'pedigree box'"> (Notes: You may have to scroll down or right to see chart. <span class="arro2"> </span> Additional information New pedigree) </p>
		<p class="pedigree-container-p" v-if="ptype == 'pedigree compact'"> Notes: You may have to scroll down or right to see chart.) </p>
		<div :class="ptype" v-if="ptype == 'pedigree vertical'">
			<panZoom selector="#g2" :options="{minZoom: 1, maxZoom: 1}">
				<div>
					<ul id="g2" v-if="people">
						<li>
							<pedigree-tree-vr v-if="people && people.id" :loop="loop" :personID="people.id" :fatherID="father.id" :motherID="mother.id" :loopMax="loopMax" />
							<div class="persion-ind">
								<router-link class="tp-name" :to="{name: 'people-single', params:{id: people ? people.id : ''}}">{{people ? people.name : ''}} </router-link>
								<span class="tp-sex" v-if="people.sex=='M'">♂</span>
								<span class="tp-sex" v-if="people.sex=='F'">♀</span>
								<div class="date">
									{{people.birthdate || people.deathdate ? '(' : ''}}
									{{people.birthdate ? 'b.'+people.birthdate  : ''}}
									{{people.birthdate && people.deathdate ? ', ' : ''}}
									{{people.deathdate ? 'd.'+people.deathdate : ''}}
									{{people.birthdate || people.deathdate ? ')' : ''}}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</panZoom>
		</div>
		<div :class="ptype" v-if="ptype != 'pedigree vertical'">
			<panZoom selector="#g3" :options="{minZoom: 1, maxZoom: 1}">
				<div>
					<ul id="g3" v-if="people">
						<li>
							<div class="persion-ind">
								<router-link class="tp-name" :to="{name: 'people-single', params:{id: people ? people.id : ''}}">{{people ? people.name : ''}} </router-link>
								<span class="tp-sex" v-if="people.sex=='M'">♂</span>
								<span class="tp-sex" v-if="people.sex=='F'">♀</span>
								<div class="date">
									{{people.birthdate || people.deathdate ? '(' : ''}}
									{{people.birthdate ? 'b.'+people.birthdate  : ''}}
									{{people.birthdate && people.deathdate ? ', ' : ''}}
									{{people.deathdate ? 'd.'+people.deathdate : ''}}
									{{people.birthdate || people.deathdate ? ')' : ''}}
								</div>
								<div class="tp-hover-content">
									<div class="arro"></div>
									<div class="tp-hover-content-inner">
										<div class="content-info">
											<div><strong>{{people.name}}</strong></div>
											<div>{{people.birthdate ? 'B: '+people.birthdate  : ''}}</div>
											<div>{{people.birthplace ? '&nbsp;&nbsp;&nbsp;'+people.birthplace  : ''}}</div>
											<div>{{people.deathdate ? 'D: '+people.deathdate  : ''}}</div>
											<div>{{people.deathplace ? '&nbsp;&nbsp;&nbsp;'+people.deathplace  : ''}}</div>
										</div>
										<div class="content-info" v-for="(family, index) in people.families">
											<strong>Family {{index+1}}: </strong>
											<router-link :to="{name: 'family-group-sheet', params: {id: family.id}}"> [Group Sheet] </router-link>
											<ul class="hover-lul">
												<li>
													<strong>Spouse: </strong>
													<router-link v-if="family.spouseObj" :to="{name: 'people-single', params: {id: family.spouseObj.id}}">{{family.spouseObj.name}}</router-link>
													<ul class="hover-lul">
														<li> <strong>Children: </strong>
															<ul class="hover-lul" v-if="family.childrens">
																<li v-for="(child, indexchild) in family.childrens"> {{indexchild+1}}. <router-link :to="{name: 'people-single', params: {id: child.person.id}}">
																		{{child.person.name}}
																	</router-link>
																</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<pedigree-tree v-if="people && people" :loop="loop" :personID="people.id" :fatherID="father.id" :motherID="mother.id" :loopMax="loopMax" />
						</li>
					</ul>
				</div>
			</panZoom>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	props: ['people', 'ptype', 'loopMax'],
	data() {
		return {
			loop: 1,
		}
	},
	computed: {
		father() {
			if (this.people && this.people.id) {
				if (this.people.parents && this.people.parents[0] && this.people.parents[0].family && this.people.parents[0].family.husbObj) {
					return this.people.parents[0].family.husbObj
				}
			}
			return {}
		},
		mother() {
			if (this.people && this.people.id) {
				if (this.people.parents && this.people.parents[0] && this.people.parents[0].family && this.people.parents[0].family.wifeObj) {
					return this.people.parents[0].family.wifeObj
				}
			}
			return {}
		}
	}
}
Vue.component('pedigree-tree', {
	props: ['personID', 'fatherID', 'motherID', 'loop', 'loopMax'],
	data: function() {
		return {
			people: {},
			father: {},
			mother: {},
			loopUp: this.loop + 1,
		}
	},
	watch: {
		personID: function(newVal, oldVal) {
			this.getData();
		}
	},
	mounted: function() {
		this.getData();
	},
	methods: {
		getData() {
			if (this.personID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.personID
				})).then(response => {
					this.people = response.data
				}).catch(error => {});
			}
			if (this.fatherID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.fatherID
				})).then(response => {
					this.father = response.data
				}).catch(error => {
					this.father
				});
			}
			if (this.motherID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.motherID
				})).then(response => {
					this.mother = response.data
				}).catch(error => {});
			}
		},
	},
	computed: {
		fatherFather() {
			if (this.father && this.father.id) {
				if (this.father.parents && this.father.parents[0] && this.father.parents[0].family && this.father.parents[0].family.husbObj) {
					return this.father.parents[0].family.husbObj
				}
			}
			return {}
		},
		fatherMother() {
			if (this.father && this.father.id) {
				if (this.father.parents && this.father.parents[0] && this.father.parents[0].family && this.father.parents[0].family.wifeObj) {
					return this.father.parents[0].family.wifeObj
				}
			}
			return {}
		},
		motherFather() {
			if (this.mother && this.mother.id) {
				if (this.mother.parents && this.mother.parents[0] && this.mother.parents[0].family && this.mother.parents[0].family.husbObj) {
					return this.mother.parents[0].family.husbObj
				}
			}
			return {}
		},
		motherMother() {
			if (this.mother && this.mother.id) {
				if (this.mother.parents && this.mother.parents[0] && this.mother.parents[0].family && this.mother.parents[0].family.wifeObj) {
					return this.mother.parents[0].family.wifeObj
				}
			}
			return {}
		},
	},
	template: '\
		<ul>\
			<li>\
				<div class="persion-ind">\
					<div v-if="people.id">\
						<div v-if="father.id">\
							<router-link  class="tp-name" :to="{name: \'people-single\', params:{id: father.id}}">{{father.name}}</router-link>\
							<span class="tp-sex" v-if="father.sex==\'M\'">♂</span>\
							<span class="tp-sex" v-if="father.sex==\'F\'">♀</span>\
							<div class="date">\
								{{father.birthdate || father.deathdate ? \'(\' : \'\'}}\
								{{father.birthdate  ? \'d.\'+father.birthdate  : \'\'}}\
								{{father.birthdate && father.deathdate ? \', \' : \'\'}}\
								{{father.deathdate  ? \'d.\'+father.deathdate : \'\'}}\
								{{father.birthdate || father.deathdate ? \')\' : \'\'}}\
							</div>\
							<div class="tp-hover-content">\
								<div class="arro"></div>\
								<div class="tp-hover-content-inner">\
									<div class="content-info">\
										<div><strong>{{father.name}}</strong></div>\
										<div>{{father.birthdate ? \'B: \'+father.birthdate  : \'\'}}</div>\
										<div>{{father.birthplace ? \'&nbsp;&nbsp;&nbsp;\'+father.birthplace  : \'\'}}</div>\
										<div>{{father.deathdate ? \'D: \'+father.deathdate  : \'\'}}</div>\
										<div>{{father.deathplace ? \'&nbsp;&nbsp;&nbsp;\'+father.deathplace  : \'\'}}</div>\
									</div>\
									<div class="content-info" v-if="father.families.length" v-for="(family, index) in father.families">\
										<strong>Family {{index+1}}: </strong>\
										<router-link :to="{name: \'family-group-sheet\', params: {id: family.id}}"> [Group Sheet] </router-link>\
										<ul class="hover-lul">\
											<li>\
												<strong>Spouse: </strong>\
												<router-link v-if="family.wifeObj" :to="{name: \'people-single\', params: {id: family.wifeObj.id}}">{{family.wifeObj.name}}</router-link>\
												<ul class="hover-lul">\
													<li> <strong>Children: </strong>\
														<ul class="hover-lul" v-if="family.childrens.length">\
															<li v-for="(child, indexchild) in family.childrens" v-if="child.person"> {{indexchild+1}}. \
																<router-link :to="{name: \'people-single\', params: {id: child.person.id}}">\
																	{{child.person.name}}\
																</router-link>\
															</li>\
														</ul>\
													</li>\
												</ul>\
											</li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</div>\
						<div v-else>\
							<router-link v-if="!father.id && mother.id" class="tp-name" :to="{name: \'family-edit\',  params: {id: people.parents[0].family.id}}">Edit Family</router-link>\
							<router-link v-if="!father.id && !mother.id" class="tp-name" :to="{name: \'family-add\', params: {child: people.id}}">Add New Family</router-link>\
						</div>\
					</div>\
					<div v-else>\
					   <a class="tp-name">Unknonwn</a>\
					</div>\
				</div>\
				<pedigree-tree v-if="loopUp < loopMax && father" :loop="loopUp" :personID="father.id" :fatherID="fatherFather.id" :motherID="fatherMother.id" :loopMax="loopMax"/>\
			</li>\
			<li>\
				<div class="persion-ind">\
					<div v-if="people.id">\
						<div v-if="mother.id">\
							<router-link  class="tp-name" :to="{name: \'people-single\', params:{id: mother.id}}">{{mother.name}}</router-link>\
							<span class="tp-sex" v-if="mother.sex==\'M\'">♂</span>\
							<span class="tp-sex" v-if="mother.sex==\'F\'">♀</span>\
							<div class="date">\
								{{mother.birthdate || mother.deathdate ? \'(\' : \'\'}}\
								{{mother.birthdate  ? \'d.\'+mother.birthdate  : \'\'}}\
								{{mother.birthdate && mother.deathdate ? \', \' : \'\'}}\
								{{mother.deathdate  ? \'d.\'+mother.deathdate : \'\'}}\
								{{mother.birthdate || mother.deathdate ? \')\' : \'\'}}\
							</div>\
							\
							<div class="tp-hover-content">\
								<div class="arro"></div>\
								<div class="tp-hover-content-inner">\
									<div class="content-info">\
										<div><strong>{{mother.name}}</strong></div>\
										<div>{{mother.birthdate ? \'B: \'+mother.birthdate  : \'\'}}</div>\
										<div>{{mother.birthplace ? \'&nbsp;&nbsp;&nbsp;\'+mother.birthplace  : \'\'}}</div>\
										<div>{{mother.deathdate ? \'D: \'+mother.deathdate  : \'\'}}</div>\
										<div>{{mother.deathplace ? \'&nbsp;&nbsp;&nbsp;\'+mother.deathplace  : \'\'}}</div>\
									</div>\
									<div class="content-info" v-if="mother.families.length" v-for="(family, index) in mother.families">\
										<strong>Family {{index+1}}: </strong>\
										<router-link :to="{name: \'family-group-sheet\', params: {id: family.id}}"> [Group Sheet] </router-link>\
										<ul class="hover-lul">\
											<li>\
												<strong>Spouse: </strong>\
												<router-link v-if="family.husbObj" :to="{name: \'people-single\', params: {id: family.husbObj.id}}">{{family.husbObj.name}}</router-link>\
												<ul class="hover-lul">\
													<li> <strong>Children: </strong>\
														<ul class="hover-lul" v-if="family.childrens.length">\
															<li v-for="(child, indexchild) in family.childrens" v-if="child.person"> {{indexchild+1}}. \
																<router-link :to="{name: \'people-single\', params: {id: child.person.id}}">\
																	{{child.person.name}}\
																</router-link>\
															</li>\
														</ul>\
													</li>\
												</ul>\
											</li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</div>\
						<div v-else>\
							<router-link v-if="father.id && !mother.id" class="tp-name" :to="{name: \'family-edit\',  params: {id: people.parents[0].family.id}}">Edit Family</router-link>\
							<router-link v-if="!father.id && !mother.id" class="tp-name" :to="{name: \'family-add\', params: {child: people.id}}">Add New Family</router-link>\
						</div>\
					</div>\
					<div v-else>\
						<a class="tp-name">Unknonwn</a>\
					</div>\
				</div>\
				<pedigree-tree v-if="loopUp < loopMax && mother" :loop="loopUp" :personID="mother.id" :fatherID="motherFather.id" :motherID="motherMother.id" :loopMax="loopMax"/>\
			</li>\
		</ul>'
});
Vue.component('pedigree-tree-vr', {
	props: ['personID', 'fatherID', 'motherID', 'loop', 'loopMax'],
	data: function() {
		return {
			people: {},
			father: {},
			mother: {},
			loopUp: this.loop + 1,
		}
	},
	watch: {
		personID: function(newVal, oldVal) { // watch it
			this.getData();
		}
	},
	mounted: function() {
		this.getData();
	},
	methods: {
		getData() {
			let data = {
				action: 'people_get_full',
				id: this.personID
			}
			if (this.personID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.personID
				})).then(response => {
					this.people = response.data
				}).catch(error => {});
			}
			if (this.fatherID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.fatherID
				})).then(response => {
					this.father = response.data
				}).catch(error => {
					this.father
				});
			}
			if (this.motherID) {
				this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
					action: 'people_get_full',
					id: this.motherID
				})).then(response => {
					this.mother = response.data
				}).catch(error => {});
			}
		},
	},
	computed: {
		fatherFather() {
			if (this.father && this.father.id) {
				if (this.father.parents && this.father.parents[0] && this.father.parents[0].family && this.father.parents[0].family.husbObj) {
					return this.father.parents[0].family.husbObj
				}
			}
			return {}
		},
		fatherMother() {
			if (this.father && this.father.id) {
				if (this.father.parents && this.father.parents[0] && this.father.parents[0].family && this.father.parents[0].family.wifeObj) {
					return this.father.parents[0].family.wifeObj
				}
			}
			return {}
		},
		motherFather() {
			if (this.mother && this.mother.id) {
				if (this.mother.parents && this.mother.parents[0] && this.mother.parents[0].family && this.mother.parents[0].family.husbObj) {
					return this.mother.parents[0].family.husbObj
				}
			}
			return {}
		},
		motherMother() {
			if (this.mother && this.mother.id) {
				if (this.mother.parents && this.mother.parents[0] && this.mother.parents[0].family && this.mother.parents[0].family.wifeObj) {
					return this.mother.parents[0].family.wifeObj
				}
			}
			return {}
		},
	},
	template: '\
		<ul>\
			<li>\
				<pedigree-tree-vr v-if="loopUp < loopMax && father" :loop="loopUp" :personID="father.id" :fatherID="fatherFather.id" :motherID="fatherMother.id" :loopMax="loopMax"/>\
				<div class="persion-ind">\
					<div v-if="people.id"> \
						<div v-if="father.id">\
							<router-link  class="tp-name" :to="{name: \'people-single\', params:{id: father.id}}">{{father.name}}</router-link>\
							<span class="tp-sex" v-if="father.sex==\'M\'">♂</span>\
							<span class="tp-sex" v-if="father.sex==\'F\'">♀</span>\
							<div class="date">\
								{{father.birthdate || father.deathdate ? \'(\' : \'\'}}\
								{{father.birthdate  ? \'d.\'+father.birthdate  : \'\'}}\
								{{father.birthdate && father.deathdate ? \', \' : \'\'}}\
								{{father.deathdate  ? \'d.\'+father.deathdate : \'\'}}\
								{{father.birthdate || father.deathdate ? \')\' : \'\'}}\
							</div>\
							\
							<div class="tp-hover-content">\
								<div class="arro"></div>\
								<div class="tp-hover-content-inner">\
									<div class="content-info">\
										<div><strong>{{father.name}}</strong></div>\
										<div>{{father.birthdate ? \'B: \'+father.birthdate  : \'\'}}</div>\
										<div>{{father.birthplace ? \'&nbsp;&nbsp;&nbsp;\'+father.birthplace  : \'\'}}</div>\
										<div>{{father.deathdate ? \'D: \'+father.deathdate  : \'\'}}</div>\
										<div>{{father.deathplace ? \'&nbsp;&nbsp;&nbsp;\'+father.deathplace  : \'\'}}</div>\
									</div>\
									<div class="content-info" v-for="(family, index) in father.families">\
										<strong>Family {{index+1}}: </strong><router-link :to="{name: \'family-group-sheet\', params: {id: family.id}}"> [Group Sheet] </router-link>\
										<ul class="hover-lul">\
											<li>\
												<strong>Spouse: </strong>\
												<router-link v-if="family.wifeObj" :to="{name: \'people-single\', params: {id: family.wifeObj.id}}">{{family.wifeObj.name}}</router-link>\
												<ul class="hover-lul">\
													<li> <strong>Children: </strong>\
														<ul class="hover-lul" v-if="family.childrens">\
															<li v-for="(child, indexchild) in family.childrens" v-if="child.person"> {{indexchild+1}}. \
																<router-link :to="{name: \'people-single\', params: {id: child.person.id}}">\
																	{{child.person.name}}\
																</router-link>\
															</li>\
														</ul>\
													</li>\
												</ul>\
											</li>\
										</ul>\
									</div>\
								</div>\
							</div>\
							\
						</div>\
						<div v-else>\
							<router-link v-if="!father.id && mother.id" class="tp-name" :to="{name: \'family-edit\',  params: {id: people.parents[0].family.id}}">Edit Family</router-link>\
							<router-link v-if="!father.id && !mother.id" class="tp-name" :to="{name: \'family-add\', params: {child: people.id}}">Add New Family</router-link>\
						</div>\
					</div>\
					<div v-else>\
						<a class="tp-name">Unknonwn</a>\
					</div>\
				</div>\
			</li>\
			<li>\
				<pedigree-tree-vr v-if="loopUp < loopMax && mother" :loop="loopUp" :personID="mother.id" :fatherID="motherFather.id" :motherID="motherMother.id" :loopMax="loopMax"/>\
				<div class="persion-ind">\
					<div v-if="people.id"> \
						<div v-if="mother.id">\
							<router-link  class="tp-name" :to="{name: \'people-single\', params:{id: mother.id}}">{{mother.name}}</router-link>\
							<span class="tp-sex" v-if="mother.sex==\'M\'">♂</span>\
							<span class="tp-sex" v-if="mother.sex==\'F\'">♀</span>\
							<div class="date">\
								{{mother.birthdate || mother.deathdate ? \'(\' : \'\'}}\
								{{mother.birthdate  ? \'d.\'+mother.birthdate  : \'\'}}\
								{{mother.birthdate && mother.deathdate ? \', \' : \'\'}}\
								{{mother.deathdate  ? \'d.\'+mother.deathdate : \'\'}}\
								{{mother.birthdate || mother.deathdate ? \')\' : \'\'}}\
							</div>\
							\
							<div class="tp-hover-content">\
								<div class="arro"></div>\
								<div class="tp-hover-content-inner">\
									<div class="content-info">\
										<div><strong>{{mother.name}}</strong></div>\
										<div>{{mother.birthdate ? \'B: \'+mother.birthdate  : \'\'}}</div>\
										<div>{{mother.birthplace ? \'&nbsp;&nbsp;&nbsp;\'+mother.birthplace  : \'\'}}</div>\
										<div>{{mother.deathdate ? \'D: \'+mother.deathdate  : \'\'}}</div>\
										<div>{{mother.deathplace ? \'&nbsp;&nbsp;&nbsp;\'+mother.deathplace  : \'\'}}</div>\
									</div>\
									<div class="content-info" v-for="(family, index) in mother.families">\
										<strong>Family {{index+1}}: </strong><router-link :to="{name: \'family-group-sheet\', params: {id: family.id}}"> [Group Sheet] </router-link>\
										<ul class="hover-lul">\
											<li>\
												<strong>Spouse: </strong>\
												<router-link v-if="family.husbObj" :to="{name: \'people-single\', params: {id: family.husbObj.id}}">{{family.husbObj.name}}</router-link>\
												<ul class="hover-lul">\
													<li> <strong>Children: </strong>\
														<ul class="hover-lul" v-if="family.childrens">\
															<li v-for="(child, indexchild) in family.childrens" v-if="child.person"> {{indexchild+1}}. \
																<router-link :to="{name: \'people-single\', params: {id: child.person.id}}">\
																	{{child.person.name}}\
																</router-link>\
															</li>\
														</ul>\
													</li>\
												</ul>\
											</li>\
										</ul>\
									</div>\
								</div>\
							</div>\
							\
						</div>\
						<div v-else>\
							<router-link v-if="father.id && !mother.id" class="tp-name" :to="{name: \'family-edit\',  params: {id: people.parents[0].family.id}}">Edit Family</router-link>\
							<router-link v-if="!father.id && !mother.id" class="tp-name" :to="{name: \'family-add\', params: {child: people.id}}">Add New Family</router-link>\
						</div>\
					</div>\
					<div v-else>\
						<a class="tp-name">Unknonwn</a>\
					</div>\
				</div>\
			</li>\
		</ul>'
});
</script>