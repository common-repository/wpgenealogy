<template>
	<div class="route route-dashboard" v-if="wpGenealogy.user.ID">
		<nav-top :subNav="subNav" />
		<nav-left />
		<div class="pages" :class="subNav ? 'sub-nav-open' : ''">
			<router-view />
		</div>
		
	</div>
</template>
<script>
import Nav from '@/components/dashboard/Nav.vue'
import NavLeft from '@/components/dashboard/NavLeft.vue'
export default {
	components: {
		'nav-top': Nav,
		'nav-left': NavLeft,
	},
	data() {
		return {
			wpGenealogy: wpGenealogy
		}
	},
	beforeCreate() {
		let redirect_to = wpGenealogy.dashboard_page+'#'+this.$route.fullPath;
		redirect_to = encodeURIComponent(redirect_to)
		if(!wpGenealogy.user.ID) {
			window.location.href = wpGenealogy.wp_login_url+'?redirect_to='+redirect_to;
		}
	},
	computed: {
		subNav(){
			if(this.$route.path.includes('dashboard/people') || this.$route.path.includes('dashboard/family') || this.$route.path.includes('dashboard/tree') || this.$route.path.includes('dashboard/branch')) {
				return true
			}
			return false
		}
	},
	methods: {

	}
}
</script>