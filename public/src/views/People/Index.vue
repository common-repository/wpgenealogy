<template>
	<div>
		<message :messages="messages" />

		<div v-if="people.id">
			<div class="people-header">
				<br>
				<h3 v-if="people.id">{{people.name}} ({{people.personID}})</h3>
				<p class="small text-muted">{{people.birthdatetr}} - {{people.deathdatetr}} ({{people.age}} years)</p>
				<br>
				<ul class="nav nav-pills border-0 bg-primary-pill" v-if="people.id">
					<li class="nav-item">
						<router-link class="nav-link nav-link-icon nav-link-indi" :to="{name: 'people-single', params:{id: people.id ? people.id : ''}}"> Individual </router-link>
						<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
							<li class="nav-item">
								<a class="nav-link" href="" @click.prevent="scroll('information')">Personal Information</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="" @click.prevent="scroll('notes')">Notes</a>
							</li>
							<!-- 
							<li class="nav-item">
								<a class="nav-link" href="" @click.prevent="scroll('sources')">Sources</a>
							</li> 
							-->
							<!--
							<li class="nav-item">
								<a class="nav-link" href="" @click.prevent="scroll('all')">All</a>
							</li>
							-->
							<li class="nav-item">
								<a class="nav-link" @click.prevent="pdfIndividualReport({people: people, family: '', type: 'Individual Report'})">PDF</a>
							</li>
						</ul>
					</li>
					<li class="nav-item">
						<router-link v-if="family.id" class="nav-link  nav-link-icon nav-link-family" :to="{name: 'family-chart', params:{ id: family ? family.id : '' }}"> Family </router-link>
						<a v-if="!family.id" @click.prevent="" href="" title="No Family" class="nav-link  nav-link-icon nav-link-family disabled"> Family </a>
					</li>
					<li v-if="plan == 'premium'" class="nav-item">
						<router-link class="nav-link  nav-link-icon nav-link-pedigree" :to="{name: 'people-pedigree', params:{id: people.id ? people.id : ''}}"> Ancestors </router-link>
						<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
							<li class="nav-item">
								<a class="nav-link"> Generations: </a>
							</li>
							<li class="nav-item mr-3">
								<select v-model="loopMax" class="form-control form-control-sm mt-1">
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
								</select>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree standard' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree standard'"> Standard </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree vertical' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree vertical'"> Vertical </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree compact' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree compact'"> Compact </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree box' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree box'"> Box </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree text' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree text'"> Text </a>
							</li>
							<!--
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree ahnentafel' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree ahnentafel'"> Ahnentafel </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="ptype == 'pedigree fan' ? 'exact-active active' : ''" @click.prevent="ptype = 'pedigree fan'"> Fan Chart </a>
							</li>
							<li class="nav-item">
								<a class="nav-link disabled"> Media </a>
							</li>
							-->
							<li class="nav-item">
								<a class="nav-link" @click.prevent="pdfPedigree({people: people, family: '', type: 'Individual Report'})"> PDF </a>
							</li>
						</ul>
					</li>
					<li class="nav-item">
						<router-link class="nav-link  nav-link-icon nav-link-descend" :to="{name: 'people-descend', params:{id: people.id ? people.id : ''}}"> Descendants </router-link>
						<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
							<li class="nav-item">
								<a class="nav-link"> Generations: </a>
							</li>
							<li class="nav-item mr-3">
								<select v-model="loopMax" class="form-control form-control-sm mt-1">
									<option value="3">2</option>
									<option value="4">3</option>
									<option value="5">4</option>
									<option value="6">5</option>
								</select>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="dtype == 'descend standard' ? 'exact-active active' : ''" @click.prevent="dtype = 'descend standard'"> Standard </a>
							</li>
							<li v-if="plan == 'premium'" class="nav-item">
								<a class="nav-link" :class="dtype == 'descend compact' ? 'exact-active active' : ''" @click.prevent="dtype = 'descend compact'"> Compact </a>
							</li>
							<li v-if="plan == 'premium'" class="nav-item">
								<a class="nav-link" :class="dtype == 'descend-text' ? 'exact-active active' : ''" @click.prevent="dtype = 'descend-text'"> Text </a>
							</li>
							<!-- <li class="nav-item">
								<a class="nav-link disabled"> Register </a>
							</li> -->
							<li class="nav-item">
								<a class="nav-link" @click.prevent="pdfDescend({people: people, family: '', type: 'Individual Report'})"> PDF </a>
							</li>
						</ul>
					</li>
					
					<li  v-if="plan == 'premium'" class="nav-item">
						<router-link class="nav-link nav-link-icon nav-link-relationship" :to="{name: 'people-relationship', params:{id: people.id ? people.id : ''}}"> Relationship </router-link>
						<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'people-relationship', params:{id: people.id ? people.id : ''}}" >Relationship</router-link>
							</li>
						</ul>
					</li>
					<li  v-if="plan == 'premium'" class="nav-item">
						<router-link class="nav-link nav-link-icon nav-link-timeline" :to="{name: 'people-timeline', params:{id: people.id ? people.id : ''}}"> Timeline </router-link>
						<ul class="nav nav-pills nav-pills-sub border-0 bg-primary-pill">
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'people-timeline', params:{id: people.id ? people.id : ''}}" >Timeline</router-link>
							</li>
						</ul>
					</li>
					<!--
					<li class="nav-item">
						<a class="nav-link disabled  nav-link-icon nav-link-gedcom" href="#">GEDCOM</a>
					</li>
					-->
					<li class="nav-item" v-if="(!user) || (user && !user.data) || (user && user.data && !user.data.meta) || (user && user.data && user.data.meta && user.caps.allow_edit_data==false)">
						<router-link class="nav-link" :to="{name: 'people-suggest', params:{id: people.id ? people.id : ''}}"> Suggest </router-link>
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
			</div>
			<router-view v-if="people.id" :people="people" :dtype="dtype" :ptype="ptype" :loopMax="loopMax" />
		</div>
		<div v-if="!people.id">
			<div v-if="spinner.loading.spinning">
				<button class="btn btn-link" type="button">
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					<span> Loading...</span>
				</button>
			</div>
		</div>
		<individual-report-pdf :pdfArg="pdfArg" />
		<pedigree-pdf :pdfArg="pdfArg" />
		<descend-pdf :pdfArg="pdfArg" />
	</div>
