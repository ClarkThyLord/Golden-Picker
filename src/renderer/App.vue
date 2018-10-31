<template>
  <div class="m-0 p-0 w-100 h-100 row" id="app">
		<settings-menu></settings-menu>

		<pocket-add></pocket-add>
		<pocket-remove></pocket-remove>
		<pocket-info></pocket-info>

		<action-space class="col col-md-8 col-lg-10"></action-space>

		<side-bar class="col-md-4 col-lg-2"></side-bar>

		<div style="position: fixed; bottom: 0px; right: 0px;" class="m-2 bg-light text-center border rounded shadow">
			<img src="~@/assets/icons/feather/more-horizontal.svg" title="Toggle side bar!" style="cursor: pointer;" class="m-2 d-inline d-md-none" />

			<img src="~@/assets/icons/feather/github.svg" title="Check us out on GitHub!" onclick="window.util.url_open('https://github.com/ClarkThyLord/Golden-Picker');" style="cursor: pointer;" class="m-2" />
		</div>
  </div>
</template>

<script>
	import SettingsMenu from './components/app/settings-menu'

	import SideBar from './components/app/side-bar'
	import ActionSpace from './components/app/action-space'

	import PocketAdd from './components/app/pocket/pocket-add'
	import PocketRemove from './components/app/pocket/pocket-remove'
	import PocketInfo from './components/app/pocket/pocket-info'

	window.settings = {
	}

  export default {
    name: 'golden-picker',
		components: {
			SettingsMenu,

			SideBar,
			ActionSpace,

			PocketAdd,
			PocketRemove,
			PocketInfo
		}
  }
</script>

<style>
</style>
