<template>
	<div class="top-nav d-flex justify-content-between" :class="[subNav ? 'sub-nav-open' : '', frontend ? 'top-nav-frontend' : '']">
		<ul class="nav">
			<li class="nav-item nav-item-first">
				<a class="nav-link nav-link-icon" href="">
					<span class="nav-icon avatar" v-bind:style="{ backgroundImage: 'url(' + user.data.avatar + ')' }"></span>
				</a>
			</li>
			<li class="nav-item">
				<router-link class="nav-link nav-link-icon" :to="{name: 'people-search-advanced'}">
					<span class="nav-icon search"></span>
				</router-link>
			</li>
		</ul>
		<ul class="nav">
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'dashboard'}">Dashboard</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{name: 'home'}">Public </router-link>
			</li>
			<li class="nav-item">
				<a class="nav-link" :href="admin_url">WordPress Admin</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" :href="site_url">Site Home</a>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: ['subNav', 'frontend'],
	data() {
		return {
			admin_url: wpGenealogy.admin_url,
			site_url: wpGenealogy.site_url,
			user: wpGenealogy.user
		}
	}
}
</script>
