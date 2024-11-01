<template>
	<div>
		<todo :todoArgs="todoArgs" :todoNew="todoNew"/>
		<h3 class="top-breadcrumb">
			<strong>Dashboard</strong>
			<small> Admin </small> 
			<a class="float-right small btn btn-sm btn-icon btn-icon-imp btn-icon-left no-bg" @click.prevent="todo">Tasks</a> 
		</h3>
		<br>
		<h4 class="mb-0">Family Information</h4>
		<div class="row">
			<div class="col-md-12">
				<div class="dashboard-cards">
					<div class="dashboard-card active">
						<div class="badge">{{counter.people}}</div>
						<div class="icon people">
						</div>
						<h4>People</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-people-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'people-add'}"> Add </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'people-review'}"> Review </router-link>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="badge">{{counter.family}}</div>
						<div class="icon family">
						</div>
						<h4>Family</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-family-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'family-add'}"> Add </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'family-review'}"> Review </router-link>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="badge">{{counter.place}}</div>
						<div class="icon places">
						</div>
						<h4>Places</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-place-search'}">Find</router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'place-add'}">Add</router-link>
						</div>
					</div>
					<div v-if="plan=='premium'" class="dashboard-card">
						<div class="badge">{{counter.note}}</div>
						<div class="icon notes">
						</div>
						<h4>Notes</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-note-search'}">Find</router-link>
						</div>
					</div>
					<!-- 
					<div class="dashboard-card">
						<div class="icon media">
						</div>
						<h4>Media</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="badge">{{counter.source}}</div>
						<div class="icon sources">
						</div>
						<h4>Sources</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="icon repository">
						</div>
						<h4>Repositories</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> -->
					<!-- <div class="dashboard-card">
						<div class="icon cemeteries">
						</div>
						<h4>Cemeteries</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> -->
					<!-- <div class="dashboard-card">
						<div class="icon DNA">
						</div>
						<h4>DNA Test</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> 
					-->
				</div>
			</div>
		</div>
		<br>
		<br>
		<h4 class="mb-0">Display and Reporting</h4>
		<div class="row">
			<div class="col-md-12">
				<div class="dashboard-cards display">
					<div class="dashboard-card">
						<div class="badge">{{counter.tree}}</div>
						<div class="icon tree">
						</div>
						<h4>Trees</h4>
						<div class="buttons">
							<div class="buttons">
								<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-tree-search'}"> Find </router-link>
								<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'tree-add'}"> Add </router-link>
							</div>
						</div>
					</div>

					<div class="dashboard-card">
						<div class="icon branch">
						</div>
						<h4>Branches</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-branch-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'branch-add'}"> Add </router-link>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="icon chart">
						</div>
						<h4>Charts</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-chart-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'chart-add'}"> Add </router-link>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="icon report">
						</div>
						<h4>Reports</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-report-search'}"> Click Here </router-link>

						</div>
					</div> 
					<div class="dashboard-card">
						<div class="icon timeline_events">
						</div>
						<h4>Timeline Events</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-timeline-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'timeline-add'}"> Add </router-link>
						</div>
					</div>
					<!-- 
					<div class="dashboard-card">
						<div class="icon album">
						</div>
						<h4>Albums</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> 
					-->
				</div>
			</div>
		</div>
		<br>
		<br>
		<h4 class="mb-0">Administration Tools</h4>
		<div class="row">
			<div class="col-md-12">
				<div class="dashboard-cards admin-tool">
					<div class="dashboard-card">
						<div class="icon setup">
						</div>
						<h4>Setup</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'setup-configuration'}"> Configuration </router-link>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="icon users">
						</div>
						<h4>Users</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-user-search'}"> Find </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'user-add'}"> Add </router-link>
						</div>
					</div>
					<!-- 
					<div class="dashboard-card">
						<div class="icon modManeger">
						</div>
						<h4>Mod Manager</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> -->
					<!-- 
					<div class="dashboard-card">
						<div class="icon utility">
						</div>
						<h4>Utilities</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div>
					<div class="dashboard-card">
						<div class="icon miscellaneous">
						</div>
						<h4>Miscellaneous</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> -->
					<div v-if="plan=='premium'" class="dashboard-card">
						<div class="icon import">
						</div>
						<h4>Import / Export</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'import'}"> Import </router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'export'}"> Export </router-link>
						</div>
					</div>
					<!-- 
					<div class="dashboard-card">
						<div class="icon language">
						</div>
						<h4>Language</h4>
						<div class="buttons">
							<a class="btn btn-sm btn-outline-secondary" href="">Click Here</a>
						</div>
					</div> -->
					<div class="dashboard-card">
						<div class="badge">{{counter.event_type}}</div>
						<div class="icon custom_event_type">
						</div>
						<h4>Custom Event Types</h4>
						<div class="buttons">
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'dashboard-event-type-search'}">Find</router-link>
							<router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'event-type-add'}">add</router-link>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import todo from '@/components/dashboard/modals/todo/Index.vue';
import FlipClock from 'flipclock';
export default {
	name: "dashboard",
	components: {
		'todo': todo
	},
	data() {
		return {
			counter: {

			},
			plan: wpGenealogy.plan,
			todoArgs: {},
			todoNew:{}
		}
	},
	created: function() {
		this.getData();



	},
	methods: {
		getData() {
			const data = {
				action: 'counter',
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.counter = response.data
			}).catch(error => {});
		},
		todo() {
			jQuery('#todo').modal('show')
		},
	}
}
</script>