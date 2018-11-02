<template>
  <div class="m-0 p-0 w-100 h-100 row" id="app">
		<new-user></new-user>
		<settings-menu></settings-menu>

		<pocket-remove></pocket-remove>
		<pocket-info></pocket-info>

		<action-space class="col col-md-8 col-lg-10"></action-space>

		<side-bar class="d-block col-md-4 col-lg-2"></side-bar>

		<div style="position: fixed; bottom: 0px; right: 0px;" class="m-2 bg-light text-center border rounded shadow">
			<div title="Reset!" onclick="window.db.reset()" style="cursor: pointer;" class="m-2">
				⭮
			</div>
			<img src="~@/assets/icons/feather/github.svg" title="Check us out on GitHub!" onclick="window.util.url_open('https://github.com/ClarkThyLord/Golden-Picker');" style="cursor: pointer;" class="m-2" />
		</div>
  </div>
</template>

<script>
	import NewUser from './components/app/new-user'
	import SettingsMenu from './components/app/settings-menu'

	import SideBar from './components/app/side-bar'
	import ActionSpace from './components/app/action-space'

	import PocketRemove from './components/app/pocket/pocket-remove'
	import PocketInfo from './components/app/pocket/pocket-info'

  export default {
    name: 'golden-picker',
		components: {
			NewUser,
			SettingsMenu,

			SideBar,
			ActionSpace,

			PocketRemove,
			PocketInfo
		},
		mounted: function () {
			window.$(function () {
				if (!localStorage.getItem('new-user')) {
					window.$('#new-user').modal('show')
					localStorage.setItem('new-user', true)
				}
			})
		}
  }
</script>

<style>
</style>
