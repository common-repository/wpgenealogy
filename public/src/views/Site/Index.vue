<template>
	<div class="tree-search">
		<h3 class="top-breadcrumb"><strong>Site</strong><small> Search </small> </h3>
		<br>
		<div class="card mb-4">
			<div class="card-body setup-child setup-table">
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td class="fieldnameback fieldname">Search for:</td>
							<td class="databack">
								<input type="text" v-model="s" id="GoogleText" class="form-control form-control-sm">
							</td>
						</tr>
					</tbody>
				</table>
				<br><br>
				<p>Note: This page uses Google to perform its search. The number of matches returned will be directly affected by the extent to which Google has been able to index the site.</p>
				<p class="normal">
					<input type="button" class="btn btn-sm btn-primary" @click.prevent="search" value="Search">
					<input type="reset" class="btn btn-sm btn-primary" @click.prevent="reset" value="Reset">
				</p>
				<br><br>
				<p>
					<router-link :to="{name: 'people-search-advanced'}" class="btn btn-sm btn-primary">» Search People</router-link>
					<router-link :to="{name: 'family-search-advanced'}" class="btn btn-sm btn-primary">» Search Families</router-link>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				s: ''
			}
		},
		methods: {
			search(){
				if(this.s){
					window.location.href = 	'https://www.google.com/search?q=site:'+wpGenealogy.site_url +' '+ this.s
				}
			},
			reset(){
				this.s = ''
			}
		}
	}
</script>