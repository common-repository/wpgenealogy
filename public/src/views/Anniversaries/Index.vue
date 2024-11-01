<template>
	<div class="anniversaries-main">
		<h3 class="top-breadcrumb"><b>Anniversaries</b></h3>
		<br>
		<div class="card mb-4">
			<div class="card-body">
				<span class="normal">Tree: </span>
				<select class="form-control form-control-sm w-auto" v-model="query.gedcom" id="treeselect">
					<option value="">Select Tree</option>
					<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
				</select>
				<br>
				<br>
				<p class="normal"> Enter date components to see matching events. Leave a field blank to see matches for all.</p>
				<div class="d-inline-block normal">
					<label for="tngevent">Event:</label>
					<br>
					<select class="form-control form-control-sm w-auto" v-model="query.event" id="tngevent">
						<option value="">Event Type</option>
						<option v-for="event_type in event_types.data" :value="event_type.tag">{{event_type.display}}</option>
						</select>
					</select>
				</div>
				<div class="d-inline-block normal">
					<label for="tngdaymonth">Day:</label>
					<br>
					<select class="form-control form-control-sm" v-model="query.day" id="tngdaymonth">
						<option value=""></option>
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
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
						<option value="21">21</option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
						<option value="27">27</option>
						<option value="28">28</option>
						<option value="29">29</option>
						<option value="30">30</option>
						<option value="31">31</option>
					</select>
				</div>
				<div class="d-inline-block normal">
					<label for="tngmonth" class="annlabel">Month:</label>
					<br>
					<select class="form-control form-control-sm" v-model="query.month" id="tngmonth">
						<option value=""></option>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>
				<div class="d-inline-block normal">
					<label for="tngyear">Year:</label>
					<br>
					<input class="form-control form-control-sm" type="text" v-model="query.year" id="tngyear" size="6" maxlength="4" value="">
				</div>
				<div class="d-inline-block normal">
					<label for="tngkeywords">Keyword (ie, "Abt"):</label>
					<br>
					<input class="form-control form-control-sm" type="text" v-model="query.keyword" id="tngkeywords" size="20" value="">
				</div>
				<div class="d-inline-block normal">
					<br>
					<input class="btn btn-sm btn-primary" type="button" @click.prevent="search" value="Search">
					<input class="btn btn-sm btn-primary" type="button" @click.prevent="reset" value="Reset"> | <input class="btn btn-sm btn-primary" type="button" @click.prevent="calendar" value="Calendar">
				</div>
			</div>
		</div>
		<br>
		<div v-if="!spinner.loading.spinning">
			<div v-if="anniversaries.length!=0" class="card mb-4" v-for="(event, index) in anniversaries">
				<div class="card-body setup-child setup-table">
					<div class="titlebox">
						<span class="subhead"><strong>{{index}}</strong></span><br>
						<p>Matches 1 to {{event.length}} of {{event.length}}</p>
						<table cellpadding="3" cellspacing="1" border="0" width="100%" class="whiteback normal">
							<thead>
								<tr>
									<th>#</th>
									<th>Last Name, Given Name(s)</th>
									<th colspan="2">{{index}}</th>
									<th>Person ID</th>
									<th>Tree</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(e,x) in event">
									<td>1</td>
									<td>
										<span v-if="e.person">
											<router-link :to="{name: 'people-single', params: {id: e.person.id}}">{{e.person.name}} </router-link>
										</span>
										<span v-if="e.family">
											<router-link :to="{name: 'family-group-sheet', params: {id: e.family.id}}">
												{{e.family.husband_obj ? e.family.husband_obj.name : ''}}
												{{(e.family.husband_obj && e.family.wife_obj) ? ' / ' : ''}}
												{{e.family.wife_obj ? e.family.wife_obj.name : ''}}
											</router-link>
										</span>
									</td>
									<td>
										{{e.eventdate}}
									</td>
									<td>
										{{e.eventplace}}
									</td>
									<td>
										<span>{{e.persfamID}}</span>
									</td>
									<td>
										<span>{{e.gedcom}}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div v-if="anniversaries.length==0"> Nothing found. </div>
		</div>
		<div v-if="spinner.loading.spinning">
			<button class="btn btn-link" type="button">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading...</span>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			anniversaries: [],
			query: {
				event: '',
				day: '',
				month: '',
				gedcom: ''
			},
			spinner: {
				loading: {
					spinning: true,
				}
			}
		}
	},
	mounted: function() {
		var DateObj = new Date()
		console.log(DateObj.getDate())
		console.log(DateObj.getMonth())

		this.query.day = DateObj.getDate()
		this.query.month = DateObj.getMonth()+1
		this.getData()
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data']
		},
		event_types: function() {
			return this.$store.getters['event_type/data']
		},
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true
			this.note_links = []
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_anniversaries',
				query: this.query,
			})).then(response => {
				this.anniversaries = response.data
				this.spinner.loading.spinning = false
			}).catch(error => {})
		},
		search() {
			this.getData()
		},
		reset() {
			this.query = {}
			this.getData()
		},
		calendar() {
			this.$router.push({
				name: 'calendar',
				params: {}
			})
		},
	}
}
</script>