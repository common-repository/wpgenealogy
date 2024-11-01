<template>
	<div class="d-inline">
		<router-link :to="{name: 'people-single', params:{id: people.id}}"> {{people.name}} </router-link> 
		<span v-if="people.age">(Age {{people.age}} years)</span>
		<span v-if="people.birthdate || people.birthplace"><br>
			<strong>b.</strong> {{people.birthdate}}
			<span v-if="people.birthplace">, {{people.birthplace}} 
				<router-link class="admin-find-icon-new fnvm" v-if="people.birthplace" :to="{name:'place-single', params: {place: people.birthplace}}"></router-link>
			</span>
		</span>
		<span v-if="people.deathdate || people.deathplace"><br>
			<strong>d.</strong> {{people.deathdate}} 
			<span v-if="people.deathplace">, {{people.deathplace}} 
				<router-link class="admin-find-icon-new fnvm" v-if="people.deathplace" :to="{name:'place-single', params: {place: people.deathplace}}"></router-link>
			</span>
		</span>
		<span v-if="child">
			<span v-if="frel"> [{{frel}}] </span>
			<span v-if="mrel"> [{{mrel}}] </span>
			<span v-if="!mrel && !frel"> [Natural] </span>
		</span>
	</div>
</template>
<script>
export default {
	props: ['people', 'frel', 'mrel', 'child'],
	data() {
		return {}
	}
}
</script>