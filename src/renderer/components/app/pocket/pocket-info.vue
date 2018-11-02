<template>
  <div role="dialog" aria-hidden="true" class="modal fade" id="pocket-info">
		<div role="document" class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-capitalize">Pocket Info</h5>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form onsubmit="return false;" action="##">
						<div class="form-group">
							<div class="text-center">
								<img :src="pocket.img" style="max-width: 256px;" class="m-3 rounded" />

								<div style="cursor: pointer !important;" class="input-group">
									<label for="img" class="custom-file-label text-left">Choose file...</label>
							    <input type="file" accept="image/x-png,image/gif,image/jpeg" @change="image_change" class="custom-file-input" name="img">
								</div>
							</div>

							<hr />

							<div class="m-3">
								<label for="name" class="ml-2"><h5>Pocket name:</h5></label>
								<input type="text" v-model="pocket.name" placeholder="Pocket name..." oninput="window.util.input_validate(this);" required class="form-control form-control-lg" name="name">
							</div>

							<div class="m-3">
								<label for="chance" class="ml-2"><h5>Pocket chance:</h5></label>
								<input type="number" v-model="pocket.chance" min="1" max="100" placeholder="Pocket chance..." oninput="window.util.input_validate(this);" required class="form-control form-control-lg" name="chance">
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" :disabled="!valid" class="btn btn-danger" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	function data_default() {
		return {
			valid: true,
			pocket: {}
		}
	}

  export default {
    name: 'pocket-creation',
		props: ['type'],
		data: function () {
			return data_default()
		},
		methods: {
			reset: function () {
				Object.assign(this.$data, data_default())

				window.util.form_reset($('#pocket-info form'))
			},
			create: function () {
				if (!window.util.form_validate(this.$el.querySelector('#pocket-add form'))) return;

				this.$emit('update', this.pocket)

				$('#pocket-info').modal('hide')
			},
			image_change: function (e) {
				this.valid = false;
				if (e.target.files && e.target.files[0]) {
					var FR = new FileReader();

					FR.addEventListener("load", (e) => {
					  this.pocket.img = e.target.result;
						this.valid = true;
					});

					FR.readAsDataURL(e.target.files[0]);
			  }
			}
		},
		mounted: function () {
			$(() => {
				$('#pocket-info').on('hidden.bs.modal', () => {
					this.reset()
				})

				window.pocket_info = (pocket) => {
					if (typeof pocket === 'object') {
						Object.assign({}, this.pocket, pocket)
					} else {
						this.pocket = db.pocket_search({id: pocket}, true).data[0]
					}

					$('#pocket-info').modal('show')
				}
			})
		}
  }
</script>
