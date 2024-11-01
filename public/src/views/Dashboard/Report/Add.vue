<template>
	<div class="report-add">
		<div class="card mb-4">
			<div class="card-body">
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td><span>Report Name:</span></td>
							<td><input type="text" class="form-control form-control-sm" v-model="report.reportname" size="50" maxlength="80"></td>
						</tr>
						<tr>
							<td><span>Description:</span></td>
							<td><textarea class="form-control form-control-sm" cols="50" rows="3" v-model="report.reportdesc"></textarea></td>
						</tr>
						<tr>
							<td><span>Rank/Priority:</span></td>
							<td><input type="text" class="form-control form-control-sm" v-model="report.ranking" size="3" maxlength="3" value="1"></td>
						</tr>
						<tr>
							<td><span>Active:</span></td>
							<td><span><input type="radio" v-model="report.active" value="1"> Yes <input type="radio" v-model="report.active" value="0" checked=""> No</span></td>
						</tr>
						<tr>
							<td colspan="2"><strong>Field To Display:</strong></td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('personID') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="personID">PersonID</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('lnprefix') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="lnprefix">Last Name Prefix</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('lastname') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="lastname">Last Name</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('firstname') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="firstname">First Name</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('birthdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="birthdatetr">Birth Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('birthplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="birthplace">Birth place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('deathplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="deathplace">Death Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('deathdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="deathdatetr">Death Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('altbirthdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="altbirthdatetr">Alt Birth Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('altbirthplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="altbirthplace">Alt Birth Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('burialdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="burialdatetr">Burial Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('burialplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="burialplace">Burial Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('baptdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="baptdatetr">Bapt Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('baptplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="baptplace">Bapt Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('confdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="confdatetr">Conf Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('confplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="confplace">Conf Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('initdatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="initdatetr">Init Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('initplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="initplace">Init Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('endldatetr') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="endldatetr">Endl Date</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('endlplace') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="endlplace">Endl Place</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('sex') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="sex">Sex</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('burialtype') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="burialtype">Burial Type</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('nickname') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="nickname">Nick Name</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('title') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="title">Name Title</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('prefix') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="prefix">Name Prefix</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('suffix') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="suffix">Name Suffix</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('living') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="living">Living</label>
								</div>
								<div class="btn-group-toggle d-inline-block">
									<label class="btn btn-secondary btn-sm" :class="report.display.includes('private') ? 'active' : ''">
										<input type="checkbox" v-model="report.display" value="private">Private</label>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="2"><strong>Criteria:</strong></td>
						</tr>
						<tr>
							<td colspan="2">
								<table cellspacing="0" cellpadding="0">
									<tr v-for="(cr, index) in report.criteria">
										<td>
											<select v-model="report.criteria[index].field" class="form-control form-control-sm">
												<option value="">Select Field</option>
												<option value="personID">PersonID</option>
												<option value="lnprefix">Last Name Prefix</option>
												<option value="lastname">Last Name</option>
												<option value="firstname">First Name</option>
												<option value="birthdatetr">Birth Date</option>
												<option value="birthdatetr_day">Birth Date Day</option>
												<option value="birthdatetr_month">Birth Date Month</option>
												<option value="birthdatetr_year">Birth Date Year</option>
												<option value="birthplace">Birth place</option>
												<option value="deathplace">Death Place</option>
												<option value="deathdatetr">Death Date</option>
												<option value="altbirthdatetr">Alt Birth Date</option>
												<option value="altbirthplace">Alt Birth Place</option>
												<option value="burialdatetr">Burial Date</option>
												<option value="burialplace">Burial Place</option>
												<option value="baptdatetr">Bapt Date</option>
												<option value="baptplace">Bapt Place</option>
												<option value="confdatetr">Conf Date</option>
												<option value="confplace">Conf Place</option>
												<option value="initdatetr">Init Date</option>
												<option value="initplace">Init Place</option>
												<option value="endldatetr">Endl Date</option>
												<option value="endlplace">Endl Place</option>
												<option value="sex">Sex</option>
												<option value="burialtype">Burial Type</option>
												<option value="nickname">Nick Name</option>
												<option value="title">Name Title</option>
												<option value="prefix">Name Prefix</option>
												<option value="suffix">Name Suffix</option>
												<option value="living">Living</option>
												<option value="private">Private</option>
											</select>
										</td>
										<td>
											<select v-model="report.criteria[index].oparator" class="form-control form-control-sm">
												<option value="">Select Oparator</option>
												<option value="=">Equal to</option>
												<option value="greater">Greater than</option>
												<option value="less">Less than</option>
												<option value="greater=">Greater than or equal to</option>
												<option value="less=">Less than or equal to</option>
												<option value="!=">Not equal to</option>
											</select>
										</td>
										<td><input v-model="report.criteria[index].value" class="form-control form-control-sm" type="text" name="" placeholder="value"></td>
										<td>
											<select v-model="report.criteria[index].oparatorPrefix" class="form-control form-control-sm">
												<option value="">More</option>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</td>
										<td>
											<button @click.prevent="remove(index)" v-if="index > 0" class="btn btn-sm btn-primary">&times;</button>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td colspan="2"><span><br><b>OR Leave Display, Criteria and Sort fields blank and enter direct SQL SELECT statement here:</b><br></span></td>
						</tr>
						<tr>
							<td colspan="2"><textarea class="form-control form-control-sm" cols="60" rows="4" v-model="report.sqlselect"></textarea></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button @click.prevent="add" class="btn btn-primary primary2">Save</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			spinner: {
				add: {
					spinning: false,
				}
			},
			data: {},
			report: {
				display: [],
				criteria: [{
					oparatorPrefix: '',
					field: '',
					oparator: '',
					value: ''
				}],
				orderby: [],
			},
			temp: {},
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	watch: {
		report: {
			deep: true,
			handler(o, n) {
				let lastKey = Object.keys(n.criteria).pop()
				let lastValue = n.criteria[Object.keys(n.criteria).pop()]
				if (lastValue.oparatorPrefix && lastValue.field && lastValue.oparator && lastValue.value) {
					this.report.criteria.push({
						oparatorPrefix: '',
						field: '',
						oparator: '',
						value: ''
					})
				}
			}
		}
	},
	methods: {
		add: function() {
			this.spinner.add.spinning = true
			const data = {
				action: 'report_add'
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...data,
				...this.report,
			})).then(response => {
				this.spinner.add.spinning = false
				if (response.data.report && response.data.report.id) {
					this.$router.push({
						name: 'dashboard-report-search',
						params: {
							messages: response.data ? [response.data.message] : []
						}
					})
				}
			}).catch(error => {})
		},
		remove(index){
			this.report.criteria.splice(index, 1);
			for (var i = 0; i < this.report.criteria.length; i++) {
				var ind = this.report.criteria.indexOf(this.report.criteria[i]);
				if(ind==(index-1)) {
					this.report.criteria[i].oparatorPrefix = '';
				}
			}
		}
	}
}
</script>