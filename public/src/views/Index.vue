<template>
	<div>
		<div class="row front-wedget bg-white" v-if="setting.configuration.general.home_content.display=='yes'">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<h1 class="pt-4"><strong v-html="setting.configuration.general.home_content.heading"></strong></h1>
						<p class="pt-4 pb-4" v-html="setting.configuration.general.home_content.paragraph"></p>
						<a class="btn btn-primary" :href="setting.configuration.general.home_content.button.url ? setting.configuration.general.home_content.button.url : '#/surname/all'">{{setting.configuration.general.home_content.button.text}}</a>
					</div>
					<div class="col-md-6">
						<img class="w-100" :src="setting.configuration.general.home_content.image_url">
					</div>
				</div>
			</div>
		</div>

		<div class="row  front-wedget">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h4 class="text-center discover-more text-white mb-4"><strong> Discover More</strong></h4>
						<br>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<ul class="nav flex-column">
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'surname-list'}">Surnames</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'people-search-advanced'}">Advanced Search</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'family-search-advanced'}">Search Families</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'site-search'}">Search Site</router-link>
							</li>
							<li v-if="setting.configuration.general.toogle.place=='active'" class="nav-item">
								<router-link class="nav-link" :to="{name: 'place-search'}">Places</router-link>
							</li>
							<li v-if="setting.configuration.general.toogle.anniversary=='active'" class="nav-item">
								<router-link class="nav-link" :to="{name: 'anniversaries'}">Dates and Anniversaries</router-link>
							</li>
							<li v-if="setting.configuration.general.toogle.calender=='active'" class="nav-item">
								<router-link class="nav-link" :to="{name: 'calender'}">Calender</router-link>
							</li>
						</ul>
					</div>
					
					<div class="col-md-3">
						<!-- <ul class="nav flex-column">
							<li class="nav-item"><a href="" class="nav-link">Cemeteries</a></li>
							<li class="nav-item"><a href="" class="nav-link">Bookmarks</a></li>
							<li class="nav-item"><a href="" class="nav-link">Photos</a></li>
							<li class="nav-item"><a href="" class="nav-link">Documents</a></li>
							<li class="nav-item"><a href="" class="nav-link">Headstones</a></li>
							<li class="nav-item"><a href="" class="nav-link">Histories</a></li>
							<li class="nav-item"><a href="" class="nav-link">Recordings</a></li>
						</ul> -->
					</div> 
					
					<div class="col-md-3">
						<ul class="nav flex-column">
							<!-- 
							<li class="nav-item"><a href="" class="nav-link">Videos</a></li>
							<li class="nav-item"><a href="" class="nav-link">All Media</a></li>
							<li class="nav-item"><a href="" class="nav-link">Albums</a></li> 
							-->
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'new'}">What's New</router-link>
							</li>
							<!--  
							<li class="nav-item"><a href="" class="nav-link">Most Wanted</a></li> 
							-->
							<li v-if="setting.configuration.general.toogle.report=='active'" class="nav-item">
								<router-link class="nav-link" :to="{name: 'reports'}">Reports</router-link>
							</li>
							<li v-if="setting.configuration.general.toogle.statistics=='active'" class="nav-item">
								<router-link class="nav-link" :to="{name: 'statistics'}">Statistics</router-link>
							</li>
							
						</ul>
					</div>
					<div class="col-md-3">
						<ul class="nav flex-column">
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'tree'}">Trees</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'note-search'}">Notes</router-link>
							</li>
							<!-- 
							<li class="nav-item"><a href="" class="nav-link">Spources</a></li>
							<li class="nav-item"><a href="" class="nav-link">Repotories</a></li>
							<li class="nav-item"><a href="" class="nav-link">DNA Tests</a></li>
							<li class="nav-item"><a href="" class="nav-link">Access Log</a></li> 
							-->
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	
export default {
	data() {
		return {
			query: {
				firstname: {
					operator: 'contains',
					value: ''
				},
				lastname: {
					operator: 'contains',
					value: ''
				}
			},
			user: wpGenealogy.user,
			wp_logout_url: wpGenealogy.wp_logout_url,
			wp_registration_url: wpGenealogy.wp_registration_url,
			plugin_dir_url: wpGenealogy.plugin_dir_url
		}
	},
	computed: {
		wp_login_url() {
			let redirect_to = wpGenealogy.dashboard_page + '#' + this.$route.fullPath;
			redirect_to = encodeURIComponent(redirect_to)
			let wp_login_url = wpGenealogy.wp_login_url + '?redirect_to=' + redirect_to;
			return wp_login_url;
		},
		setting(){
			return wpGenealogy.setting
		}
	},
	methods: {
		search() {
			if (this.query.firstname || this.query.lastname) {
				this.$router.push( {
					name: 'people-search',
					params: {
						query: this.query
					}
				})
			}
		}
	}
}
</script>
