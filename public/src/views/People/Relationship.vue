<template>
	<div class="relationship-container">
		<div class="card">
			<div class="card-body" v-if="!calculated">
				<div class="subhead">
					<h4>Find Relationship</h4>
				</div>
				<br>
				
				<p><span class="normal">To display the relationship between two people, use the 'Find' buttons below to locate the individuals (or keep the people displayed), then click 'Calculate'.</span></p>
				<table class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td valign="top">
								<table>
									<tbody>
										<tr>
											<td>
												<span class="normal"><strong>Person 1: </strong></span>
											</td>
											<td colspan="2">
												<div class="normal">{{query.primaryName}}</div>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Change to (enter the ID): </span>
											</td>
											<td>
												<input type="text" v-model="query.primaryID" class="form-control form-control-sm" size="10">
											</td>
											<td colspan="2">
												<input type="button" @click.prevent="findPeople('primary')" class="btn btn-sm btn-primary" value="Find...">
											</td>
										</tr>
										<tr>
											<td colspan="3">&nbsp;</td>
										</tr>
										<tr>
											<td>
												<span class="normal"><strong>Person 2: </strong></span>
											</td>
											<td colspan="2">
												<div class="normal">{{query.secondryName}}</div>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Change to (enter the ID): </span>
											</td>
											<td>
												<input type="text" v-model="query.secondryID" class="form-control form-control-sm" size="10">
											</td>
											<td colspan="2">
												<input type="button" @click.prevent="findPeople('secondry')" class="btn btn-sm btn-primary" value="Find...">
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td valign="top">
								<div class="searchsidebar">
									<table>
										<tbody>
											<tr>
												<td>Maximum relationships to show:</td>
												<td colspan="2" valign="bottom">
													<select v-model="query.maxrels" class="form-control form-control-sm">
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
													</select>
												</td>
											</tr>
											<tr>
												<td colspan="3">&nbsp;</td>
											</tr>
											<tr>
												<td>Show relationships involving a spouse:&nbsp;</td>
												<td colspan="2" valign="bottom">
													<select v-model="query.disallowspouses" class="form-control form-control-sm">
														<option value="0">Yes</option>
														<option value="1">No</option>
													</select>
												</td>
											</tr>
											<tr>
												<td colspan="3">&nbsp;</td>
											</tr>
											<tr>
												<td>Maximum generations to check:</td>
												<td valign="bottom">
													<select v-model="query.generations" class="form-control form-control-sm">
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
														<option value="11">11</option>
														<option value="12">12</option>
														<option value="13">13</option>
														<option value="14">14</option>
														<option value="15">15</option>
													</select>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>


			<div v-if="calculated" class="card-body">
					{{data.message}}

					<div class="relationship-tree" v-html="data.html"></div>




			</div>
		</div>



		<input v-if="calculated" type="button" value="Calculate Again" @click.prevent="get_relationship_again" class="btn btn-primary mt-4">
		<input v-if="!calculated" type="button" value="Calculate" @click.prevent="get_relationship" class="btn btn-primary mt-4">
		<span v-if="spinner.loading.spinning">
			<button class="btn btn-link mt-4" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading...</span>
			</button>
		</span>
		<people-find :findPeopleArgs="modalProps.findPeopleArgs" @peopleFound="peopleFound" />
	</div>
</template>
<script>
import peopleFind from '@/components/modals/people/Find.vue';
export default {
	props: ['people'],
	components: {
		'people-find': peopleFind
	},
	data() {
		return {
			query: {
				primaryID: this.people.personID,
				primary_id: this.people.id,
				primaryName: this.people.name,
				primarySex: this.people.sex,
				secondryID: '',
				secondry_id: '',
				secondryName: '',
				secondrySex: '',
				maxrels: '10',
				disallowspouses: '',
				generations: '15',
				gedcom: this.people.gedcom,
			},
			type: '',
			calculated: false,
			spinner: {
				loading: {
					spinning: false
				}
			},
			data:{},
			modalProps: {
				findPeopleArgs: {}
			}
		}
	},
	methods: {
		get_relationship() {
			this.spinner.loading.spinning = true;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_relationship',
				query: this.query
			})).then(response => {
				this.data = response.data;
				this.spinner.loading.spinning = false;
				this.calculated = true;
			}).catch(error => {});
		},
		get_relationship_again(){
			this.calculated = false;
		},
		findPeople(type) {
			this.type = type;
			this.modalProps.findPeopleArgs = {
				gedcom: this.people.gedcom
			};
			jQuery('#people-people-find').modal('show')
		},
		peopleFound(people) {
			if (this.type == 'primary') {
				this.query.primaryID = people.personID;
				this.query.primaryName = people.name;
				this.query.primarySex = people.sex;
				
				this.query.primary_id = people.id;
				this.query.gedcom = this.people.gedcom;
			}
			if (this.type == 'secondry') {
				this.query.secondryID = people.personID;
				this.query.secondryName = people.name;
				this.query.secondrySex = people.sex;

				this.query.secondry_id = people.id;
				this.query.gedcom = this.people.gedcom;
			}
			jQuery('#people-people-find').modal('hide')
		}
	}
}
</script>