<template>
	<div class="tree-search">
		<h3 v-if="tree.data" class="top-breadcrumb"><strong>Tree</strong><small> {{tree.data.gedcom}} </small> </h3>
		<br>
		<router-view />
	</div>
</template>
<script>
export default {
	data(){
		return {

		}
	},
	computed: {
		tree: function(){
			return {
				data: this.$store.getters['tree/data'].data.find(item => item.gedcom == this.$route.params.gedcom),
				loaded: this.$store.getters['tree/data'].loaded
			}
		}
	}
}
</script>