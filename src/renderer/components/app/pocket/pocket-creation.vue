<template>
  <div role="dialog" aria-hidden="true" class="modal fade" :id="'pocket-' + this.type">
		<div role="document" class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-capitalize">Pocket {{ this.type }}</h5>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form onsubmit="return false;" action="##">
						<div class="form-group">
							<div class="text-center">
								<img :src="img" style="max-width: 256px;" class="m-3 rounded" />

								<div style="cursor: pointer !important;" class="input-group">
									<label for="img" class="custom-file-label text-left">Choose file...</label>
							    <input type="file" accept="image/x-png,image/gif,image/jpeg" @change="image_change" class="custom-file-input" name="img">
								</div>
							</div>

							<hr />

							<div class="m-3">
								<label for="name" class="ml-2"><h5>Pocket name:</h5></label>
								<input type="text" v-model="name" placeholder="Pocket name..." oninput="window.util.input_validate(this);" required class="form-control form-control-lg" name="name">
							</div>

							<div class="m-3">
								<label for="chance" class="ml-2"><h5>Pocket chance:</h5></label>
								<input type="number" min="1" max="100" placeholder="Pocket chance..." v-model="chance" oninput="window.util.input_validate(this);" required class="form-control form-control-lg" name="chance">
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
					<button type="button" @click="create" :disabled="!valid" class="btn btn-success text-capitalize">{{ this.type }}</button>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	function data_default() {
		return {
			valid: true,
			img: '',
			name: '',
			chance: 1
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

				window.util.form_reset($('#pocket-add form'))
			},
			create: function () {
				if (!window.util.form_validate(this.$el.querySelector('#pocket-add form'))) return;

				this.$emit(this.type, {
					img: (this.img === data_default().img) ? data_default().img : this.img,
					name: this.name,
					chance: this.chance
				})

				$('#pocket-' + this.type).modal('hide')
			},
			image_change: function (e) {
				this.valid = false;
				if (e.target.files && e.target.files[0]) {
					var FR = new FileReader();

					FR.addEventListener("load", (e) => {
					  this.img = e.target.result;
						this.valid = true;
					});

					FR.readAsDataURL(e.target.files[0]);
			  }
			}
		},
		mounted: function () {
			$(() => {
				$('#pocket-' + this.type).on('hidden.bs.modal', () => {
					this.reset()
				})
			})
		}
  }
</script>
