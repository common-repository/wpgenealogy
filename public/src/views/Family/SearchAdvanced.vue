<template>
    <div class="family-search">
        <h3 class="top-breadcrumb"><strong>Family</strong><small> Search </small> </h3>
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
											<select v-model="query.gedcom" id="treeselect" class="form-control form-control-sm">
												<option value="">All Trees</option>
												<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td colspan="3"><strong>Father's Name</strong></td>
									</tr>
									<tr>
										<td>First Name:</td>
										<td>
											<select v-model="query.husband.firstname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.husband.firstname.value">
										</td>
									</tr>
									<tr>
										<td>Last Name:</td>
										<td>
											<select v-model="query.husband.lastname.operator" class="form-control form-control-sm">
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
											<input type="text" class="form-control form-control-sm" v-model="query.husband.lastname.value">
										</td>
									</tr>
									<tr>
										<td colspan="3"><strong>Mother's Name</strong></td>
									</tr>
									<tr>
										<td>First Name:</td>
										<td>
											<select v-model="query.wife.firstname.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
												<option value="soundexof">soundex of</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.wife.firstname.value">
										</td>
									</tr>
									<tr>
										<td>Last Name:</td>
										<td>
											<select v-model="query.wife.lastname.operator" class="form-control form-control-sm">
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
											<input type="text" class="form-control form-control-sm" v-model="query.wife.lastname.value">
										</td>
									</tr>
									<tr>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td>Family ID:</td>
										<td>
											<select v-model="query.familyID.operator" class="form-control form-control-sm">
												<option value="equals">equals</option>
												<option value="contains">contains</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.familyID.value">
										</td>
									</tr>
									<tr>
										<td>Marriage Place:</td>
										<td>
											<select v-model="query.marrplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.marrplace.value">
										</td>
									</tr>
									<tr>
										<td>Marriage Year:</td>
										<td>
											<select v-model="query.marrdate.operator" class="form-control form-control-sm">
												<option selected="selected">equals</option>
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
											<input type="text" class="form-control form-control-sm" v-model="query.marrdate.value">
										</td>
									</tr>
									<tr>
										<td>Divorce Place:</td>
										<td>
											<select v-model="query.divplace.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.divplace.value">
										</td>
									</tr>
									<tr>
										<td>Divorce Year:</td>
										<td>
											<select v-model="query.divdate.operator" class="form-control form-control-sm">
												<option selected="selected">equals</option>
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
											<input type="text" class="form-control form-control-sm" v-model="query.divdate.value">
										</td>
									</tr>
									<tr>
										<td colspan="2">&nbsp;</td>
									</tr>
									<tr>
										<td>Marriage Type:</td>
										<td>
											<select v-model="query.marrtype.operator" class="form-control form-control-sm">
												<option value="contains">contains</option>
												<option value="equals">equals</option>
												<option value="startswith">starts with</option>
												<option value="endswith">ends with</option>
												<option value="exists">exists</option>
												<option value="dnexist">does not exist</option>
											</select>
										</td>
										<td>
											<input type="text" class="form-control form-control-sm" v-model="query.marrtype.value">
										</td>
									</tr>
									<tr>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td><span class="normal">Join with:</span></td>
										<td>
											<select class="form-control form-control-sm" v-model="query.join">
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td><span class="normal">Results per page:</span></td>
										<td>
											<select class="form-control form-control-sm" v-model="query.per_page">
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="150">150</option>
												<option value="200">200</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td colspan="3">
											<button type="button" class="btn btn-sm btn-primary" @click.prevent="search">Search</button>
										
											<button type="button" class="btn btn-sm btn-primary" @click.prevent="reset">Reset All Values</button>
										</td>
									</tr>
									<tr>
										<td colspan="3"> &nbsp; </td>
									</tr>
									<tr>
										<td colspan="3">
											<p class="mb-0">
												<router-link :to="{name: 'people-search-advanced'}" class="btn btn-sm btn-primary">» Search People</router-link>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
						<td width="50%" style="vertical-align: top;">
					
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			query: {
				gedcom: '',
				husband: {
					firstname: {
						operator: 'contains',
						value: ''
					},
					lastname: {
						operator: 'contains',
						value: ''
					}
				},
				wife: {
					firstname: {
						operator: 'contains',
						value: ''
					},
					lastname: {
						operator: 'contains',
						value: ''
					}
				},
				familyID: {
					operator: 'equals',
					value: ''
				},
				marrplace: {
					operator: 'contains',
					value: ''
				},
				marrdate: {
					operator: 'equals',
					value: ''
				},
				divplace: {
					operator: 'contains',
					value: ''
				},
				divdate: {
					operator: 'equals',
					value: ''
				},
				marrtype: {
					operator: 'contains',
					value: ''
				},
				join: '',
				per_page: '',
			}
		}
	},
	methods: {
		getData: function(){
            this.$router.push({
                name: 'family-search',
                params: {
                    query: this.query
                }
            })
		},
		search: function(){
			this.getData();
		},
		reset: function(){
			this.query = {
				gedcom: '',
				husband: {
					firstname: {
						operator: 'contains',
						value: ''
					},
					lastname: {
						operator: 'contains',
						value: ''
					}
				},
				wife: {
					firstname: {
						operator: 'contains',
						value: ''
					},
					lastname: {
						operator: 'contains',
						value: ''
					}
				},
				familyID: {
					operator: 'equals',
					value: ''
				},
				marrplace: {
					operator: 'contains',
					value: ''
				},
				marrdate: {
					operator: 'equals',
					value: ''
				},
				divplace: {
					operator: 'contains',
					value: ''
				},
				divdate: {
					operator: 'equals',
					value: ''
				},
				marrtype: {
					operator: 'contains',
					value: ''
				},
				join: '',
				per_page: '',
			}
		},
	},
	computed: {
        // get trees
        trees: function() {
            return this.$store.getters['tree/data'];
        },
	}
}
</script>