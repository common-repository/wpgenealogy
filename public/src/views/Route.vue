<template>
	<div class="route route-frontend">
		<nav-top :frontend="frontend" />
		<div class="pages">
			<router-view />
		</div>
	</div>
</template>
<script>
import NavTop from '@/components/dashboard/Nav.vue'
export default {
	name: 'app',
	components: {
		'nav-top': NavTop
	},
	data() {
		return {
			frontend: 'frontend'
		}
	}
}
</script>
