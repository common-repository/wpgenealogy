<template>
	<div class="timeline">
		<h3 class="top-breadcrumb"><strong>Timeline</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-timeline-search'}">Timelines</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'timeline-add'}">Add New</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'timeline-edit'}">Edit</router-link>
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
		if (this.$route.name == 'timeline-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
		if (this.$route.name == 'timeline-add') {
			this.currentRoute = 'Add'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'timeline-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'timeline-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-timeline-search') {
				this.currentRoute = 'Search'
			}
			if (to.name == 'timeline-add') {
				this.currentRoute = 'Add'
			}
		}
	}
}
</script>
