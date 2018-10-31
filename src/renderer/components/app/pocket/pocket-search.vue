<template>
  <div class="d-flex flex-column border rounded" id="pocket-search">
		<input type="text" v-model="filter" placeholder="Search..." title="Search for a pocket..." style="position: sticky; top: 0px;" class="p-2 w-100 shadow" />

		<div class="d-flex flex-column pocket-space">
			<pocket v-for="pocket in filtered_pockets" :hint="'Drag into pool to append!'" :profile="pocket"></pocket>
		</div>
  </div>
</template>

<script>
	import pocket from './pocket'

  export default {
    name: 'pocket-search',
		components: {
			pocket
		},
		data: function () {
			return {
				filter: '',
				pockets: window.db.data
			}
		},
		computed: {
			filtered_pockets: function () {
				if (!this.filter) {
					return this.pockets
				} else {
					return (window.db.pocket_search({name: this.filter.toLowerCase()}, true)).data
				}
			}
		}
  }
</script>
