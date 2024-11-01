<template>
    <div class="people-search-advanced">
	
        <h3 class="top-breadcrumb"><strong>People</strong><small> Search </small> </h3>
        <br>
        <div class="card mb-4">
			<div class="card-body">
				<table class="table table-borderless w-auto mb-0">
					<tr>
						<td width="50%" style="vertical-align: top;">
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
										<td>
											<select v-model="query.branch" class="form-control form-control-sm">
												<option value="">All Branches</option>
												<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==query.gedcom">{{branch.branch}}</option>
											</select>
										</td>
									</tr>
									<tr>
										<td>First Name:</td>
										<td>
											<select v-model="query.firstname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>s
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.firstname.value">
										</td>
									</tr>
									<tr>
										<td>Last Name:</td>
										<td>
											<select v-model="query.lastname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.lastname.value">
										</td>
									</tr>
									<tr>
										<td>Person ID:</td>
										<td>
											<select v-model="query.personID.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="contains">contains</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.personID.value">
										</td>
									</tr>
									<tr>
										<td>Gender:</td>
										<td>
											<select v-model="query.sex.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
											</select>
										</td>
										<td>
											<select v-model="query.sex.value" class="form-control form-control-sm">
												<option value="">Select Gender</option>
												<option value="M">Male</option>
												<option value="F">Female</option>
												<option value="U">Unknown</option>
												<option value="N">None</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td>Birth Place:</td>
										<td>
											<select v-model="query.birthplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.birthplace.value">
										</td>
									</tr>
									<tr>
										<td>Birth Year:</td>
										<td>
											<select v-model="query.birthdate.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="pm2">+/- 2 years from</option>
												<option value="pm5">+/- 5 years from</option>
												<option value="pm10">+/- 10 years from</option>
												<option value="lt">less than</option>
												<option value="gt">greater than</option>
												<option value="lte">less than or equal to</option>
												<option value="gte">greater than or equal to</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.birthdate.value">
										</td>
									</tr>
									<tr>
										<td>Christening Place:</td>
										<td>
											<select v-model="query.altbirthplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.altbirthplace.value">
										</td>
									</tr>
									<tr>
										<td>Christening Year:</td>
										<td>
											<select v-model="query.altbirthdate.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="pm2">+/- 2 years from</option>
												<option value="pm5">+/- 5 years from</option>
												<option value="pm10">+/- 10 years from</option>
												<option value="lt">less than</option>
												<option value="gt">greater than</option>
												<option value="lte">less than or equal to</option>
												<option value="gte">greater than or equal to</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.altbirthdate.value">
										</td>
									</tr>
									<tr>
										<td>Death Place:</td>
										<td>
											<select v-model="query.deathplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.deathplace.value">
										</td>
									</tr>
									<tr>
										<td>Death Year:</td>
										<td>
											<select v-model="query.deathdate.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="pm2">+/- 2 years from</option>
												<option value="pm5">+/- 5 years from</option>
												<option value="pm10">+/- 10 years from</option>
												<option value="lt">less than</option>
												<option value="gt">greater than</option>
												<option value="lte">less than or equal to</option>
												<option value="gte">greater than or equal to</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.deathdate.value">
										</td>
									</tr>
									<tr>
										<td>Burial Place:</td>
										<td>
											<select v-model="query.burialplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.burialplace.value">
										</td>
									</tr>
									<tr>
										<td>Burial Year:</td>
										<td>
											<select v-model="query.burialdate.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="pm2">+/- 2 years from</option>
												<option value="pm5">+/- 5 years from</option>
												<option value="pm10">+/- 10 years from</option>
												<option value="lt">less than</option>
												<option value="gt">greater than</option>
												<option value="lte">less than or equal to</option>
												<option value="gte">greater than or equal to</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.burialdate.value">
										</td>
									</tr>
									<tr>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td>Spouse's Last Name*:</td>
										<td>
											<select v-model="query.spouse.lastname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.spouse.lastname.value">
										</td>
									</tr>
									<tr>
										<td colspan="3">
											<p class="smaller">
												<em>*If you enter a value for Spouse's Last Name, you must select a Gender.</em>
											</p>
											<h4 class="subhead">
												<strong>Other Events</strong>
											</h4>
										</td>
									</tr>
									<tr> 
										<td><span>Nickname:</span></td>
										<td>
											<select v-model="query.nickname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td><input type="text" class="form-control form-control-sm" v-model="query.nickname.value"></td>
									</tr>
									<tr>
										<td><span>Title:</span></td>
										<td>
											<select v-model="query.title.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td><input type="text" class="form-control form-control-sm" v-model="query.title.value"></td>
									</tr>
									<tr>
										<td><span>Prefix:</span></td>
										<td>
											<select v-model="query.prefix.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td><input type="text" class="form-control form-control-sm" v-model="query.prefix.value"></td>
									</tr>
									<tr>
										<td><span>Suffix:</span></td>
										<td>
											<select v-model="query.suffix.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
												<option value="metaphoneof">metaphone of</option>
											</select>
										</td>
										<td><input type="text" class="form-control form-control-sm" v-model="query.suffix.value"></td>
									</tr>

									<tr>
										<td colspan="3">&nbsp;</td>
									</tr>

									<tr>
										<td><span>Join with:</span></td>
										<td>
											<select v-model="query.join" class="form-control form-control-sm">
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</td>
									</tr>
									<tr>
										<td><span>Results per page:</span></td>
										<td>
											<select v-model="query.per_page" class="form-control form-control-sm">
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="150">150</option>
												<option value="200">200</option>
											</select>
										</td>
									</tr>

									<tr>
										<td colspan="3">
											<button type="button" class="btn btn-sm btn-primary" @click.prevent="search">Search</button>
										
											<button type="button" class="btn btn-sm btn-primary" @click.prevent="reset">Reset All Values</button>
										</td>
									</tr>
									<tr>
										<td colspan="3">
											<p>
												<input type="checkbox" v-model="query.showdeath" value="yes"> Show death/burial information<br>
												<input type="checkbox" v-model="query.showspouse" value="yes"> Show spouse (will show duplicates if individual has more than one spouse)<br>
											</p>
											<p class="mb-0">
												<router-link :to="{name: 'family-search-advanced'}" class="btn btn-sm btn-primary">» Search Families</router-link>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
						
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
    import qs from "qs";
	export default {
		data(){
			return {
				query: {
					gedcom: '',
					branch: '',
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
					sex: {
						operator: 'equals',
						value: ''
					},
					birthplace: {
						operator: 'contains',
						value: ''
					},
					birthdate: {
						operator: 'equals',
						value: ''
					},
					altbirthplace: {
						operator: 'contains',
						value: ''
					},
					altbirthdate: {
						operator: 'equals',
						value: ''
					},
					deathplace: {
						operator: 'contains',
						value: ''
					},
					deathdate: {
						operator: 'equals',
						value: ''
					},
					burialplace: {
						operator: 'contains',
						value: ''
					},
					burialdate: {
						operator: 'equals',
						value: ''
					},
					spouse: {
						lastname: {
							operator: 'contains',
							value: ''
						}
					},
					nickname: {
						operator: 'contains',
						value: ''
					},
					title: {
						operator: 'contains',
						value: ''
					},
					prefix: {
						operator: 'contains',
						value: ''
					},
					suffix: {
						operator: 'contains',
						value: ''
					},
					join: 'AND',
					per_page: 50,
					showdeath: '',
					showspouse: '',
				},
			}
		},
		methods: {
			search: function(){
				this.getData();
			},
			reset: function(){
				this.query = {
					gedcom: '',
					branch: '',
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
					sex: {
						operator: 'equals',
						value: ''
					},
					birthplace: {
						operator: 'contains',
						value: ''
					},
					birthdate: {
						operator: 'equals',
						value: ''
					},
					altbirthplace: {
						operator: 'contains',
						value: ''
					},
					altbirthdate: {
						operator: 'equals',
						value: ''
					},
					deathplace: {
						operator: 'contains',
						value: ''
					},
					deathdate: {
						operator: 'equals',
						value: ''
					},
					burialplace: {
						operator: 'contains',
						value: ''
					},
					burialdate: {
						operator: 'equals',
						value: ''
					},
					spouse: {
						lastname: {
							operator: 'contains',
							value: ''
						}
					},
					nickname: {
						operator: 'contains',
						value: ''
					},
					title: {
						operator: 'contains',
						value: ''
					},
					prefix: {
						operator: 'contains',
						value: ''
					},
					suffix: {
						operator: 'contains',
						value: ''
					},
					join: 'AND',
					per_page: '50',
					showdeath: '',
					showspouse: '',
				}
			},
			getData: function(){

                this.$router.push({
                    name: 'people-search',
                    params: {
                        query: this.query
                    }
                })
			}
		},
		computed: {
            // get trees
            trees: function() {
                return this.$store.getters['tree/data'];
            },
            //get branches
            branches: function() {
                return this.$store.getters['branch/data'];
            },
		}
	}
</script>