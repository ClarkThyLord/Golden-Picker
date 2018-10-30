<template>
  <div class="m-0 p-0 h-100 d-flex flex-column" id="action-space">
		<div class="m-2 flex-fill">

		</div>

		<div style="min-height: 25%; max-height: 50%;" class="m-2 p-1 d-flex flex-column border rounded">
			<div class="mt-1 btn-group justify-content-center row">
				<button type="button" title="Start roulette!" class="btn btn-primary">Go!</button>
				<button type="button" title="Start roulette!" class="btn btn-secondary">⚙ Settings</button>
				<button type="button" title="Add a temporary pocket to the roulette!" class="btn btn-success">+ Add</button>
				<button type="button" title="Reset roulette!" class="btn btn-danger">↻ Reset</button>
			</div>

			<div class="m-1 flex-fill row">
				<!-- IN POOL -->
				<div style="overflow-x: hidden; overflow-y: auto;" class="m-1 p-0 col pocket-space border rounded" data-pool="in">

				</div>

				<!-- OUT POOL -->
				<div style="overflow-x: hidden; overflow-y: auto;" class="m-1 p-0 col pocket-space border rounded" data-pool="out">

				</div>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'action-space',
		data: function () {
			return {
				pool: {
					in: [],
					out: []
				}
			}
		},
		mounted: function () {
			window.dragula.on('drop', (el, target, source, sibling) => {
				if (!target.dataset.pool) return;

				window.dragula.cancel();
				if (target.dataset.pool === 'in') {
					console.log(el.dataset.id);
					this.pool.in.push();
				} else if (target.dataset.pool === 'out') {
					this.pool.out.push();
				}
			})
		}
  }
</script>

<style>
</style>
