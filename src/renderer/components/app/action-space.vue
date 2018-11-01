<template>
  <div class="m-0 p-0 h-100 d-flex flex-column" id="action-space">
		<div style="max-height: 50%;" class="m-2 w-100 h-100 flex-fill">
			<div v-if="result" class="text-center">
				<img v-if="result.img" :src="result.img" alt="POCKET IMG" style="min-width: 10%; max-width: 15%;" class="m-1 img-fluid rounded" />

				<h1>
					<i>
						{{ result.name }}
					</i>
				</h1>
			</div>
		</div>

		<div style="height: 50%;" class="m-2 p-2 d-flex flex-column border rounded">
			<div class="d-flex">
				<div class="col-4 text-left">
				</div>

				<div class="col-4 text-center">
					<div class="btn-group">
						<button type="button" title="Start roulette!" :disabled="pool.in.length === 0" @click="roulette" class="btn btn-primary">Go!</button>
						<button type="button" title="Settings for roulette!" data-toggle="modal" data-target="#settings-menu" class="btn btn-secondary">⚙<span class="d-none d-lg-inline"> Settings</span></button>
						<button type="button" title="Add a temporary pocket to the roulette!" class="btn btn-success">+<span class="d-none d-lg-inline"> Add</span></button>
						<button type="button" title="Reset roulette!" @click="reset" class="btn btn-danger">↻<span class="d-none d-lg-inline"> Reset</span></button>
					</div>
				</div>

				<div class="col-4 text-right">
					<div class="btn-group">
						<button type="button" title="Return all pockets to pool!" :disabled="pool.out.length == 0" @click="out_to_in" class="btn btn-secondary"><img src="~@/assets/icons/feather/arrow-left.svg" /><span class="d-none d-lg-inline"> Return all</span></button>
					</div>
				</div>
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
							<img v-if="!!pocket.img" :src="pocket.img" alt="POCKET IMG" width="32" height="32" class="m-1 rounded" />

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

							<img v-if="!!pocket.img" :src="pocket.img" alt="POCKET IMG" width="32" height="32" class="m-1 rounded" />
						</div>
				  </div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import pocket from './pocket/pocket'

	function data() {
		return {
			result: {},
			pool: {
				in: [],
				out: []
			}
		}
	}

  export default {
    name: 'action-space',
		components: {
			pocket
		},
		data: data,
		methods: {
			roulette: function () {
				let result = Math.floor(Math.random() * this.pool.in.length)
				Object.assign(this.result, this.pool.in[result]);
				this.pool_remove(result)
			},
			pool_add: function (pocket) {
				if (typeof pocket === 'object') {
					this.pool.in.push(pocket);
				} else {
					this.pool.in.push((this.pool.out.splice(pocket, 1))[0])
				}
			},
			pool_remove: function (pocket) {
				if (typeof pocket === 'object') {
					this.pool.out.push(pocket);
				} else {
					this.pool.out.push((this.pool.in.splice(pocket, 1))[0])
				}
			},
			in_to_out: function () {
				if (this.pool.in.length == 0) return;
				while (this.pool.in.length > 0) {
					this.pool_remove(0)
				}
			},
			out_to_in: function () {
				if (this.pool.out.length == 0) return;
				while (this.pool.out.length > 0) {
					this.pool_add(0)
				}
			},
			reset: function () {
				Object.assign(this.$data, data())
			}
		},
		mounted: function () {
			window.dragula.on('drop', (el, target, source, sibling) => {
				if (!target.dataset.pool) return;

				window.dragula.cancel();
				if (target.dataset.pool === 'in') {
					this.pool_add(db.pocket_search({id: el.dataset.id}, true).data[0])
				}
			})
		}
  }
</script>
