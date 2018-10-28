<template>
  <div class="m-0 p-0 w-100 h-100 row" id="app">
		<ActionSpace class="col col-md-8 col-lg-10"></ActionSpace>

		<SideBar class="col-md-4 col-lg-2"></SideBar>

		<div style="position: fixed; bottom: 0px; right: 0px;" class="m-2 bg-light text-center border rounded shadow">
			<img src="~@/assets/icons/feather/more-horizontal.svg" title="Toggle side bar!" style="cursor: pointer;" class="m-2 d-inline d-md-none" />

			<img src="~@/assets/icons/feather/github.svg" title="Check us out on GitHub!" onclick="window.util.url_open('https://github.com/ClarkThyLord/Golden-Picker');" style="cursor: pointer;" class="m-2" />
		</div>
  </div>
</template>

<script>
	import SideBar from './components/app/side-bar'
	import ActionSpace from './components/app/action-space'

  export default {
    name: 'golden-picker',
		components: {
			SideBar,
			ActionSpace
		}
  }
</script>

<style>
</style>
