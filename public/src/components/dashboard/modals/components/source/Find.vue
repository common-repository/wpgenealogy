<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Find Source</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p class="subhead">
					<span class="normal">(Enter part of a source name)</span>
				</p>
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>Source: </td>
							<td>
								<input class="form-control form-control-sm w-auto" type="text" v-model="query.title.value">
							</td>
							<td>
								<input class="btn btn-sm btn-primary" type="button" @click.prevent="search" value="Search">
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<div class="form-check form-check-inline">
									<label class="form-check-label">
										<input type="radio" value="startswith" class="form-check-input" v-model="query.title.operator"> starts with </label>
								</div>
								<div class="form-check form-check-inline">
									<label class="form-check-label">
										<input type="radio" value="contains" class="form-check-input" v-model="query.title.operator"> contains </label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div id="results" v-if="sources.data.length">
					<span class="normal"><strong>Search Results</strong> (click to select)</span>
					<br>
					<div v-for="source in sources.data">
						<a href="#" @click.prevent="sourceFound(source)"> {{source.sourceID}} - {{source.title}}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['citationArgs'],
	data() {
		return {
			cid: '',
			messages: [],
			selected: [],
			sources: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 15,
				prev_page_url: null,
				to: 15,
				total: 0,
			},
			sort: 'ID',
			order: 'DESC',
			spinner: {
				delete: {
					spinning: false,
				},
				loading: {
					spinning: true,
				}
			},
			query: {
				title: {
					value: '',
					operator: 'contains',
				}
			},
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		sourceFound: function(source) {
			this.$emit('sourceFound', source);
			this.query.title.value = ''
		},
		search() {
			this.getData()
		},
		getData() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'sources_get_alt',
				current_page: this.sources.current_page,
				per_page: this.sources.per_page,
				sort: this.sort,
				order: this.order,
				query: this.query
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.sources = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
	}
}
</script>