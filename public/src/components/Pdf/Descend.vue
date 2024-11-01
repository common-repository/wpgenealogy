<template>
	<div class="modal fade" id="pdf-descend" tabindex="-1" aria-labelledby="pdfLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="pdf-descend-title">PDF Generator</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div>
						<table class="table table-borderless w-auto">
							<tbody>
								<tr>
									<td>
										<span class="normal">Generations:</span>
									</td>
									<td>
										<select class="form-control form-control-sm" name="genperpage">
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4" selected="selected">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
										</select>
									</td>
								</tr>
								<tr>
									<td class="ws">
										<span class="normal">First Number:</span>
									</td>
									<td>
										<input class="form-control form-control-sm" type="text" name="startnum" value="1" size="4">
									</td>
								</tr>
							</tbody>
						</table>
						<div class="display-options" id="display-options">
							<div id="display-options-heading">
								<h2 class="mb-0">
									<button class="pl-0 btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#display-options" aria-expanded="true" aria-controls="display-options">
										<i class="fas fa-arrow-circle-right"></i> Display Options 
									</button>
								</h2>
							</div>
							<div id="display-options" class="collapse" aria-labelledby="display-options-heading" data-parent="#display-options">
								<table id="display" cellpadding="3" class="table table-borderless w-auto">
									<tbody>
										<tr>
											<td>
												<span class="normal">Dates and Locations:&nbsp;</span>
											</td>
											<td>
												<select name="getPlace" class="form-control form-control-sm">
													<option value="1" selected="selected">Birth/Alt - Death/Burial</option>
													<option value="2">No Birth or Death Dates</option>
													<option value="3">All Birth/Alt/Death/Burial data</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Numbering System:&nbsp;</span>
											</td>
											<td>
												<select name="numbering" class="form-control form-control-sm">
													<option value="0">None</option>
													<option value="1" selected="selected">Generation Numbers</option>
													<option value="2">Henry Numbers</option>
													<option value="3">d'Aboville Numbers</option>
													<option value="4">de Villiers Numbers</option>
												</select>
											</td>
										</tr>
									</tbody>
								</table>
								<br>
							</div>
						</div>
						<!-- Font section -->
						<div class="pdf-pedigree-font" id="pdf-pedigree-font">
							<div id="pdf-font-heading">
								<h2 class="mb-0">
									<button class="pl-0 btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Fonts" aria-expanded="true" aria-controls="Design">
										<i class="fas fa-arrow-circle-right"></i> Fonts 
									</button>
								</h2>
							</div>
							<div id="Fonts" class="collapse" aria-labelledby="pdf-font-heading" data-parent="#pdf-font">
								<table class="table table-borderless w-auto">
									<tbody>
										<tr>
											<td>Family</td>
											<td colspan="2">
												<select class="form-control form-control-sm" v-model="query.font.rptFont">
													<option disabled value="DejaVuSans">DejaVuSans</option>
													<option disabled value="DejaVuSansCondensed">DejaVuSansCondensed</option>
													<option disabled value="DejaVuSansMono">DejaVuSansMono</option>
													<option disabled value="DejaVuSerif">DejaVuSerif</option>
													<option disabled value="DejaVuSerifCondensed">DejaVuSerifCondensed</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Header:</span>
											</td>
											<td>
												<select class="form-control form-control-sm" v-model="query.font.hdrFontSize">
													<option disabled value="9">9</option>
													<option disabled value="10">10</option>
													<option value="12">12</option>
													<option disabled value="14">14</option>
												</select>
											</td>
											<td> pt </td>
										</tr>
										<tr>
											<td>
												<span class="normal">Data:</span>
											</td>
											<td>
												<select class="form-control form-control-sm" v-model="query.font.rptFontSize">
													<option disabled value="9">9</option>
													<option value="10">10</option>
													<option disabled value="12">12</option>
													<option disabled value="14">14</option>
												</select>
											</td>
											<td> pt </td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="pdf-pedigree-page" id="pdf-pedigree-page">
							<div id="pdf-page-heading">
								<h2 class="mb-0">
									<button class="pl-0 btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Page" aria-expanded="true" aria-controls="Design">
										<i class="fas fa-arrow-circle-right"></i> Page Setup 
									</button>
								</h2>
							</div>
							<div id="Page" class="collapse" aria-labelledby="pdf-page-heading" data-parent="#pdf-page">
								<table class="table table-borderless w-auto">
									<tbody>
										<tr>
											<td>
												<span class="normal">Page Size:</span>
											</td>
											<td>
												<select class="form-control form-control-sm" v-model="query.page.pagesize">
													<option disabled value="a3">A3</option>
													<option value="a4">A4</option>
													<option disabled value="a5">A5</option>
													<option disabled value="letter">Letter</option>
													<option disabled value="legal">Legal</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Orientation:</span>
											</td>
											<td>
												<select class="form-control form-control-sm" v-model="query.page.orient">
													<option value="p">Portrait</option>
													<option disabled value="l">Landscape</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Top Margin:</span>
											</td>
											<td>
												<input disabled class="form-control form-control-sm" type="text" value="0.5" v-model="query.page.topmrg" size="5">
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Bottom Margin:</span>
											</td>
											<td>
												<input disabled class="form-control form-control-sm" type="text" value="0.5" v-model="query.page.botmrg" size="5">
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Left Margin:</span>
											</td>
											<td>
												<input disabled class="form-control form-control-sm" type="text" value="0.5" v-model="query.page.lftmrg" size="5">
											</td>
										</tr>
										<tr>
											<td>
												<span class="normal">Right Margin:</span>
											</td>
											<td>
												<input disabled class="form-control form-control-sm" type="text" value="0.5" v-model="query.page.rtmrg" size="5">
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" @click.prevent="save">
						<span v-if="spinner.save.spinning" class="spinner-border spinner-border-sm"></span> Create Chart 
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['pdfArg'],
	data() {
		return {
			spinner: {
				save: {
					spinning: false,
				}
			},
			query: {
				font: {
					rptFont: 'DejaVuSans',
					hdrFontSize: '14',
					rptFontSize: '12'
				},
				page: {
					orient: 'p',
					pagesize: 'a4',
					topmrg: '1',
					botmrg: '1',
					lftmrg: '1',
					rtmrg: '1',
				}
			}
		}
	},
	methods: {
		save() {
			this.spinner.save.spinning = true;
			let data = {
				action: 'generate_pdf_descend',
				query: this.query,
			}
			data.query.people = this.pdfArg.people.id;
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
				this.spinner.save.spinning = false;
				window.open(response.data, '_blank');
			}).catch(error => {});
		}
	}
}
</script>