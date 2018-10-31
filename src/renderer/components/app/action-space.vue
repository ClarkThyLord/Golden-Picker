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

			<div style="height: 0 !important;" class="m-1 flex-fill row">
				<!-- IN POOL -->
				<div style="overflow-x: hidden; overflow-y: auto; border-style: dashed !important; border-width: 3px !important;" class="m-1 p-0 col pocket-space pocket-drop border rounded" data-pool="in">
					<div v-if="pool.in.length === 0" class="p-3 h-100 text-muted text-center">
						<h3>
							<i>
								add or drop pockets!
							</i>
						</h3>
					</div>

				  <div v-for="(pocket, index) in pool.in" :data-id="index" class="d-flex bg-secondary text-white border border-dark shadow">
						<div class="p-2 w-100 text-truncate">
							<img v-if="!!pocket.img" :src="pocket.img" alt="PROFILE IMG" width="32" height="32" class="m-1 rounded" />

							<i>
								{{ pocket.name }}
							</i>
						</div>

						<div class="p-2">
							<img src="~@/assets/icons/feather/arrow-right.svg" title="Remove pocket from pool!" @click="pool_remove(index)" style="cursor: pointer;" class="m-2" />
						</div>
				  </div>
				</div>

				<!-- OUT POOL -->
				<div style="overflow-x: hidden; overflow-y: auto; border-style: dashed !important; border-width: 3px !important;" class="m-1 p-0 col pocket-space pocket.drop border rounded" data-pool="out">
				  <div v-for="(pocket, index) in pool.out" :data-id="index" class="d-flex bg-secondary text-white border border-dark shadow">
						<div class="p-2">
							<img src="~@/assets/icons/feather/arrow-left.svg" title="Add pocket to pool!" @click="pool_add(index)" style="cursor: pointer;" class="m-2" />
						</div>

						<div class="p-2 w-100 text-right text-truncate">
							<i>
								{{ pocket.name }}
							</i>

							<img v-if="!!pocket.img" :src="pocket.img" alt="PROFILE IMG" width="32" height="32" class="m-1 rounded" />
						</div>
				  </div>
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
			pool_add: function (pocket) {
				if (typeof pocket === 'object') {
					this.pool.in.push(pocket);
				} else {
					this.pool.in.push(this.pool.out.pop(pocket))
				}
			},
			pool_remove: function (pocket) {
				if (typeof pocket === 'object') {
					this.pool.out.push(pocket);
				} else {
					this.pool.out.push(this.pool.in.pop(pocket))
				}
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
					this.pool_add(db.pocket_search({id: el.dataset.id}, true).data[0]);
				}
			})
		}
  }
</script>
