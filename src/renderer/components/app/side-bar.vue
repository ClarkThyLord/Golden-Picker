<template>
  <div style="overflow-x: hidden; overflow-y: auto;" class="m-0 p-0 h-100 bg-dark shadow-lg" id="side-bar">
		<input type="text" placeholder="Search..." title="Search for a pocket..." style="position: sticky; top: 0px;" class="p-2 w-100 shadow" />

		<div class="d-flex flex-column">
			<pocket _id="0" name="something"></pocket>
		</div>

		<div class="m-2 w-100 text-center">
			<button type="button" title="Create a pocket!" class="btn btn-success">+ Create</button>
		</div>
  </div>
</template>

<script>
	import pocket from './pocket/pocket'

  export default {
    name: 'side-bar',
		components: {
			pocket
		}
  }
</script>

<style>
</style>
