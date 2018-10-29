<template>
  <div style="overflow-x: hidden; overflow-y: auto;" class="m-0 p-0 h-100 bg-dark shadow-lg" id="side-bar">
		<pocket-search></pocket-search>

		<div style="bottom: 8px;" class="m-2 w-100 position-sticky text-center">
			<button type="button" title="Create a pocket!" data-toggle="modal" data-target="#pocket-add" class="btn btn-success">+ Create</button>
		</div>
  </div>
</template>

<script>
	import PocketSearch from './pocket/pocket-search'

  export default {
    name: 'side-bar',
		components: {
			PocketSearch
		}
  }
</script>
