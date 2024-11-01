<template>
	<div class="calender-main">
		<h3 class="top-breadcrumb"><b>Calender</b></h3>
		<br>
		<div class="card mb-4">
			<div class="card-body">
				<div class="text-center section">
					<v-calendar class="custom-calendar max-w-full" :masks="masks" :attributes="attributes" disable-page-swipe is-expanded @update:from-page="fromPage" @update:to-page="toPage">
						<template v-slot:day-content="{ day, attributes }">
							<div class="flex flex-col h-full z-10 overflow-hidden">
								<span class="day-label text-sm text-gray-900">{{ day.day }}</span>
								<div class="flex-grow overflow-y-auto overflow-x-auto">
									<p v-for="attr in attributes" :key="attr.key" class="small text-xs leading-tight rounded-sm p-0 mb-0" :class="attr.customData.class">
										<small> {{attr.customData.id }} {{ attr.customData.eventtypeID }}: 
											<router-link v-if="attr.customData.person" :to="{name: 'people-single', params: {id: attr.customData.person.id}}"> {{attr.customData.person.name}}</router-link> 
											({{attr.customData.years}}) 
										</small>
									</p>
								</div>
							</div>
						</template>
					</v-calendar>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
export default {
	components: {
		'v-calendar': Calendar,
	},
	data() {
		return {
			spinner: {
				loading: {
					spinning: true,
				}
			},
			query: {
				month: new Date().getMonth(),
				year: new Date().getFullYear(),
			},
			masks: {
				weekdays: 'WWW',
			},
			attributes: [],
		};
	},
	mounted: function() {
		this.getData();
	},
	methods: {
		getData() {
			this.spinner.loading.spinning = true;
			this.attributes = []
			console.log(this.query);
			this.$http.post(wpGenealogy.ajax_url, this.$qs.stringify({
				action: 'get_calendar',
				query: this.query,
			})).then(response => {
				this.attributes = response.data
				this.spinner.loading.spinning = false;
			}).catch(error => {});
		},
		fromPage(fromPage){
		},
		toPage(toPage){
			this.query.month = toPage.month
			this.query.year = toPage.year
			this.getData();
		},
	}
};
</script>