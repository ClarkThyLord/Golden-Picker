<template>
  <div class="d-flex flex-column border rounded" id="pocket-search">
		<input type="text" placeholder="Search..." title="Search for a pocket..." style="position: sticky; top: 0px;" class="p-2 w-100 shadow" />

		<div class="d-flex flex-column">
			<pocket _id="0" name="something"></pocket>
		</div>
  </div>
</template>

<script>
	import pocket from './pocket'

  export default {
    name: 'pocket-search',
		components: {
			pocket
		}
  }
</script>
