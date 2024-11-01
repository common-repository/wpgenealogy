<template>
	<div class="timeline-container">
		<div id="my-timeline" style="top:0;height: 500px;border: 1px solid rgb(170, 170, 170);"></div>
	</div>
</template>
<script>
export default {
	props: ['people'],
	data() {
		return {}
	},
	computed:{
		tlstartdate(){
			var d = new Date(this.people.birthdate);
			return d.getFullYear();
		},
		tlstartdate2(){
			var d = new Date(wpGenealogy.tlstartdate2);
			return d.getFullYear();
		}
	},
	mounted() {
		var tl;
		var tlstartdate = this.tlstartdate;
		var tlstartdate2 = this.tlstartdate2;
		var xmlfamfile = wpGenealogy.get_rest_url + 'tp/v1/feed/member/' + this.people.id;
		var xmleventfile = wpGenealogy.get_rest_url + 'tp/v1/feed/event/' + this.people.id;
		var famEventSource = new Timeline.DefaultEventSource();
		var eventSource = new Timeline.DefaultEventSource();
		var theme = Timeline.ClassicTheme.create();
		var bandInfos = [
			Timeline.createBandInfo({
				width: "15%",
				intervalUnit: Timeline.DateTime.YEAR,
				intervalPixels: 50,
				eventSource: famEventSource,
				date: tlstartdate,
				timeZone: -6,
				showEventText: false,
				trackHeight: 0.5,
				trackGap: 0.2,
				theme: theme,
			}),
			Timeline.createBandInfo({
				width: "35%",
				intervalUnit: Timeline.DateTime.YEAR,
				intervalPixels: 150,
				eventSource: famEventSource,
				date: tlstartdate,
				timeZone: -6,
				theme: theme
			}),
			Timeline.createBandInfo({
				width: "35%",
				intervalUnit: Timeline.DateTime.YEAR,
				intervalPixels: 150,
				eventSource: eventSource,
				date: tlstartdate2,
				timeZone: -6,
				theme: theme
			}),
			Timeline.createBandInfo({
				width: "15%",
				intervalUnit: Timeline.DateTime.YEAR,
				intervalPixels: 50,
				eventSource: eventSource,
				date: tlstartdate2,
				timeZone: -6,
				showEventText: false,
				trackHeight: 0.5,
				trackGap: 0.2,
				theme: theme,
			})
		];

		bandInfos[0].highlight = true;
		bandInfos[3].highlight = true;

		bandInfos[0].syncWith = 1;
		bandInfos[3].syncWith = 2;

		tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
		Timeline.loadXML(xmlfamfile, function(xml, url) {
			famEventSource.loadXML(xml, url);
		});
		Timeline.loadXML(xmleventfile, function(xml, url) {
			eventSource.loadXML(xml, url);
		});
	}
}
</script>