<template>
	<div class="report">
		<h3 class="top-breadcrumb"><strong>Report</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-report-search'}">Reports</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'report-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'report-edit'}">Edit</router-link>
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
		if (this.$route.name == 'report-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'report-add') {
			this.currentRoute = 'Add'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'report-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'report-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-report-search') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'report-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>
