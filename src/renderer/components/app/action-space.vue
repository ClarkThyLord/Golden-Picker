<template>
  <div class="m-0 p-0 h-100 d-flex flex-column" id="action-space">
		<div class="m-2 flex-fill">
			<div id="result">

			</div>
		</div>

		<div style="height: 50%;" class="m-2 p-1 d-flex flex-column border rounded">
			<div class="mt-1 btn-group justify-content-center row">
				<button type="button" title="Start roulette!" :disabled="pool.in.length === 0" @click="roulette" class="btn btn-primary">Go!</button>
				<button type="button" title="Settings for roulette!" data-toggle="modal" data-target="#settings-menu" class="btn btn-secondary">⚙ Settings</button>
				<button type="button" title="Add a temporary pocket to the roulette!" class="btn btn-success">+ Add</button>
				<button type="button" title="Reset roulette!" @click="reset" class="btn btn-danger">↻ Reset</button>
			</div>

			<div class="m-1 flex-fill row">
				<!-- IN POOL -->
				<div style="overflow-x: hidden; overflow-y: auto;" class="m-1 p-0 col pocket-space border rounded" data-pool="in">
					<pocket v-for="pocket in pool.in" :hint="'Drag out to remove from pool!'" :profile="pocket"></pocket>
				</div>

				<!-- OUT POOL -->
				<div style="overflow-x: hidden; overflow-y: auto;" class="m-1 p-0 col pocket-space border rounded" data-pool="out">
					<pocket v-for="pocket in pool.out" :hint="'Drag into pool to append to pool!'" :profile="pocket"></pocket>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import pocket from './pocket/pocket'

  export default {
    name: 'action-space',
		components: {
			pocket
		},
		data: function () {
			return {
				pool: {
					in: [],
					out: []
				}
			}
		},
		methods: {
			roulette: function () {
				this.$el.querySelector('#result').innerHTML = this.pool.in[Math.floor(Math.random() * this.pool.in.length)].name;
				this.pool.out.push(this.pool.in.pop(result))
			},
			reset: function () {
				this.pool = Object.assign({}, this.pool, {
					in: [],
					out: []
				})
			}
		},
		mounted: function () {
			window.dragula.on('drop', (el, target, source, sibling) => {
				if (!target.dataset.pool) return;

				window.dragula.cancel();
				if (target.dataset.pool === 'in') {
					this.pool.in.push(db.pocket_search({id: el.dataset.id}, true).data[0]);
				} else if (source.dataset.pool === 'in' && target.dataset.pool === 'out') {
					this.pool.out.push(db.pocket_search({id: el.dataset.id}, true).data[0]);
				}
			})
		}
  }
</script>
