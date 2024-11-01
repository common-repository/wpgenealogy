<template>
	<div class="tree-search">
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<table class="table table-bordered" v-if="tree.data" style="max-width: 450px;">
					<tbody>
						<tr>
							<td><span>Tree Name</span></td>
							<td width="80">{{tree.data.treename}}</td>
						</tr>
						<tr>
							<td><span>Individuals</span></td>
							<td><router-link :to="{name: 'people-search', params: {query: {gedcom: tree.data.gedcom}}}"> {{tree.data.number_of_peoples}} </router-link></td>
						</tr>
						<tr>
							<td><span>Families</span></td>
							<td><router-link :to="{name: 'family-search', params: {query: {gedcom: tree.data.gedcom}}}"> {{tree.data.number_of_families}} </router-link></td>
						</tr>
					</tbody>
				</table>
			</div> 
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {}
	},
	computed: {
		tree: function(){
			return {
				data: this.$store.getters['tree/data'].data.find(item => item.gedcom == this.$route.params.gedcom),
				loaded: this.$store.getters['tree/data'].loaded
			}
		},

	}
}
</script>