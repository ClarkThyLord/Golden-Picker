<template>
  <div :data-id="pocket.id" class="d-flex bg-secondary text-white border border-dark shadow" :class="{'draggable': draggable}" id="pocket">
		<div :title="pocket.name + (hint ? '\nHint:\n' + hint : '')" class="p-2 w-100 text-truncate">
			<img v-if="!!pocket.img" :src="pocket.img" width="32" height="32" class="m-1 rounded" />

			<i>
				{{ pocket.name }}
			</i>
		</div>

		<!--
			<div class="p-2">
				<img src="~@/assets/icons/feather/info.svg" title="View pocket's info!" data-toggle="modal" data-target="#pocket-info" style="cursor: pointer;" class="m-2" />
			</div>
		-->
  </div>
</template>

<script>
  export default {
    name: 'pocket',
		props: ['hint', 'pocket', 'draggable']
  }
</script>

<style scoped>
	.draggable {
		cursor: move;
	}
</style>
