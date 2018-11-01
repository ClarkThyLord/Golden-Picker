<template>
  <div style="overflow-x: hidden; overflow-y: auto;" class="m-0 p-0 h-100 bg-dark shadow-lg" id="side-bar">
		<pocket-creation v-on:create="create"></pocket-creation>

		<pocket-search></pocket-search>

		<div style="bottom: 8px;" class="m-2 w-100 position-sticky text-center">
			<button type="button" title="Create a pocket!" data-toggle="modal" data-target="#pocket-add" class="btn btn-success">+ Create</button>
		</div>
  </div>
</template>

<script>
	import PocketCreation from './pocket/pocket-creation'
	import PocketSearch from './pocket/pocket-search'

  export default {
    name: 'side-bar',
		components: {
			PocketCreation,
			PocketSearch
		},
		methods: {
			create: function (data) {
				console.log(2);
				window.db.pocket_add(data);
			}
		}
  }
</script>
