<template>
	<div class="card">
		<div class="migrate-child import card-body">
			<table width="100%" border="0" cellpadding="10" cellspacing="2" class="table table-borderless w-auto mb-0">
				<tbody>
					<tr>
						<td colspan="2">
							<p>
								<small><i>Add to or replace your genealogy (may take several minutes, depending on the size of your file)</i></small>
							</p>
							<p>
								<strong>Import GEDCOM (standard 5.5 format):</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td width="350">From your computer: </td>
						<td><input type="file" name="file" size="50" v-on:change="loadFile($event)" ref="fileInput"></td>
					</tr>
					<!-- <tr>
						<td><strong>OR</strong> From web site (in GEDCOM folder): </td>
						<td>
							<table class="table table-borderless w-auto mb-0">
								<tr>
									<td class="p-0">
										<input class="form-control form-control-sm w-auto" type="text" name="database" id="database" size="20">
									</td>
									<td></td>
									<td class="p-0">
										<input class="btn btn-sm btn-primary" type="button" value="Select..." name="gedselect" onclick="FilePicker('database','gedcom');">
									</td>
								</tr>
							</table>
						</td>
					</tr> -->
					<!-- <tr>
						<td colspan="2">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="allevents" v-model="form.allevents">
								<label class="custom-control-label" for="allevents">Accept data for all new Custom Event Types </label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="eventsonly" v-model="form.eventsonly">
								<label class="custom-control-label" for="eventsonly">Import Custom Event Types only (no data is added, replaced or appended)</label>
							</div>
						</td>
					</tr> -->
					<tr>
						<td colspan="2">
							<p><strong>Import into:</strong></p>
						</td>
					</tr>
					<tr>
						<td>Destination Tree:</td>
						<td>
							<table class="table table-borderless w-auto mb-0">
								<tr>
									<td class="p-0">
										<select v-model="form.gedcom" class="form-control form-control-sm">
											<option value="">Select Tree</option>
											<option v-for="tree in trees.data" :value="tree.gedcom">{{tree.treename}}</option>
										</select>
									</td>
									<td></td>
									<td class="p-0">
										<button class="btn btn-sm btn-primary" @click.prevent="addTree" >Add New Tree</button>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>Destination Branch (optional):</td>
						<td>
							<select v-model="form.branch" class="form-control form-control-sm" :disabled="!form.gedcom">
								<option value="">Select Branch</option>
								<option v-for="branch in branches.data" :value="branch.branch" v-if="branch.gedcom==form.gedcom">{{branch.branch}}</option>
							</select>
						</td>
					</tr>
					<!-- <tr>
						<td colspan="2">
							<p><strong>Replace (in selected tree):</strong></p>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="Replace0" v-model="form.replace" value="all" class="custom-control-input">
								<label class="custom-control-label" for="Replace0">All current data </label>
							</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="Replace1" v-model="form.replace" value="match" class="custom-control-input">
								<label class="custom-control-label" for="Replace1">Matching records only </label>
							</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="Replace2" v-model="form.replace" value="no" class="custom-control-input">
								<label class="custom-control-label" for="Replace2">Do not replace any data </label>
							</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="Replace3" v-model="form.replace" value="append" class="custom-control-input">
								<label class="custom-control-label" for="Replace3">Append all records</label>
							</div>
							<br><br>
							<p>
								<small>
									<i>Hints: All Current Data means all people, families, sources and notes (media associations are not lost as long as IDs remain the same). Matches are always based on IDs only. New records are always added. Append imports all records with new IDs.</i>
								</small>
							</p>
						</td>
					</tr> -->
					<!-- <tr>
						<td>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="uppercaseSurname" v-model="form.uppercase_surname">
								<label class="custom-control-label" for="uppercaseSurname">Upper case all surnames</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="recalculateLivingFlag" v-model="form.recalculate_living_flag">
								<label class="custom-control-label" for="recalculateLivingFlag">Do not recalculate Living flag</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="replaceNewer" v-model="form.replace_newer">
								<label class="custom-control-label" for="replaceNewer">Replace only if newer</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="importMedia" v-model="form.import_media">
								<label class="custom-control-label" for="importMedia">Import media if present</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="importGeo" v-model="form.import_geo">
								<label class="custom-control-label" for="importGeo">Import latitude / longitude data if present</label>
							</div>
						</td>
						<td style="vertical-align: top;">
							<div class="custom-control custom-radio">
								<input type="radio" id="startIdsFirst" name="offsetchoice" value="1" checked class="custom-control-input">
								<label class="custom-control-label" for="startIdsFirst">Start IDs at first available number</label>
							</div>
							<div class="custom-control custom-radio">
								<input type="radio" id="startIds" name="offsetchoice" value="0" class="custom-control-input">
								<label class="custom-control-label" for="startIds">Start IDs at: <span class="d-inline-block">
										<input class="form-control form-control-sm w-auto" type="text" name="useroffset" size="10" maxlength="9">
									</span>
								</label>
							</div>
						</td>
					</tr> -->
					<tr>
						<td>
							<span v-if="spinner.import.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							<button @click="import_ged" class="btn btn-sm btn-primary" type="button" name="submit"> Import Data </button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<tree-add @treeAdded="treeAdded" />
	</div>
</template>
<script>
import treeAdd from '@/components/dashboard/modals/migrate/tree/Add.vue'

export default {
    components: {
        'tree-add': treeAdd
    },
	data() {
		return {
			spinner: {
				import: {
					spinning: false,
				},
			},
			form: {
				file: null,
				gedcom: '',
				branch: '',
				replace: 'all',
				uppercase_surname: '',
				recalculate_living_flag: '',
				replace_newer: '',
				import_media: '',
				import_geo: '',
				allevents: '',
				eventsonly: '',
			},
		}
	},
	computed: {
		trees: function() {
			return this.$store.getters['tree/data'];
		},
		branches: function() {
			return this.$store.getters['branch/data'];
		},
	},
	methods: {
		addTree(){
			jQuery('#migrate-tree-add').modal('show')
		},
		treeAdded(tree){

			this.form.gedcom = tree.gedcom
			this.form.branch = 'Default'

			jQuery('#migrate-tree-add').modal('hide')
		},
		import_ged() {
			if (!this.form.file) {
				alert('Please select a file to import.')
				return
			}
			if (!this.form.gedcom) {
				alert('Please select or enter a destination tree.')
				return
			}
			if (!this.form.branch) {
				alert('Please select or enter a destination branch.')
				return
			}
			if (!this.form.file || !this.form.gedcom || !this.form.branch) {
				return;
			}
			this.spinner.import.spinning = true
			this.$store.dispatch('import_ged', this.$data.form).then(response => {
				if(response.data == 'Only .ged format file is allowed here.') {
					alert('Only .ged format file is allowed here.');
					this.spinner.import.spinning = false
					return;
				}
				this.$store.dispatch('tree/get', this.$data);
				this.$store.dispatch('branch/get', this.$data);
				this.$store.dispatch('event_type/get', this.$data);


				this.spinner.import.spinning = false
				this.$router.push({
					name: 'dashboard-people-search',
				})
			}).catch(error => {
				this.spinner.import.spinning = false
			});
		},
		loadFile(e) {
			if (this.$refs.fileInput.files[0]) {
				this.form.file = this.$refs.fileInput.files[0];
			}
		},
		getBranches() {
			this.branchs = [{
				id: 1,
				name: 'Branch 1'
			}, {
				id: 2,
				name: 'Branch 2'
			}]
		}
	}
}
</script>