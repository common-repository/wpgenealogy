<template>
	<div class="note">
		<h3 class="top-breadcrumb"><strong>Note</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard-note-search'}">Notes</router-link>
			</li>
			<li class="nav-item" v-if="eanableEdit">
				<router-link class="nav-link" :to="{name: 'note-edit'}">Edit</router-link>
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
		if (this.$route.name == 'note-edit') {
			this.eanableEdit = true
			this.currentRoute = 'Edit'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'note-edit') {
				this.eanableEdit = true
				this.currentRoute = 'Edit'
			}
			if (to.name != 'note-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'dashboard-note-search') {
				this.currentRoute = 'Search'
			}
		}
	}
}
</script>
