<template>
	<div class="setup">
		<h3 class="top-breadcrumb"><strong>Setup</strong><small>{{currentRoute}} </small> </h3>
		<br>
		<ul class="nav nav-pills border-0 bg-primary-pill">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'setup-configuration'}">Configuration</router-link>
			</li>
			<!-- <li class="nav-item">
				<router-link class="nav-link" :to="{name: 'setup-diagnostics'}">Diagnostics</router-link>
			</li> -->
		</ul>
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {
			currentRoute: 'Configuration',
			hiddenNav: {}
		}
	},
	watch: {
		$route(to, from) {
			if (to.name == 'setup-configuration') {
				this.currentRoute = 'Configuration'
			}
			if (to.name == 'setup-diagnostics') {
				this.currentRoute = 'Diagnostics'
			}
			if (to.name == 'setup-table') {
				this.currentRoute = 'Table Creation'
			}
		}
	}
}
</script>