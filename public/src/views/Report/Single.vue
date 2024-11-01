<template>
	<div class="report-search">
		<h3 class="top-breadcrumb"><strong>Report </strong> {{report.reportname}} </h3>
		<br>
		<div class="card">
			<div class="card-body">
				<table class="table table-borderless w-auto mb-0">
					<tbody>
						<tr>
							<td>Tree:</td>
							<td>
								<select v-model="query.gedcom" class="form-control form-control-sm">
									<option value="">All Trees</option>
									<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><br>Description:</td>
							<td><br>{{report.reportdesc}} </td>
						</tr>
					</tbody>
				</table>
				<br>
				<table class="table table-striped mb-0" v-if="result.data.length">
					<thead>
						<tr>
							<th v-for="display in report.display">
								{{getDisplay(display)}}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="people in result.data">
							<td v-for="display in report.display">
								{{people[display]}}
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else>No result found.</div>
				<nav v-if="result.data.length" aria-label="Page navigation example">
						<pagination :data="result" />
				</nav>
			</div>
		</div>
	</div>
</template>
<script>
import Pagination from '@/components/dashboard/Pagination.vue';

export default {
	components: {
		'pagination': Pagination,
	},
	data() {
		return {
			report: {},
			result: {
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
					spinning: true
				}
			},
			query: {
				gedcom: ''
			}
		}
	},
	mounted: function() {
		this.getData()
	},
	watch: {
		'result.current_page': function(newValue, oldValue) {
			this.getData()
		},
		'query.gedcom': function(newValue, oldValue) {
			this.getData()
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		}
	},
	methods: {
		getData() {
			this.report = {}
			this.spinner.loading.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'report_get_alt',
				id: this.$route.params.id
			})).then(response => {
				this.report = response.data
				this.spinner.loading.spinning = true;
			}).catch(error => {});
			this.spinner.loading.spinning = true

			var ned = {
				action: 'report_get_alt_calc',
				id: this.$route.params.id,
				current_page: this.result.current_page,
				per_page: this.result.per_page,
				gedcom: this.query.gedcom
			};

			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(ned)).then(response => {
				this.result = response.data
				this.spinner.loading.spinning = true;
			}).catch(error => {})
		},
		getDisplay(key){
			var data = {
				personID: 'PersonID',
				lnprefix: 'Last Name Prefix',
				lastname: 'Last Name',
				firstname: 'First Name',
				birthdatetr: 'Birth Date',
				birthdatetr_day: 'Birth Date Day',
				birthdatetr_month: 'Birth Date Month',
				birthdatetr_year: 'Birth Date Year',
				birthplace: 'Birth place',
				deathplace: 'Death Place',
				deathdatetr: 'Death Date',
				altbirthdatetr: 'Alt Birth Date',
				altbirthplace: 'Alt Birth Place',
				burialdatetr: 'Burial Date',
				burialplace: 'Burial Place',
				baptdatetr: 'Bapt Date',
				baptplace: 'Bapt Place',
				confdatetr: 'Conf Date',
				confplace: 'Conf Place',
				initdatetr: 'Init Date',
				initplace: 'Init Place',
				endldatetr: 'Endl Date',
				endlplace: 'Endl Place',
				sex: 'Sex',
				burialtype: 'Burial Type',
				nickname: 'Nick Name',
				title: 'Name Title',
				prefix: 'Name Prefix',
				suffix: 'Name Suffix',
				living: 'Living',
				private: 'Private',
			}
			for(var k in data) {
				if(k == key) {
					return data[k]
				}
			}
		}
	}
}

</script>