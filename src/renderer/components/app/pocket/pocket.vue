<template>
  <div :data-id="profile.id" style="cursor: move;" class="d-flex bg-secondary text-white border border-dark shadow" id="pocket">
		<div :title="profile.name + (hint ? '\nHint:\n' + hint : '')" class="p-2 w-100 text-truncate">
			<img v-if="!!profile.img" :src="profile.img" alt="PROFILE IMG" width="32" height="32" class="m-1 rounded" />

			<i>
				{{ profile.name }}
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
		props: ['hint', 'profile']
  }
</script>

<style>
</style>
