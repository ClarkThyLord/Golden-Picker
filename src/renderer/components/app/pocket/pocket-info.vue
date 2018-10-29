<template>
  <div role="dialog" aria-hidden="true" class="modal fade" id="pocket-info">
		<div role="document" style="min-width: 75% !important;" class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Pocket Info</h5>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="m-2 p-1 row">
						<div style="border-style: dashed !important; border-width: 3px !important;" class="m-1 pocket-container flex-fill border rounded">

						</div>

						<pocket-search class="m-1 flex-fill border rounded"></pocket-search>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import PocketSearch from './pocket-search'

  export default {
    name: 'pocket-info',
		components: {
			PocketSearch
		}
  }
</script>
