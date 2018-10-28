<template>
  <div :data-_id="_id" style="cursor: move;" class="d-flex bg-secondary text-white border border-dark shadow" id="pocket">
		<div :title="name + '\nHint:\nDrag to roulette pool to use!'" class="p-2 w-100 text-truncate">
			<i>
				{{ name }}
			</i>
		</div>

		<div>
			<img src="~@/assets/icons/feather/info.svg" title="View pocket's info!" style="cursor: pointer;" class="m-2" />
		</div>
  </div>
</template>

<script>
  export default {
    name: 'pocket',
		props: ['_id', 'name']
  }
</script>

<style>
</style>
