<template>
	<ul class="pagination mb-0">
		<li class="page-item">
			<a class="page-link" @click.prevent="prevPage" href="#">Previous</a>
		</li>
		<li v-if="data.last_page>0" :class="1==data.current_page ? 'page-item active': 'page-item'">
			<a class="page-link" href="#" @click.prevent="data.current_page = 1">1</a>
		</li>
		<li v-if="data.current_page >= 4" class="page-item">
			<a class="page-link" href="#">..</a>
		</li>
		<li v-if="data.current_page >= 3" class="page-item">
			<a class="page-link" href="#" @click.prevent="data.current_page = data.current_page-1">{{data.current_page-1}}</a>
		</li>
		<li v-if="data.current_page+1 <= data.last_page && data.current_page >= 2" class="page-item active">
			<a class="page-link" href="#" @click.prevent="">{{data.current_page}}</a>
		</li>
		<li v-if="data.current_page+2 <= data.last_page" class="page-item">
			<a class="page-link" href="#" @click.prevent="data.current_page = data.current_page+1">{{data.current_page+1}}</a>
		</li>
		<li v-if="data.current_page+3 <= data.last_page" class="page-item">
			<a class="page-link" href="#">..</a>
		</li>
		<li v-if="data.last_page>1" :class="data.last_page==data.current_page ? 'page-item active': 'page-item'">
			<a class="page-link" href="#" @click.prevent="data.current_page = data.last_page">{{data.last_page}}</a>
		</li>
		<li class="page-item">
			<a class="page-link" @click.prevent="nextPage" href="#">Next</a>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'pagination',
		props: ['data'],
		data() {
			return {}
		},
		watch: {
			'data.current_page': function(newValue, oldValue) {
				this.$emit('currentPageChanged')
			},
		},
		methods: {
			nextPage: function() {
				if ((this.data.current_page * this.data.per_page) < this.data.total) {
					this.data.current_page++;
				}
			},
			prevPage: function() {
				if (this.data.current_page > 1) this.data.current_page--;
			}
		}
	}
</script>