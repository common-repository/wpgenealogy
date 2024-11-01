<template>
	<div class="messages">
		<div class="alert" v-if="messages.length" role="alert" v-for="(message, index) in messages" :class="message.type">
			{{message.text}}
			<button @click="messages.splice(index, 1)" type="button" class="close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['messages'],
	data() {
		return {}
	},
	mounted() {
		var ele = this.$el;
		var eleID = jQuery(this.$el).parents('.modal').attr('id');
		if (eleID) {
			jQuery('#' + eleID).on('shown.bs.modal', function() {
				jQuery(ele).find('.alert').alert('close')
			})
		}
	}
}
</script>