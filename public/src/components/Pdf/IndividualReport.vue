<template>
	<div class="modal fade" id="pdf-individual-report" tabindex="-1" aria-labelledby="pdfLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="pdf-individual-report-title">PDF Generator</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div>
						<p>
							<span v-if="pdfArg.people" class="normal"><strong>Individual Report for  {{ pdfArg.people.name }} ({{pdfArg.people.personID}})</strong></span>
						</p>
						<div>
							<div class="custom-control custom-checkbox mr-2">
								<input class="custom-control-input" v-model="query.blankform" type="checkbox" id="Blank">
								<label class="custom-control-label" for="Blank"> Blank Chart </label>
							</div>
						</div>
						<div>
							<div class="custom-control custom-checkbox mr-2">
								<input class="custom-control-input" v-model="query.citesources" type="checkbox" id="Sources">
								<label class="custom-control-label" for="Sources"> Include Sources </label>
							</div>
						</div>
						<div class="pdf-font" id="pdf-font">
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
						<div class="pdf-page" id="pdf-page">
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
		save(){
			this.spinner.save.spinning = true;
			let data = {
				action: 'generate_pdf_individual_report',
				query: this.query,
			}

			data.query.people = this.pdfArg.people.id,

			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify(data)).then(response => {
			this.spinner.save.spinning = false;

				window.open(
					response.data,
					'_blank'
				);
			}).catch(error => {  });
		}
	}
}
</script>