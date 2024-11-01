<template>
	<div class="user">
		<h3 class="top-breadcrumb"><strong>User</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-user-search'}">Search</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'user-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'user-edit'}">Edit</router-link>
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
		if (this.$route.name == 'user-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit User'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'user-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit User'
			}
			if (to.name != 'user-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-user-search') {
				this.currentRoute = 'Search User'
			}
			if (to.name == 'user-add') {
				this.currentRoute = 'Add New User'
			}
		}
	}
}
</script>