<template>
	<div class="tree">
		<h3 class="top-breadcrumb"><strong>Tree</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-tree-search'}">Trees</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'tree-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'tree-edit'}">Edit</router-link>
			</li>
		</ul>
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {
			eanableEdit: false,
			currentRoute: 'Search',
		}
	},
	mounted: function() {
		if (this.$route.name == 'tree-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'tree-add') {
			this.currentRoute = 'Add'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'tree-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'tree-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'tree') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'tree-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>