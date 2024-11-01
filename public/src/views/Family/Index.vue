<template>
	<div>
		<message :messages="messages" />
		<div v-if="family && family.id">
			<br>
				<h3 v-if="family">{{family.husbObj ? family.husbObj.name : '' }} {{family.husband && family.wife  ? '/' : ''}} {{family.wifeObj ? family.wifeObj.name : ''}} ({{family.familyID}})</h3>
			<br>
			<ul class="nav nav-pills border-0 bg-primary-pill" >
				<li class="nav-item">
					<router-link class="nav-link" :to="{name: 'family-chart', params:{id: family ? family.id : ''}}"> Family Chart </router-link>
					<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
						<li class="nav-item">
							<a class="nav-link" href="" @click.prevent="scroll('chart')">Chart</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" @click.prevent="pdfFamilyReport({people: '', family: family, type: 'Family Report'})"> PDF </a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" :to="{name: 'family-group-sheet', params:{id: family ? family.id : ''}}"> Group Sheet </router-link>
					<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
						<li class="nav-item">
							<a class="nav-link" href="" @click.prevent="scroll('chart')">Group Sheet</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" @click.prevent="pdfFamilyReport({people: '', family: family, type: 'Family Report'})"> PDF </a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" :to="{name: 'family-edit', params: {id: family.id}}"> Edit </router-link>
				</li>
				<li class="nav-item" v-if="(!user) || (user && !user.data) || (user && user.data && !user.data.meta) || (user && user.data && user.data.meta && user.caps.allow_edit_data==false)">
					<router-link class="nav-link" :to="{name: 'family-suggest', params:{id: family ? family.id : ''}}"> Suggest </router-link>
					<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
						<li class="nav-item">
							<a class="nav-link" href="" @click.prevent="scroll('change')">Suggest a change</a>
						</li>
						
					</ul>
				</li>
			</ul>
			<br>
			<br>
			<br>
			<router-view v-if="family.id" :family="family" />
		</div>
		<div v-if="!family.id">
			<div v-if="spinner.loading.spinning">
				<button class="btn btn-link" type="button">
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					<span> Loading...</span>
				</button>
			</div>
		</div>
		<pdf :pdfArg="pdfArg" />


	</div>
</template> 
<script>
import Message from '@/components/dashboard/Message.vue';
import Pdf from '@/components/Pdf/FamilyReport.vue';
export default {
	components: {
		'pdf': Pdf,
		'message': Message,
	},
	data: function() {
		return {
			messages: [],
			family: {},
			spinner: {
				loading: {
					spinning: true
				}
			},
			pdfArg: {

			}
		}
	},
	mounted: function() {
		this.getData()
	},
	watch: {
		$route(to, from) {
			if(to.path !=from.path) {
				this.getData()
			}
		}
	},
	computed: {
		user:function(){
			return wpGenealogy.user
		},
	},
	methods: {
		getData() {
			this.messages = []
			this.family = {}
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'family_get_full',
				id: this.$route.params.id
			})).then(response => {
				this.family = response.data
				if(response.data.messages){
					this.messages = response.data.messages
				}
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		pdfFamilyReport(pdfArg){
			window.print()
		}
	}
} 
</script>