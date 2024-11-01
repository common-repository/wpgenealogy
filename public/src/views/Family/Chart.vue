<template>
	<div class="famlily-chart">
		<h3>Family Chart</h3>
		<div class="family-tree">
			<ul>
				<li>
					<ul>
						<li class="root" v-if="family && family.husbObj">
							<ul class="parents" v-if="family.husbObj.parents && family.husbObj.parents.length">
								<li v-if="family.husbObj.parents[0].family && family.husbObj.parents[0].family.husbObj">
									<div class="indd">
										<router-link :to="{name: 'people-single', params: {id: family.husbObj.parents[0].family.husbObj.id}}">
											{{family.husbObj.parents[0].family.husbObj.name}}
										</router-link>
										<date :people="family.husbObj.parents[0].family.husbObj" />
									</div>
								</li>
								<li v-if="family.husbObj.parents[0].family && family.husbObj.parents[0].family.wifeObj">
									<div class="indd">
										<router-link :to="{name: 'people-single', params: {id: family.husbObj.parents[0].family.wifeObj.id}}">
											{{family.husbObj.parents[0].family.wifeObj.name}}
										</router-link>
										<date :people="family.husbObj.parents[0].family.wifeObj" />
									</div>
								</li>
							</ul>
							
							<div class="indd">
								<router-link :to="{name: 'people-single', params: {id: family.husbObj.id}}">{{family.husbObj.name}}</router-link>
								<date :people="family.husbObj" />
							</div>
						</li>
						<li class="spouse" v-if="family && family.wifeObj">
							<ul class="parents" v-if="family.wifeObj.parents && family.wifeObj.parents.length">
								<li v-if="family.wifeObj.parents[0].family && family.wifeObj.parents[0].family.husbObj">
									<div class="indd">
										<router-link :to="{name: 'people-single', params: {id: family.wifeObj.parents[0].family.husbObj.id}}">
											{{family.wifeObj.parents[0].family.husbObj.name}}
										</router-link>
										<date :people="family.wifeObj.parents[0].family.husbObj" />
									</div>
								</li>
								<li v-if="family.wifeObj.parents[0].family && family.wifeObj.parents[0].family.wifeObj">
									<div class="indd">
										<router-link :to="{name: 'people-single', params: {id: family.wifeObj.parents[0].family.wifeObj.id}}">
											{{family.wifeObj.parents[0].family.wifeObj.name}}
										</router-link>
										<date :people="family.wifeObj.parents[0].family.wifeObj" />
									</div>
								</li>
							</ul>
							<div class="indd">
								<router-link :to="{name: 'people-single', params: {id: family.wifeObj.id}}">{{family.wifeObj.name}}</router-link>
								<date :people="family.wifeObj" />
							</div>
						</li>
					</ul>
					<div class="indd-box childrens" v-if="family.childrens.length">
						<div class="indd" v-for="child in family.childrens">
							<router-link v-if="child.person" :to="{name: 'people-single', params: {id: child.person.id}}">{{child.person.name}}</router-link>
							<date :people="child.person" />
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
Vue.component('date', {
	props: ['people'],
	data: function() {
		return {}
	},
	template: '\
		<div v-if="people" class="date">\
			{{people.birthdate || people.deathdate ? \'(\' : \'\'}}\
			{{people.birthdate ? \'d.\'+people.birthdate  : \'\'}}\
			{{people.birthdate && people.deathdate ? \', \' : \'\'}}\
			{{people.deathdate ? \'d.\'+people.deathdate : \'\'}}\
			{{people.birthdate || people.deathdate ? \')\' : \'\'}}\
		</div>'
});
export default {
	props: ['family'],
	data: function() {
		return {}
	},
}
</script>