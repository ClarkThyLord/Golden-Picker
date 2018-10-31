<template>
  <div role="dialog" aria-hidden="true" class="modal fade" id="settings-menu">
		<div role="document" class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Settings</h5>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'settings-info',
		data: function () {
			return {
				settings: window.settings
			}
		}
  }
</script>
