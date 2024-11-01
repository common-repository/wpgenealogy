<template>
	<div class="people-edit-event-citation">
		<div class="modal" id="people-edit-event-citation">
			<citation :citationArgs="citationArgs" :citationNew="citationNew" @addCitation="addCitation" @editCitation="editCitation" />
		</div>
		<citation-add :citationArgs="citationArgs" @citationAdded="citationAdded" />
		<citation-edit :citationArgs="citationArgs" :citation="citation" @citationUpdated="citationUpdated" />
	</div>
</template>
<script>
import citation from '@/components/dashboard/modals/components/citation/Index.vue';
import citationAdd from './add/Index.vue';
import citationEdit from './edit/Index.vue';
export default {
	components: {
		'citation': citation,
		'citation-add': citationAdd,
		'citation-edit': citationEdit
	},
	props: ['citationArgs'],
	data: function() {
		return {
			citation: {},
			citationNew: {}
		}
	},
	methods: {
		addCitation: function() {
			jQuery('#people-edit-event-citation-add').modal('show')
		},
		editCitation: function(citation) {
			this.citation = citation;
			jQuery('#people-edit-event-citation-edit').modal('show')
		},
		citationAdded: function(data) {
			this.citationNew = data[0];
			jQuery('#people-edit-event-citation-add').modal('hide')
		},
		citationUpdated: function(citation) {
			jQuery('#people-edit-event-citation-edit').modal('hide')
		}
	}
}
</script>