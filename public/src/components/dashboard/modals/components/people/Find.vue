<template>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Find Person ID</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div>(enter part of first and/or last name)</div>
				<table class="table table-borderless">
					<thead>
						<tr>
							<th colspan="2"><strong>First Name</strong></th>
							<th colspan="2"><strong>Last Name</strong></th>
							<th colspan="2"><strong>Person ID</strong></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="2">
								<input class="form-control form-control-sm w-auto mb-3" type="text" v-model="query.firstname.value">
							</td>
							<td colspan="2">
								<input class="form-control form-control-sm w-auto mb-3" type="text" v-model="query.lastname.value">
							</td>
							<td colspan="2">
								<input class="form-control form-control-sm w-auto mb-3" type="text" v-model="query.personID.value">
							</td>
						</tr>
						<tr>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-startswith-firstname'" value="startswith" v-model="query.firstname.operator">
									<label class="custom-control-label" :for="cid+'-startswith-firstname'">startswith</label>
								</div>
							</td>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-contains-firstname'" value="contains" v-model="query.firstname.operator">
									<label class="custom-control-label" :for="cid+'-contains-firstname'">contains</label>
								</div>
							</td>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-startswith-lastname'" value="startswith" v-model="query.lastname.operator">
									<label class="custom-control-label" :for="cid+'-startswith-lastname'">startswith</label>
								</div>
							</td>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-contains-lastname'" value="contains" v-model="query.lastname.operator">
									<label class="custom-control-label" :for="cid+'-contains-lastname'">contains</label>
								</div>
							</td>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-equals-personID'" value="equals" v-model="query.personID.operator">
									<label class="custom-control-label" :for="cid+'-equals-personID'">equals</label>
								</div>
							</td>
							<td>
								<div class="custom-control custom-radio mr-sm-2">
									<input type="radio" class="custom-control-input" :id="cid+'-contains-personID'" value="contains" v-model="query.personID.operator">
									<label class="custom-control-label" :for="cid+'-contains-personID'">contains</label>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="6" class="text-right">
								<input class="btn btn-sm btn-primary" @click.prevent="search" type="button" value="Search">
							</td>
						</tr>
					</tbody>
				</table>
				<div class="results-table" v-if="peoples.data && peoples.data.length">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Person ID </th>
								<th>Name</th>
								<th>Birth Date</th>
								<th>Death Date </th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="people in peoples.data" @click="peopleFound(people)">
								<td>
									<div>{{people.personID}}</div>
								</td>
								<td>{{people.name}}</td>
								<td>{{people.birthdate}}</td>
								<td>{{people.deathdate}}</td>
							</tr>
						</tbody>
					</table>
					<nav aria-label="Page navigation example">
						<pagination :data="peoples" @currentPageChanged="currentPageChanged" />
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Pagination from '@/components/dashboard/Pagination.vue';
export default {
	props: ['findPeopleArgs'],
	components: {
		'pagination': Pagination,
	},
	data() {
		return {
			cid: '',
			query: {
				firstname: {
					operator: 'contains',
					value: ''
				},
				lastname: {
					operator: 'contains',
					value: ''
				},
				personID: {
					operator: 'equals',
					value: ''
				},
			},
			watch: {
				'peoples.current_page': function(newValue, oldValue) {
					this.getData();
				},
				sort: function(newValue, oldValue) {
					this.getData();
				},
				order: function(newValue, oldValue) {
					this.getData();
				},
			},
			peoples: {
				current_page: 1,
				data: [],
				first_page_url: null,
				from: 1,
				last_page: 0,
				last_page_url: null,
				next_page_url: null,
				path: '',
				per_page: 25,
				prev_page_url: null,
				to: 25,
				total: 0,
			},
			spinner: {
				loading: {
					spinning: false,
				}
			},
		}
	},
	mounted() {
		this.cid = this._uid
	},
	methods: {
		currentPageChanged() {
			this.getData();
		},
		peopleFound: function(people) {
			this.$emit('peopleFound', people);
		},
		search: function() {
			this.getData();
		},
		getData: function() {
			this.spinner.loading.spinning = true;
			const data = {
				action: 'peoples_get_alt',
				current_page: this.peoples.current_page,
				per_page: this.query.per_page ? this.query.per_page : this.peoples.per_page,
				query: {
					...this.query,
					...this.findPeopleArgs
				}
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.peoples = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
	}
}
</script>