</template>
<script>

import IndividualReport from '@/components/Pdf/IndividualReport.vue';
import Pedigree from '@/components/Pdf/Pedigree.vue';
import Descend from '@/components/Pdf/Descend.vue';
import Message from '@/components/dashboard/Message.vue';

export default {
	components: {
		'individual-report-pdf': IndividualReport,
		'pedigree-pdf': Pedigree,
		'descend-pdf': Descend,
		'message': Message,

	},
	data() {
		return {
			user: wpGenealogy.user,
			people: {},
			family: {},
			loopMax: 5,
			dtype: 'descend standard',
			ptype: 'pedigree standard',
			spinner: {
				loading: {
					spinning: true
				}
			},
			pdfArg: {

			},
			plan: wpGenealogy.plan,
			messages: []
		}
	},
	watch: {
		$route(to, from) {
			if (to.path != from.path) {
				this.getData()
			}
		}
	},
	mounted: function() {
		this.getData()
	},
	methods: {
		scroll(secId) {
			jQuery('html, body').animate({
				scrollTop: jQuery('#sec-' + secId).offset().top
			}, 'fast');
		},
		getData() {
			this.people = {}
			this.family = {}
			this.messages = []
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'people_get_full',
				id: this.$route.params.id
			})).then(response => {
				this.people = response.data
				if (this.people.id && this.people.families.length) {
					this.family = this.people.families[0]
				}

				if(response.data.messages){
					this.messages = response.data.messages
				}

				this.spinner.loading.spinning = false;
			}).catch(error => {})
		},
		pdfIndividualReport(pdfArg){

			window.print()
			//this.pdfArg = pdfArg
			//jQuery('#pdf-individual-report').modal('show')
		},
		pdfPedigree(pdfArg){
			this.pdfArg = pdfArg
			jQuery('#pdf-pedigree').modal('show')
		},
		pdfDescend(pdfArg){
			this.pdfArg = pdfArg
			jQuery('#pdf-descend').modal('show')
		},
	}
}
</script>