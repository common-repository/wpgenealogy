<template>
	<div class="chart-add">
		<div class="card mb-4">
			<div class="card-body tree-child tree-add">
				<message :messages="messages" />
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<th width="250" align="left">Select Tree:*</th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.gedcom">
									<option value="">Select Tree</option>
									<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.gedcom}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th width="250" align="left">Select Branch:*</th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.branch">
									<option value="">Select Branch</option>
									<option v-for="branch in branches" :value="branch.branch">{{branch.branch}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th width="250" align="left">Chart Type</th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.type">
									<option value=""> Select Chart Type </option>
									<option value="1">Style 1 - Vertical Descendent Chart (Default)</option>
<!-- 									<template v-if="is_pro">
										<option value="2">Style 2 - Horizontal Descendent Chart</option>
										<option value="3">Style 3 - Vertical Pedigree Chart</option>
										<option value="4">Style 4 - Horizontal Pedigree Chart 1</option>
										<option value="5">Style 5 - Horizontal Pedigree Chart 2</option>
										<option value="6">Style 6 - Vertical Hourglass </option>
										<option value="7">Style 7 - Horizontal Hourglass </option>
									</template> -->
								</select>
							</td>
						</tr>
						<tr>
							<th width="250" align="left">Background Color</th>
							<td>
								<input type="color" v-model="chart.settings.color">
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<td colspan="2" class="higlighted">
								<h4 class="mt-2">Family Member 'Box'</h4>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<label><input type="checkbox" v-model="chart.settings.box.show"> Show Content in a Box </label>
							</td>
						</tr>
						<tr>
							<th width="250" align="left"> Border Style </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.box.border.style">
									<option value="dotted">Dotted</option>
									<option value="dashed">Dashed</option>
									<option selected="" value="solid">Solid</option>
									<option value="double">Double</option>
									<option value="groove">Groove</option>
									<option value="ridge">Ridge</option>
									<option value="inset">Inset</option>
									<option value="outset">Outset</option>
									<option value="none">None</option>
									<option value="hidden">Hidden</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Border Weight </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.box.border.weight">
									<option value="1px">1px</option>
									<option value="2px">2px</option>
									<option value="3px">3px</option>
									<option selected="" value="4px">4px</option>
									<option value="5px">5px</option>
									<option value="6px">6px</option>
									<option value="7px">7px</option>
									<option value="8px">8px</option>
									<option value="9px">9px</option>
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Border Radius </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.box.border.radius">
									<option value="1px">1px</option>
									<option value="2px">2px</option>
									<option value="3px">3px</option>
									<option value="4px">4px</option>
									<option value="5px">5px</option>
									<option value="6px">6px</option>
									<option value="7px">7px</option>
									<option value="8px">8px</option>
									<option value="9px">9px</option>
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left" valign="top"> Gender Specific Elements </th>
							<td>
								<table class="table table-borderless table-striped w-auto">
									<thead>
										<tr>
											<th></th>
											<th>Male</th>
											<th>Female</th>
											<th>Other</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Box Color</td>
											<td>
												<input type="color" v-model="chart.settings.box.color.male">
											</td>
											<td>
												<input type="color" v-model="chart.settings.box.color.female">
											</td>
											<td>
												<input type="color" v-model="chart.settings.box.color.other">
											</td>
										</tr>
										<tr>
											<td>Border Color</td>
											<td>
												<input type="color" v-model="chart.settings.box.border.color.male">
											</td>
											<td>
												<input type="color" v-model="chart.settings.box.border.color.female">
											</td>
											<td>
												<input type="color" v-model="chart.settings.box.border.color.other">
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<td colspan="2" class="higlighted">
								<h4 class="mt-2">Connecting Lines</h4>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<label><input checked="" type="checkbox" v-model="chart.settings.line.show"> Connect Boxes with Lines </label>
							</td>
						</tr>
						<tr>
							<th width="250" align="left"> Line Style </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.line.style">
									<option value="dotted">Dotted</option>
									<option value="dashed">Dashed</option>
									<option selected="" value="solid">Solid</option>
									<option value="double">Double</option>
									<option value="groove">Groove</option>
									<option value="ridge">Ridge</option>
									<option value="inset">Inset</option>
									<option value="outset">Outset</option>
									<option value="none">None</option>
									<option value="hidden">Hidden</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Line Weight </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.line.weight">
									<option value="1px">1px</option>
									<option value="2px">2px</option>
									<option value="3px">3px</option>
									<option selected="" value="4px">4px</option>
									<option value="5px">5px</option>
									<option value="6px">6px</option>
									<option value="7px">7px</option>
									<option value="8px">8px</option>
									<option value="9px">9px</option>
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Line Color </th>
							<td>
								<input type="color" v-model="chart.settings.line.color">
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<td colspan="2" class="higlighted">
								<h4 class="mt-2">Picture</h4>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<label><input checked="" type="checkbox" v-model="chart.settings.thumb.show"> Show Picture in a Box </label>
							</td>
						</tr>
						<tr>
							<th width="250" align="left"> Border Style </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.thumb.border.style">
									<option value="dotted">Dotted</option>
									<option value="dashed">Dashed</option>
									<option selected="" value="solid">Solid</option>
									<option value="double">Double</option>
									<option value="groove">Groove</option>
									<option value="ridge">Ridge</option>
									<option value="inset">Inset</option>
									<option value="outset">Outset</option>
									<option value="none">None</option>
									<option value="hidden">Hidden</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Border Weight </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.thumb.border.weight">
									<option value="1px">1px</option>
									<option value="2px">2px</option>
									<option value="3px">3px</option>
									<option selected="" value="4px">4px</option>
									<option value="5px">5px</option>
									<option value="6px">6px</option>
									<option value="7px">7px</option>
									<option value="8px">8px</option>
									<option value="9px">9px</option>
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Corner Radius </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.thumb.border.radius">
									<option value="1px">1px</option>
									<option value="2px">2px</option>
									<option value="3px">3px</option>
									<option selected="" value="4px">4px</option>
									<option value="5px">5px</option>
									<option value="6px">6px</option>
									<option value="7px">7px</option>
									<option value="8px">8px</option>
									<option value="9px">9px</option>
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
								</select>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<td colspan="2" class="higlighted">
								<h4 class="mt-2">Text Options</h4>
							</td>
						</tr>
						<tr>
							<th width="250" align="left"> Name Font </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.font.name.name">
									<option selected="" value="Arial">Arial</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Name Font Size </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.font.name.size">
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option selected="" value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
									<option value="20px">20px</option>
									<option value="21px">21px</option>
									<option value="22px">22px</option>
									<option value="23px">23px</option>
									<option value="24px">24px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Name Font Color </th>
							<td>
								<input type="color" v-model="chart.settings.font.name.color">
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped">
					<tbody>
						<tr>
							<th width="250" align="left"> Other Text Font </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.font.other.name">
									<option selected="" value="Arial">Arial</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Other Text Font Size </th>
							<td>
								<select class="form-control form-control-sm w-auto" v-model="chart.settings.font.other.size">
									<option value="10px">10px</option>
									<option value="11px">11px</option>
									<option selected="" value="12px">12px</option>
									<option value="13px">13px</option>
									<option value="14px">14px</option>
									<option value="15px">15px</option>
									<option value="16px">16px</option>
									<option value="17px">17px</option>
									<option value="18px">18px</option>
									<option value="19px">19px</option>
									<option value="20px">20px</option>
									<option value="21px">21px</option>
									<option value="22px">22px</option>
									<option value="23px">23px</option>
									<option value="24px">24px</option>
								</select>
							</td>
						</tr>
						<tr>
							<th align="left"> Other Text Font Color </th>
							<td>
								<input type="color" v-model="chart.settings.font.other.color">
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-borderless table-striped mb-0">
					<tbody>
						<tr>
							<td colspan="3" class="higlighted">
								<h4 class="mt-2">Text to Display</h4>
							</td>
						</tr>
						<tr>
							<th width="250" align="left"> Name Format </th>
							<td width="250">
								<label><input type="radio" checked="" value="full" v-model="chart.settings.name.format"> Full Name</label>
							</td>
							<td>
								<label><input type="radio" value="first" v-model="chart.settings.name.format">First Name Only</label>
							</td>
						</tr>
						<tr>
							<th align="left"> Date of Birth </th>
							<td>
								<label><input type="radio" checked="" value="full" v-model="chart.settings.dob.format"> Full Date</label>
							</td>
							<td>
								<label><input type="radio" value="year" v-model="chart.settings.dob.format">Year Only</label>
							</td>
						</tr>
						<tr>
							<th align="left"> Date of Death </th>
							<td>
								<label><input type="radio" checked="" value="full" v-model="chart.settings.dod.format"> Full Date</label>
							</td>
							<td>
								<label><input type="radio" value="year" v-model="chart.settings.dod.format">Year Only</label>
							</td>
						</tr>
						<tr>
							<th align="left"> Date of Marriage </th>
							<td>
								<label><input type="radio" checked="" value="full" v-model="chart.settings.dom.format"> Full Date</label>
							</td>
							<td>
								<label><input type="radio" value="year" v-model="chart.settings.dom.format">Year Only</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button class="btn btn-primary primary2" type="button" @click="save"> 
			<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span> 
			Save 
		</button>
	</div>
</template>
<script>
import Message from '@/components/dashboard/Message.vue';
export default {
	components: {
		'message': Message,
	},
	data() {
		return {
			spinner: {
				save: {
					spinning: false,
				}
			},
			chart: {
				gedcom: '',
				branch: '',
				settings: {
					color: '#f5f5f5',
					type: '',
					box: {
						color: {
							male: '#e3e5e7',
							female: '#e3e5e7',
							other: '#e3e5e7'
						},
						border: {
							style: 'solid',
							weight: '1px',
							radius: '0px',
							color: {
								male: '#333333',
								female: '#333333',
								other: '#333333'
							}
						},
						show: true
					},
					thumb: {
						border: {
							style: 'solid',
							weight: '1px',
							radius: '0px',
						},
						show: true
					},
					line: {
						style: 'solid',
						weight: '1px',
						color: '#333333',
						show: true
					},
					font: {
						name: {
							name: 'Arial',
							size: '14px',
							color: '#555555',
						},
						other: {
							name: 'Arial',
							size: '12px',
							color: '#555555',
						}
					},
					name: {
						format: 'full'
					},
					dob: {
						format: 'full'
					},
					dod: {
						format: 'full'
					},
					dom: {
						format: 'full'
					},
				}
			},
			messages: [],
			plan: wpGenealogy.plan
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data']
		},
		branches: function() {
			return this.$store.getters['branch/data'].data.filter(branch => this.chart.gedcom == branch.gedcom)
		},
		is_pro() {
			if (this.plan == 'premium') {
				return true
			}
			else {
				return false;
			}
		}
	},
	methods: {
		save() {
			if (!this.chart.gedcom) {
				alert("Please select a Tree ID.")
				return
			}
			if (!this.chart.branch) {
				alert("Please enter a chart ID.")
				return
			}
			
			this.spinner.save.spinning = true
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				...this.chart,
				...{
					action: 'chart_add',
					security: wpGenealogy.nonce
				}
			})).then(response => {
				this.spinner.save.spinning = false
				if (response.data.chart && response.data.chart.id) {
					this.$router.push({
						name: 'dashboard-chart-search',
						params: {
							messages: response.data ? response.data.messages : []
						}
					})
				}
			}).catch(error => {});
		}
	}
}
</script>