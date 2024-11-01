<template>
	<div class="note mw-1140">
		<h3 class="top-breadcrumb"><b>What's New</b> </h3>
		<br>
		<div class="card">
			<div class="card-body">
				<div class="card mb-4" v-if="data.people">
					<div class="card-body">
						<h3>Individuals</h3>
						<hr>
						<table class="table table-striped">
							<thead>
								<tr>
								<th>ID</th>
								<th>Last Name, Given Name(s)</th>
								<th>Born/Christened</th>
								<th>Location</th>
								<th><b>Tree | Branch</b></th>
								<th width="230">Last Modified</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="people in data.people">
									<td>{{people.personID}}</td>
									<td>{{people.lastname}}</td>
									<td>{{people.birthdate}}</td>
									<td>{{people.birthplace}}</td>
									<td>{{people.gedcom}} | {{people.branch}}</td>
									<td>{{people.updated_at}}</td>

								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card mb-4" v-if="data.family">
					<div class="card-body">
						<h3>Families</h3>
						<hr>
						<table class="table table-striped">
							<thead>
								<tr>
								<th>ID</th>
								<th>Father ID</th>
								<th>Father's Name</th>
								<th>Mother ID</th>
								<th>Mother's Name</th>
								<th>Married</th>
								<th>Tree | Branch</th>
								<th width="230">Last Modified</th></tr>
							</thead>
							<tbody>
								<tr v-for="family in data.family">
									<td>{{family.familyID}}</td>
									<td>{{family.husband}}</td>
									<td>{{family.husband ? family.husband_obj.name : ''}}</td>
									<td>{{family.wife}}</td>
									<td>{{family.wife ? family.wife_obj.name : ''}}</td>
									<td>{{family.marrdate}}</td>
									<td>{{family.gedcom}} | {{family.branch}}</td>
									<td>{{family.updated_at}}</td>
								</tr>
							</tbody>
						</table>
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
			data: {},
			spinner: {
				loading: {
					spinning: true
				}
			},
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData: function() {
			this.data = {}
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'whats_new',
			})).then(response => {
				this.data = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
	}
}
</script>