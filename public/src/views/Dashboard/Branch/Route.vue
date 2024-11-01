<template>
	<div class="branch">
		<h3 class="top-breadcrumb"><strong>Branch</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-branch-search'}">Search</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'branch-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'branch-edit'}">Edit</router-link>
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
		if (this.$route.name == 'branch-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'branch-add') {
			this.currentRoute = 'Edit'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'branch-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'branch-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-branch-search') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'branch-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>