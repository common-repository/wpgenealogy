<template>
	<div class="surname-list">
		<h3 class="top-breadcrumb"><strong>Surname</strong><small> List </small> </h3>
		<br>
		<form class="form-inline">
			<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Tree</label>
			<select class="custom-select custom-select-sm my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="query.gedcom">
				<option value="">Choose...</option>
				<option v-for="tree in trees.data" :value="tree.gedcom">
					{{tree.gedcom}}
				</option>
			</select>
		</form>
		<br>
		<div v-if="surnames.length" class="card mb-2">
			<div class="card-body">
				<h5>Show surnames starting with</h5>
				<br>
				<router-link v-for="surname in getStarting(surnamesAll)" :key="surname" class="snlink" :to="{name: 'surname-first', params: {char: surname}}">
					{{surname}}
				</router-link>
				<br>
				<br>
				<p class="mb-0">
					<router-link :to="{name: 'surname-all'}">Show all surnames</router-link> (sorted alphabetically)
				</p>
			</div>
		</div>
		<div v-if="surnames.length" class="card mb-2">
			<div class="card-body">
				<h5>Top 50 surnames (total individuals):</h5>
				<br>
				<table class="table table-bordered">
					<tr>
						<td rowspan="2" width="50%">
							<table class="table table-borderless">
								<tr v-for="(surname, index) in surnames">
									<td width="10">
										<span class="snlink">{{index+1}}.</span>
									</td>
									<td class="nw">
										<div style="width:150px; display: block;">
											<a href="" @click.prevent="searchThroughSurname(surname.lastname)">{{surname.lastname ? surname.lastname : '[no surname]'}}</a> ({{surname.total}})
										</div>
									</td>
									<td class="bar-holder" width="90%">
										<div style="background: #ddd; height: 10px;" v-bind:style="{ width: getWidth(surnames[0].total, surname.total) +'%'}"></div>
									</td>
								</tr>
							</table>
						</td>
						<td valign="top" align="center" style="vertical-align: top;">
							<h4>Top 10 surnames<br>(among all names)</h4>
							<div id="chart">
								<apexchart type="pie" width="380" :options="chartOptions2" :series="series2"></apexchart>
							</div>
							<span v-for="(surname, index) in surnames10">{{surname.lastname}}({{surname.total}}), </span>
							<span>All others({{totalSurnames}}),</span>
						</td>
					</tr>
					<tr>
						<td valign="top" align="center" style="vertical-align: top;">
							<h4>Just the top 10</h4>
							<div id="chart2">
								<apexchart type="pie" width="380" :options="chartOptions1" :series="series1"></apexchart>
							</div>
							<span v-for="(surname, index) in surnames10">{{surname.lastname}}({{surname.total}}), </span>
						</td>
					</tr>
				</table>
				<p class="mb-0">
				<div class="form-inline">
					<div class="form-group mr-2">
						<label for="inputPassword6">Show top </label>
						<input type="text" id="inputPassword6" class="form-control form-control-sm mx-sm-3" v-model="top" aria-describedby="passwordHelpInline">
						<small id="passwordHelpInline" class="text-muted"> ordered by occurrence </small>
					</div>
					<button type="submit" class="btn btn-sm btn-primary my-1" @click.prevent="goTop">Go</button>
				</div>
				</p>
			</div>
		</div>
		<div v-if="surnames.length == 0">
			<div v-if="spinner.loading.spinning">
				<button class="btn btn-link" type="button">
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					<span> Loading...</span>
				</button>
			</div>
			<div v-else> Nothing found. </div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			surnames: [],
			surnamesAll: [],
			surnames10: [],
			query: {
				starting: '',
				gedcom: '',
				page: 1,
			},
			top: 100,
			spinner: {
				loading: {
					spinning: true,
				}
			},
			series1: [],
			chartOptions1: {
				chart: {
					width: '100%',
					type: 'pie',
				},
				labels: [],
				plotOptions: {
					pie: {
						dataLabels: {
							offset: -5
						}
					}
				},
				legend: {
					show: false
				}
			},
			series2: [],
			chartOptions2: {
				chart: {
					width: '100%',
					type: 'pie',
				},
				labels: [],
				plotOptions: {
					pie: {
						dataLabels: {
							offset: -5
						}
					}
				},
				legend: {
					show: false
				}
			}
		}
	},
	created: function() {
		this.getData()
	},
	watch: {
		'query.starting': function(n, o) {
			this.getData()
		},
		'query.gedcom': function(n, o) {
			this.getData()
		},
		'query.page': function(n, o) {
			this.getData()
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		totalSurnames() {
			var length = this.surnamesAll.length;
			var other = this.surnamesAll.slice(10, length);
			var count = 0;
			for (var i = 0; i < other.length; i++) {
				count += parseInt(other[i].total)
			}
			return count;
		}
	},
	methods: {
		getData: function() {
			this.surnamesAll = [];
			this.surnames = [];
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_surname',
				query: this.query,
			})).then(response => {
				this.surnamesAll = response.data.data;
				this.surnames = response.data.data.slice(0, 50);
				this.surnames10 = response.data.data.slice(0, 10);
				this.series1 = [];
				this.chartOptions1.labels = []
				for (var i = 0; i < this.surnames10.length; i++) {
					this.series1.push(parseInt(this.surnames10[i].total));
					this.chartOptions1.labels.push(this.surnames10[i].lastname);
				}
				this.series2 = [];
				this.chartOptions2.labels = []
				for (var i = 0; i < this.surnames10.length; i++) {
					this.series2.push(parseInt(this.surnames10[i].total));
					this.chartOptions2.labels.push(this.surnames10[i].lastname);
				}
				this.series2.push(parseInt(this.totalSurnames));
				this.chartOptions2.labels.push('All others');
				this.spinner.loading.spinning = false
			}).catch(error => {});
		},
		getWidth: function(max, total) {
			return ((100 / max) * total).toFixed(0)
		},
		getStarting(surnames) {
			let startings = [];
			for (var i = 0; i < surnames.length; i++) {
				let substring = surnames[i].lastname.substring(0, 1).toUpperCase();
				if (!startings.includes(substring)) {
					startings.push(substring)
				}
			}
			return startings.sort();
		},
		goTop() {
			this.$router.push({
				name: 'surname-top',
				params: {
					n: this.top
				}
			})
		},
		searchThroughSurname(surnames) {
			this.$router.push({
				name: 'people-search',
				params: {
					query: {
						lastname: {
							operator: 'equals',
							value: surnames
						}
					}
				}
			})
		}
	}
}
</script>