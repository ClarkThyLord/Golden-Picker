<template>
  <div class="m-0 p-0 h-100 d-flex flex-column" id="action-space">
		<div class="m-2 flex-fill">

		</div>

		<div class="m-2 p-1 d-flex flex-column flex-fill border rounded">
			<div class="mt-1 btn-group justify-content-center row">
				<button type="button" title="Start roulette!" class="btn btn-primary">Go!</button>
				<button type="button" title="Add a temporary pocket to the roulette!" class="btn btn-success">+ Add</button>
				<button type="button" title="Reset roulette!" class="btn btn-danger">↻ Reset</button>
			</div>
			<div class="m-1 row d-flex flex-fill">
				<!-- IN -->
				<div class="m-1 flex-fill border rounded">

				</div>

				<!-- OUT -->
				<div title="Select a pocket to return it to pool!" class="m-1 flex-fill border rounded">

				</div>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'action-space'
  }
</script>

<style>
</style>
