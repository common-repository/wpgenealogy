<template>
	<div class="people-suggest">
		<div class="card mb-4">
			<div class="card-body">

		<table class="table table-borderless w-auto" style="min-width: 500px; max-width: 100%;">
			<tbody>
				<tr>
					<td><span>Your Name: </span></td>
					<td><input class="form-control form-control-sm" type="text"></td>
				</tr>
				<tr>
					<td><span>Your Email: </span></td>
					<td><input class="form-control form-control-sm" type="text"></td>
				</tr>
				<tr>
					<td><span>Email again: </span></td>
					<td><input class="form-control form-control-sm" type="text"></td>
				</tr>
				<tr>
					<td style="vertical-align: top;"><span>Description of<br>proposed changes: </span></td>
					<td>
						<textarea class="form-control form-control-sm" rows="10"></textarea>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<button class="btn btn-sm btn-primary" @click.prevent="suggestion"> Submit Suggestion </button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	</div>
	</div>
</template>
<script>
export default {
	props: ['family'],
	data() {
		return {}
	},
	methods: {
		suggestion() {}
	}
}
</script>