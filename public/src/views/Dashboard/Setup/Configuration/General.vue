<template>
	<div class="card">
		<div class="card-body setup-child setup-configuration-child configuration-general">
			<div class="accordion" id="accordion1" v-if="setting && setting.configuration">
				<div class="card">
					<div class="card-header" id="headingPage">
						<h2 class="mb-0">
							<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Page" aria-expanded="true" aria-controls="Page">
								<i class="fas fa-arrow-circle-right"></i> Page </button>
						</h2>
					</div>
					<div id="Page" class="collapse" aria-labelledby="headingPage" data-parent="#accordion1">
						<div class="card-body">
							<table class="table table-borderless w-auto mb-0">
								<tr>
									<td style="width: 200px;">WPGenealogy Page</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.pages.wpgenealogy_page_id">
											<option>Select Page</option>
											<option v-for="page in setting.configuration.general.pages.all" :value="page.ID">{{page.post_title}}</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<br> <h4>WPGenealogy Page Settings</h4></td>
								</tr>
								<tr>
									<td>Display Welcome Section</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.home_content.display" >
											<option value="yes">Yes</option>
											<option value="no">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Heading</td>
									<td>
										<input class="form-control form-control-sm" v-model="setting.configuration.general.home_content.heading" type="text">
									</td>
								</tr>
								<tr>
									<td>Paragraph</td>
									<td>
										<textarea class="form-control form-control-sm" v-model="setting.configuration.general.home_content.paragraph"></textarea>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Button</td>
									<td>
										<table>
											<tr>
												<td>Text</td>
												<td>
													<input class="form-control form-control-sm" v-model="setting.configuration.general.home_content.button.text" type="text">
												</td>
											</tr>
											<tr>
												<td>Url</td>
												<td>
													<input class="form-control form-control-sm" v-model="setting.configuration.general.home_content.button.url" type="text">
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td>Image Url</td>
									<td>
										<input class="form-control form-control-sm" v-model="setting.configuration.general.home_content.image_url" type="text">
									</td>
								</tr>
							</table>
							<button class="btn btn-sm btn-primary mt-3" @click="update">
								<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save 
							</button>
						</div>
					</div>
				</div>
			</div>


			<div class="accordion" id="accordion2" v-if="setting && setting.configuration">
				<div class="card">
					<div class="card-header" id="headingPage2">
						<h2 class="mb-0">
							<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#ToggleSection" aria-expanded="true" aria-controls="Page">
								<i class="fas fa-arrow-circle-right"></i> Toggle Section </button>
						</h2>
					</div>
					<div id="ToggleSection" class="collapse" aria-labelledby="headingPage2" data-parent="#accordion2">
						<div class="card-body">
							<table class="table table-borderless w-auto mb-0">
								<tr>
									<td style="width: 200px;">Places</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.toogle.place">
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="width: 200px;">Dates and Anniversaries</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.toogle.anniversary">
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="width: 200px;">Calender</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.toogle.calender">
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="width: 200px;">Reports</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.toogle.report">
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="width: 200px;">Statistics</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.toogle.statistics">
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</td>
								</tr>
							</table>
							<button class="btn btn-sm btn-primary mt-3" @click="update">
								<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save </button>
						</div>
					</div>
				</div>
			</div>
			<!-- 
		<div class="accordion" id="accordion5" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingDesign">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Design" aria-expanded="true" aria-controls="Design">
							<i class="fas fa-arrow-circle-right"></i> Site Design and Definition 
						</button>
					</h2>
				</div>
				<div id="Design" class="collapse" aria-labelledby="headingDesign" data-parent="#accordion5">
					<div class="card-body">
						<table class="table table-borderless w-auto">
							<tbody>
								<tr>
									<td style="width: 200px;">Home Page:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.homepage">
									</td>
								</tr>
								<tr>
									<td>Genealogy URL:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.tngdomain">
									</td>
								</tr>
								<tr>
									<td>Site Name:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.sitename">
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Site Description:</td>
									<td>
										<textarea class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.site_desc" rows="2"></textarea>
									</td>
								</tr>
								<tr>
									<td>Doctype Declaration:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.doctype">
									</td>
								</tr>
								<tr>
									<td>Site Owner:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.dbowner">
									</td>
								</tr>
								<tr>
									<td>Target Frame:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.target">
									</td>
								</tr>
								<tr>
									<td>Custom Header:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.customheader">
									</td>
								</tr>
								<tr>
									<td>Custom Footer:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.customfooter">
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Custom footer message:</td>
									<td>
										<textarea class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.tng_footermsg" rows="2"></textarea>
									</td>
								</tr>
								<tr>
									<td>Custom Meta:</td>
									<td>
										<input type="text" class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.custommeta">
									</td>
								</tr>
								<tr>
									<td>Tabs Style Sheet:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.tng_tabs">
											<option value="tngtabs1.css">tngtabs1.css</option>
											<option value="tngtabs2.css" selected="">tngtabs2.css</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Menu Location:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.tng_menu">
											<option value="0" selected="">Top right, next to heading</option>
											<option value="1">Top left, over heading</option>
											<option value="2">Do not display</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Home Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showhome">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Search Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showsearch">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Search Link Destination:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.searchchoice">
											<option value="0" selected="">Quick Search</option>
											<option value="1">Advanced Search</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Login/Logout Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showlogin">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Share Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showshare">
											<option value="1">Yes</option>
											<option value="0" selected="">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Print Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showprint">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Add Bookmark Link:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.showbmarks">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Hide Christening Labels:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.hidechr">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Default Tree:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.design_definition.defaulttree">
											<option value=""></option>
											<option value="Gray">Gray</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		-->
			<!-- 
		<div class="accordion" id="accordion7" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingPrivacy">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Privacy" aria-expanded="true" aria-controls="Privacy">
							<i class="fas fa-arrow-circle-right"></i> Privacy 
						</button>
					</h2>
				</div>
				<div id="Privacy" class="collapse" aria-labelledby="headingPrivacy" data-parent="#accordion7">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Require Login:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.requirelogin">
											<option value="1">Yes</option>
											<option value="0" selected="">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Restrict access to assigned tree: &nbsp;&nbsp;</td>
									<td>
										<span v-if="setting.configuration.general.privacy.requirelogin=='0'">"Require Login" must be set to Yes to enable this option</span>
										<select v-if="setting.configuration.general.privacy.requirelogin=='1'" class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.treerestrict">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show LDS Data:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.ldsdefault">
											<option value="0">Always</option>
											<option value="1">Never</option>
											<option value="2" selected="">Depending on user rights</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Living Data:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.livedefault">
											<option value="2">Always</option>
											<option value="1">Never</option>
											<option value="0" selected="">Depending on user rights</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Names for Living:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.nonames">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
											<option value="2">Abbreviate first name</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Names for Private:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.nnpriv">
											<option value="0" selected="">Yes</option>
											<option value="1">No</option>
											<option value="2">Abbreviate first name</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show cookie approval message:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.tng_cookieapproval">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show link to data protection policy:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.tng_dataprotect">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Prompt for consent regarding personal info:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.privacy.tng_askconsent">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>reCAPTCHA Site Key:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.privacy.rcsitekey">
									</td>
								</tr>
								<tr>
									<td>reCAPTCHA Secret:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.privacy.rcsecret">
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div> -->
			<!-- 		<div class="accordion" id="accordion8" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingNames">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Names" aria-expanded="true" aria-controls="Names">
							<i class="fas fa-arrow-circle-right"></i> Names 
						</button>
					</h2>
				</div>
				<div id="Names" class="collapse" aria-labelledby="headingNames" data-parent="#accordion8">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Name Order:</td>
									<td colspan="2">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.names.nameorder">
											<option value=""></option>
											<option value="1">First name first</option>
											<option value="2">Surname first (without commas)</option>
											<option value="3">Surname first (with commas)</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Uppercase All Surnames:</td>
									<td colspan="2">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.names.ucsurnames">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Surname Prefixes (i.e., van, de):</td>
									<td colspan="2">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.names.lnprefixes">
											<option value="0" selected="">Keep as part of regular surname</option>
											<option value="1">Treat as separate entity</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="3"> 
										<strong>Prefix Detection on Import:</strong> 
									</td>
								</tr>
								<tr>
									<td>Num. prefixes each (max):</td>
									<td colspan="2"><input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.names.lnpfxnum"></td>
								</tr>
								<tr>
									<td>OR These specific prefixes*:</td>
									<td><input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.names.specpfx">
									</td>
									<td>
										<span><small><i>*Separate multiple entries with commas</i></small></span>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>

					</div>
				</div>
			</div>
		</div>
 -->
			<!-- 		<div class="accordion" id="accordion9" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingCemeteries">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Cemeteries" aria-expanded="true" aria-controls="Cemeteries">
							<i class="fas fa-arrow-circle-right"></i> Cemeteries 
						</button>
					</h2>
				</div>
				<div id="Cemeteries" class="collapse" aria-labelledby="headingCemeteries" data-parent="#accordion9">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Max lines per column (approx.):</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.cemeteries.cemrows">
									</td>
								</tr>
								<tr>
									<td>Suppress "Unknown" categories:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.cemeteries.cemblanks">
											<option value="0" selected="selected">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="accordion" id="accordion11" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingPrefixes">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Prefixes" aria-expanded="true" aria-controls="Prefixes">
							<i class="fas fa-arrow-circle-right"></i> Prefixes and Suffixes 
						</button>
					</h2>
				</div>
				<div id="Prefixes" class="collapse" aria-labelledby="headingPrefixes" data-parent="#accordion11">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Person prefix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.pprefix">
									</td>
								</tr>
								<tr>
									<td>Person suffix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.psuffix">
									</td>
								</tr>
								<tr>
									<td>Family prefix:</td>
									<td>
										<input class="form-control form-control-sm" type="text" v-model="setting.configuration.general.prefixes_suffixes.fprefix">
									</td>
								</tr>
								<tr>
									<td>Family suffix:</td>
									<td>
										<input class="form-control form-control-sm" type="text" v-model="setting.configuration.general.prefixes_suffixes.fsuffix">
									</td>
								</tr>
								<tr>
									<td>Source prefix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.sprefix">
									</td>
								</tr>
								<tr>
									<td>Source suffix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.ssuffix">
									</td>
								</tr>
								<tr>
									<td>Repository prefix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.rprefix">
									</td>
								</tr>
								<tr>
									<td>Repository suffix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.rsuffix">
									</td>
								</tr>
								<tr>
									<td>Note prefix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.nprefix">
									</td>
								</tr>
								<tr>
									<td>Note suffix:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.prefixes_suffixes.nsuffix">
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="accordion" id="accordion12" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingMobile">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Mobile" aria-expanded="true" aria-controls="Mobile">
							<i class="fas fa-arrow-circle-right"></i> Mobile 
						</button>
					</h2>
				</div>
				<div id="Mobile" class="collapse" aria-labelledby="headingMobile" data-parent="#accordion12">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Enable responsive tables:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.mobile.responsivetables">
											<option value="1" selected="">Yes</option>
											<option value="0">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Responsive table type:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.mobile.tabletype">
											<option value="toggle" selected="">toggle</option>
											<option value="stack">stack</option>
											<option value="swipe">swipe</option>
											<option value="tng">tng</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Enable responsive tables mode switcher:</td>
									<td>
										<select class="form-control form-control-sm" v-model="setting.configuration.general.mobile.enablemodeswitch">
											<option value="1" selected="">Yes</option>
											<option value="0">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Enable responsive tables mini map:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.mobile.enableminimap">
											<option value="1" selected="">Yes</option>
											<option value="0">No</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="accordion" id="accordion13" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingDNA">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#DNA" aria-expanded="true" aria-controls="DNA">
							<i class="fas fa-arrow-circle-right"></i> DNA Tests 
						</button>
					</h2>
				</div>
				<div id="DNA" class="collapse" aria-labelledby="headingDNA" data-parent="#accordion13">
					<div class="card-body">
						<table class="table table-borderless w-auto mb-0">
							<tbody>
								<tr>
									<td style="width: 200px;">Hide all DNA pages and data:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.dna_tests.hidedna">
											<option value="0" selected="">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>DNA Tests Max Search Results:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.maxdnasearchresults">
									</td>
								</tr>
								<tr>
									<td>Show DNA Test Number Publicly:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.dna_tests.showtestnumbers">
											<option value="1">Yes</option>
											<option value="0" selected="">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Autofill Ancestral Surnames:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.dna_tests.autofillancsurnames">
											<option value="1">Yes</option>
											<option value="0" selected="">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Uppercase Ancestral Surnames:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.dna_tests.ancsurnameupper">
											<option value="1">Yes</option>
											<option value="0" selected="">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Generations For Ancestral Surnames:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.dna_tests.numgens">
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
										</select>
									</td>
								</tr>
								<tr>
									<td>Exclude From Ancestral Surnames*:</td>
									<td colspan="4">
										<input class="longfield form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.surnameexcl">
									</td>
								</tr>
								<tr>
									<td colspan="5">*Separate multiple entries with commas</td>
								</tr>
								<tr>
									<td colspan="5"></td>
								</tr>
								<tr>
									<td colspan="5">
										<strong>Y-DNA Compare Tests Column Heading Colors</strong>
									</td>
								</tr>
								<tr>
									<td>Main heading background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bgmain">
									</td>
									<td>Text color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txtmain">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:; color:#FFFFFF;" disabled>
									</td>
								</tr>
								<tr>
									<td>Mode values background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bgmode">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text"  v-model="setting.configuration.general.dna_tests.txtmode">
									</td>                           
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#D1EEEE; color:#000000;" v-model="setting.configuration.general.dna_tests.exmode" disabled>
									</td>
								</tr>
								<tr>
									<td>Fast mutating background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bgfastmut">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txtfastmut">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#69001A; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.exfastmut" disabled>
									</td>
								</tr>
								<tr>
									<td>Markers 1-12 background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bg1_12">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txt1_12">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#414E68; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.ex1_12" disabled>
									</td>
								</tr>
								<tr>
									<td>Markers 13-25 background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bg13_25">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txt13_25">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#41678A; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.ex13_25" disabled>
									</td>
								</tr>
								<tr>
									<td>Markers 26-37 background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bg26_37">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txt26_37">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#2E8899; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.ex26_37" disabled>
									</td>
								</tr>
								<tr>
									<td>Markers 38-67 background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bg38_67">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txt38_67">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#44A1B8; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.ex38_67" disabled>
									</td>
								</tr>
								<tr>
									<td>Markers 68-111 background color:</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.bg111">
									</td>
									<td> Text color: </td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.dna_tests.txt111">
									</td>
									<td>
										<input class="form-control form-control-sm w-auto" type="text" style="background-color:#05B8CC; color:#FFFFFF;" v-model="setting.configuration.general.dna_tests.ex111" disabled>
									</td>
								</tr>
								<tr>
									<td colspan="5"></td>
								</tr>
								<tr>
									<td colspan="5">Get Color Codes Here -&gt; 
										<a href="http://hnl.name/color-schemer-online/" class="snlink" target="_blank">ColorSchemer - Online Color Scheme Generator</a>
									</td>
								</tr>
								<tr>
									<td colspan="5"></td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="accordion" id="accordion14" v-if="setting && setting.configuration">
			<div class="card">
				<div class="card-header" id="headingMiscellaneous">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Miscellaneous" aria-expanded="true" aria-controls="Miscellaneous">
							<i class="fas fa-arrow-circle-right"></i> Miscellaneous 
						</button>
					</h2>
				</div>
				<div id="Miscellaneous" class="collapse" aria-labelledby="headingMiscellaneous" data-parent="#accordion14">
					<div class="card-body">
						<table class="table table-borderless w-auto">
							<tbody>
								<tr>
									<td style="width: 200px;">Max Search Results:</td>

									<td colspan="4"><input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.miscellaneous.maxsearchresults"></td>
								</tr>
								<tr>
									<td>Individuals start with:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.tng_istart">
											<option value="0" selected="">All information</option>
											<option value="1">Personal information only</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show Notes:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.notestogether">
											<option value="0">In Notes section</option>
											<option value="1">Underneath corresponding events where possible</option>
											<option value="2" selected="">Underneath events, except general notes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Scroll citations:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.scrollcite">
											<option value="1">Yes</option>
											<option value="0" selected="selected">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Server time offset (hours):</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto mb-2" type="text" v-model="setting.configuration.general.miscellaneous.time_offset"> Server time is 
										<strong>Wed 07:38 am</strong> and site time is <strong>Wed 07:38 am</strong>
									</td>
								</tr>
								<tr>
									<td>Edit timeout (minutes):</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.miscellaneous.edit_timeout">
									</td>
								</tr>
								<tr>
									<td>Max Generations, GEDCOM download:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.miscellaneous.maxgedcom">
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">'What's New' Days:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto mb-2" type="text" v-model="setting.configuration.general.miscellaneous.change_cutoff"> 
										Leave blank or set to zero to remove this limit
									</td>
								</tr>
								<tr>
									<td>'What's New' Limit:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.miscellaneous.change_limit">
									</td>
								</tr>
								<tr>
									<td>Numeric Date Preference:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.prefereuro">
											<option value="false">Month/Day/Year</option>
											<option value="true">Day/Month/Year</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>First day of week:</td>
									<td colspan="4">
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.calstart">
											<option value="0" selected="">Sunday</option>
											<option value="1">Monday</option>
											<option value="2">Tuesday</option>
											<option value="3">Wednesday</option>
											<option value="4">Thursday</option>
											<option value="5">Friday</option>
											<option value="6">Saturday</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Parental data on person page:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.pardata">
											<option value="0" selected="selected">Show all events and media</option>
											<option value="1">Show only standard family events</option>
											<option value="2">Don't show any events</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Line Ending:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto" type="text" v-model="setting.configuration.general.miscellaneous.lineending">
									</td>
								</tr>
								<tr>
									<td>Encryption type:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.password_type">
											<option value="md5">md5</option>
											<option value="sha1">sha1</option>
											<option value="sha256">sha256</option>
											<option value="sha384">sha384</option>
											<option value="sha512">sha512</option>
											<option value="phpass">phpass</option>
											<option value="none">No encryption</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Assign Place records to Trees:</td>
									<td>
										<select class="form-control form-control-sm w-auto mb-2" v-model="setting.configuration.general.miscellaneous.places1tree">
											<option value="0" selected="selected">Yes</option>
											<option value="1">No</option>
										</select>
										<div class="mb-2" v-if="setting.configuration.general.miscellaneous.places1tree==1">
											<input class="btn btn-primary btn-sm mb-2" type="button" value="Merge">
											<span>(This will remove the tree assignment from all Place records)</span>
										</div>

										<div v-if="setting.configuration.general.miscellaneous.places1tree==0">
											<select class="form-control form-control-sm w-auto mb-2" v-model="setting.configuration.general.miscellaneous.placetree">
												<option value="0">Select Tree</option>
												<option value="tree1">My Genealogy</option>
												<option value="my-tree">My Tree</option>
											</select>
											<input class="btn btn-primary btn-sm mb-2" type="button" value="Convert">
											<span>(This will assign all current places to the selected tree)</span>
										</div>
									</td>
								</tr>
								<tr>
									<td>Geocode all new places:</td>
									<td>
										<select v-model="setting.configuration.general.miscellaneous.autogeo" class="form-control form-control-sm w-auto">
											<option value="0" selected="selected">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Re-use deleted IDs:</td>
									<td>
										<select v-model="setting.configuration.general.miscellaneous.oldids" class="form-control form-control-sm w-auto">
											<option value="" selected="selected">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show last import:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.lastimport">
											<option value="" selected="selected">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show 'Important tasks' messages:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.hidetasks">
											<option value="" selected="selected">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Show record totals on Admin menu:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.hidetotals">
											<option value="" selected="selected">Yes</option>
											<option value="1">No</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;">Alert if no backup in this many days:</td>
									<td colspan="4">
										<input class="form-control form-control-sm w-auto mb-2" type="text" v-model="setting.configuration.general.miscellaneous.backupdays"> 
										Leave blank or set to zero to remove this limit
									</td>
								</tr>
								<tr>
									<td>I am using TNG offline:</td>
									<td>
										<select class="form-control form-control-sm w-auto" v-model="setting.configuration.general.miscellaneous.tng_offline">
											<option value="" selected="selected">No</option>
											<option value="1">Yes</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-sm btn-primary" @click="update"> 
							<span v-if="spinner.update.spinning" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Save
						</button>
					</div>
				</div>
			</div>
		</div> -->
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			spinner: {
				update: {
					spinning: false
				}
			},
			//setting: wpGenealogy.setting
		}
	},
	created() {
		console.log(this.setting)
	},
	mounted: function() {},
	computed: {
		setting(){
			return wpGenealogy.setting
		}
	},
	watch: {
		setting: {
			handler(val) {}
		}
	},
	methods: {
		update() {
			this.spinner.update.spinning = true
			this.$store.dispatch('setting/update', this.setting).then(response => {
				this.spinner.update.spinning = false
			}).catch(error => {});
		}
	}
}
</script>