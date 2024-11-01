<template>
	<div class="migrate">
		<h3 class="top-breadcrumb"><strong>Migrate</strong><small> {{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'import'}">Import</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'export'}">Export</router-link>
			</li>
<!-- 			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'secondary-processes'}">Secondary Processes</router-link>
			</li> -->
		</ul>
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {
			eanableEdit: false,
			currentRoute: 'Import',
		}
	},
	mounted: function() {
		if (this.$route.name == 'export') {
			this.eanableEdit = true
			this.currentRoute = 'Export'
		}
		if (this.$route.name == 'secondary-processes') {
			this.currentRoute = 'Secondary Processes'
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'export') {
				this.eanableEdit = true
				this.currentRoute = 'Export'
			}
			if (to.name != 'chart-edit') {
				this.eanableEdit = false
			}
			if (to.name == 'import') {
				this.currentRoute = 'Import'
			}
			if (to.name == 'secondary-processes') {
				this.currentRoute = 'Secondary Processes'
			}
		}
	}
}
</script>