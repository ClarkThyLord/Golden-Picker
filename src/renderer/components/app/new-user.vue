<template>
	<div tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true" class="modal fade" id="new-user">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header text-center justify-content-center">
	        <h1 class="modal-title">Welcome to <br /> Golden Picker!</h1>
	      </div>

	      <div class="modal-body text-center justify-content-center">
					<img src="~@/assets/icons/golden_picker.svg" alt="GOLDEN PICKER ICON" width="156" class="m-1 img-fluid" />

					<br />

					<i>
						Would you like to load default setup?
					</i>
	      </div>

	      <div class="modal-footer justify-content-center text-center">
	        <button type="button" class="btn btn-danger" data-dismiss="modal">No, but thanks!</button>
	        <button type="button" onclick="window.db.default();" class="btn btn-success" data-dismiss="modal">Yes, load default setup!</button>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>
	export default {
		name: 'new-user'
	}
</script>
