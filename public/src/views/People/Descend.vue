<template>
	<div class="descend-container">
		<p class="descend-container-p" v-if="dtype == 'descend standard' || dtype == 'descend compact'">Notes: You may have to scroll down or right to see chart.)</p>
		<p class="descend-container-p" v-if="dtype == 'descend-text'">( = Descendancy chart to this point, = Expand, = Collapse)</p>
		<div class="tree-cont">
			<panZoom  selector="#g1" :options="{minZoom: 1, maxZoom: 1}"> 
				<div :class="dtype">
					<ul id="g1" class="childs">
						<descend-tree v-if="people && people.id" :loop="loop" :personID="people.id" :loopMax="loopMax" />
					</ul>
				</div>
			</panZoom> 
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	props: ['people', 'dtype', 'loopMax'],
	data() {
		return {
			loop: 1,
		}
	},
	mounted: function() {
		jQuery(document).on('click', 'li.child > span', function() {
			if (jQuery(this).parent().find('.family').first().find('.spouse').first().length) {
				jQuery(this).parent().toggleClass('hide-family')
			}
		})
	}
}
Vue.component('descend-tree', {
	props: ['personID', 'loop', 'loopMax'],
	data() {
		return {
			people: {},
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
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'people_get_full',
				id: this.personID
			})).then(response => {
				this.people = response.data
			}).catch(error => {});
		},
	},
	template: '\
		<li class="child">\
			<span></span>\
			<ul class="family">\
				<li class="root">\
					<div class="ind">\
						<router-link v-if="people.id" :to="{name: \'people-single\', params:{id: people ? people.id : \'\'}}">{{people.name}}</router-link>\
						<span class="tp-sex" v-if="people.sex==\'M\'">♂</span>\
						<span class="tp-sex" v-if="people.sex==\'F\'">♀</span>\
						<div class="date">\
							{{people.birthdate || people.deathdate ? \'(\' : \'\'}}\
							{{people.birthdate  ? \'d.\'+people.birthdate  : \'\'}}\
							{{people.birthdate && people.deathdate ? \', \' : \'\'}}\
							{{people.deathdate  ? \'d.\'+people.deathdate : \'\'}}\
							{{people.birthdate || people.deathdate ? \')\' : \'\'}}\
						</div>\
					</div>\
				</li><li class="spouse" v-for="(family, indexf) in people.families"><div class="ind" v-if="family.husband && family.husband != people.personID">\
						<router-link v-if="family.husbObj.id" :to="{name: \'people-single\', params:{id: family.husbObj ? family.husbObj.id : \'\'}}">{{family.husbObj ? family.husbObj.name: \'Unknown\'}}</router-link>\
						<div class="date" v-if="family.husbObj">\
							{{family.husbObj.birthdate || family.husbObj.deathdate ? \'(\' : \'\'}}\
							{{family.husbObj.birthdate  ? \'d.\'+family.husbObj.birthdate  : \'\'}}\
							{{family.husbObj.birthdate && family.husbObj.deathdate ? \', \' : \'\'}}\
							{{family.husbObj.deathdate  ? \'d.\'+family.husbObj.deathdate : \'\'}}\
							{{family.husbObj.birthdate || family.husbObj.deathdate ? \')\' : \'\'}}\
						</div>\
					</div><div class="ind" v-if="family.wife && family.wife != people.personID">\
						<router-link v-if="family.wifeObj.id" :to="{name: \'people-single\', params:{id: family.wifeObj ? family.wifeObj.id : \'\'}}">{{family.wifeObj ? family.wifeObj.name :  \'Unknown\' }}</router-link>\
						<div class="date" v-if="family.wifeObj">\
							{{family.wifeObj.birthdate || family.wifeObj.deathdate ? \'(\' : \'\'}}\
							{{family.wifeObj.birthdate  ? \'d.\'+family.wifeObj.birthdate  : \'\'}}\
							{{family.wifeObj.birthdate && family.wifeObj.deathdate ? \', \' : \'\'}}\
							{{family.wifeObj.deathdate  ? \'d.\'+family.wifeObj.deathdate : \'\'}}\
							{{family.wifeObj.birthdate || family.wifeObj.deathdate ? \')\' : \'\'}}\
						</div>\
					</div><div class="ind" v-if="(family.wife && !family.husband) && (family.wife == people.personID) || (family.husband && !family.wife) && (family.husband == people.personID)">\
						Unknown\
					</div><ul class="childs" v-if="family.childrens.length  && loopUp < loopMax">\
						<descend-tree v-if="loopUp < loopMax && child.person" :loop="loopUp" v-for="(child, indexc) in family.childrens" :personID="child.person.id" :loopMax="loopMax" v-bind:key="child.id" />\
					</ul>\
				</li>\
			</ul>\
		</li>'
});
</script>