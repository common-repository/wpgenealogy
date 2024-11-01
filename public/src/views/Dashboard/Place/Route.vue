<template>
	<div class="place">
		<h3 class="top-breadcrumb"><strong>Place</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-place-search'}">Places</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'place-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'place-edit'}">Edit</router-link>
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
		if (this.$route.name == 'place-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'place-add') {
			this.currentRoute = 'Add'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'place-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'place-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-place-search') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'place-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>
