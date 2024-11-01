<template>
	<div class="timeline-add">
		<div class="card mb-4">
			<div class="card-body">
				<table class="table table-borderless w-auto">
					<tbody>
						<tr>
							<td>
								<strong> Start Date: </strong>
							</td>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="timeline.evday">
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
							</td>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="timeline.evmonth">
									<option value=""></option>
									<option value="1">Jan</option>
									<option value="2">Feb</option>
									<option value="3">Mar</option>
									<option value="4">Apr</option>
									<option value="5">May</option>
									<option value="6">Jun</option>
									<option value="7">Jul</option>
									<option value="8">Aug</option>
									<option value="9">Sep</option>
									<option value="10">Oct</option>
									<option value="11">Nov</option>
									<option value="12">Dec</option>
								</select>
							</td>
							<td>
								<input class="form-control form-control-sm w-auto" type="text" v-model="timeline.evyear" size="4">
							</td>
							<td>
								<span class="normal">(only year is required)</span>
							</td>
						</tr>
						<tr>
							<td><strong>End Date:</strong></td>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="timeline.endday">
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
							</td>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="timeline.endmonth">
									<option value=""></option>
									<option value="1">Jan</option>
									<option value="2">Feb</option>
									<option value="3">Mar</option>
									<option value="4">Apr</option>
									<option value="5">May</option>
									<option value="6">Jun</option>
									<option value="7">Jul</option>
									<option value="8">Aug</option>
									<option value="9">Sep</option>
									<option value="10">Oct</option>
									<option value="11">Nov</option>
									<option value="12">Dec</option>
								</select>
							</td>
							<td>
								<input class="form-control form-control-sm w-auto" type="text" v-model="timeline.endyear" size="4">
							</td>
							<td>
								<span class="normal"></span>
							</td>
						</tr>
						<tr>
							<td><strong>Event title:</strong></td>
							<td colspan="4"><input class="form-control form-control-sm w-auto" type="text" v-model="timeline.evtitle"></td>
						</tr>
						<tr>
							<td style="vertical-align: top;"><strong>Event detail:</strong></td>
							<td colspan="4"><textarea class="form-control form-control-sm w-100" v-model="timeline.evdetail"></textarea></td>
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
			timeline: {
				evday: '',
				evmonth: '',
				evyear: '',
				endday: '',
				endmonth: '',
				endyear: '',
				evtitle: '',
				evdetail: '',
			}
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	methods: {
		add: function() {
			this.spinner.add.spinning = true
			const data = {
				action: 'timeline_add'
			}
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...data,
				...this.timeline
			})).then(response => {
				this.spinner.add.spinning = false
				if (response.data.timeline && response.data.timeline.id) {
					this.$router.push({
						name: 'dashboard-timeline-search',
						params: {
							messages: response.data ? [response.data.message] : []
						}
					})
				}
			}).catch(error => {})
		},
	}
}
</script>