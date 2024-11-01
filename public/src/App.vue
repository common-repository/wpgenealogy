<template>
	<div class="app">
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	mounted: function() {
		this.$store.dispatch('tree/get', this.$data);
		this.$store.dispatch('branch/get', this.$data);
		
		this.$store.dispatch('event_type/get', this.$data);
	}
}
</script>