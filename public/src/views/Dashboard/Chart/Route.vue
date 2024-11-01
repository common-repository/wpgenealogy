<template>
	<div class="chart">
		<h3 class="top-breadcrumb"><strong>Charts</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-chart-search'}">Search</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'chart-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'chart-edit'}">Edit</router-link>
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
		if (this.$route.name == 'chart-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'chart-add') {
			this.currentRoute = 'Add'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'chart-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'chart-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-chart-search') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'chart-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>