<template>
  <div class="m-0 p-0 h-100 d-flex flex-column" id="action-space">
		<pocket-creation :type="'add'" v-on:add="pocket_add"></pocket-creation>

		<div style="overflow-x: hidden; overflow-y: auto; max-height: 50%;" class="w-100 h-100 flex-fill">
			<div v-for="set in results" class="m-2 p-1 flex-fill row text-center border rounded">
				<div v-for="pocket in set" class="m-2 col">
					<img v-if="pocket.img" :src="pocket.img" alt="POCKET IMG" style="min-width: 10%; max-width: 15%;" class="m-1 img-fluid rounded" />

					<h1>
						<i>
							{{ pocket.name }}
						</i>
					</h1>
				</div>
			</div>
		</div>

		<div style="height: 50%;" class="m-2 p-2 d-flex flex-column bg-white border rounded">
			<div class="d-flex">
				<div class="col text-left">
				</div>

				<div class="col text-center">
					<div class="btn-group">
						<button type="button" title="Start roulette!" :disabled="pool.in.length === 0" @click="roulette" class="btn btn-primary">Go!</button>
						<select v-model="type" title="Type of roulette!">
							<option value="0">
								Individual
							</option>
							<option value="1">
								Sets
							</option>
						</select>

						<div v-if="type == '1'" class="d-flex">
							<div class="p-2 bg-secondary text-white">
								<input type="checkbox" title="Automatic sets!" v-model:checked="grp_auto" />
							</div>

							<div v-if="!grp_auto" class="d-flex">
								<input type="number" title="Number of sets!" min="1" v-model="grp_num" />
								<input type="number" title="Number of pockets per set!" min="1" v-model="grp_s_num" />
							</div>
						</div>
						<button type="button" title="Reset roulette!" @click="reset" class="btn btn-danger">↻<span class="d-none d-lg-inline"> Reset</span></button>
					</div>
				</div>

				<div class="col text-right">
					<div v-if="pool.out.length != 0" class="btn-group">
						<button type="button" title="Return all pockets to pool!" @click="out_to_in" class="btn btn-secondary"><img src="~@/assets/icons/feather/arrow-left.svg" /><span class="d-none d-lg-inline"> Return all</span></button>
						<button v-if="this.pool.in.length > 0" type="button" title="Invert usable & used pockets!" @click="invert_in_and_out" class="btn btn-secondary"><img src="~@/assets/icons/feather/switch.svg" width="16" /><span class="d-none d-lg-inline"> Invert</span></button>
					</div>
				</div>
			</div>

			<div style="height: 0 !important;" class="m-1 flex-fill row">
				<!-- IN POOL -->
				<div style="overflow-x: hidden; overflow-y: auto; border-style: dashed !important; border-width: 3px !important;" class="m-1 p-0 col pocket-space pocket-drop border rounded" data-pool="in">
					<div v-if="pool.in.length != 0" style="top: 8px;" class="m-2 w-100 position-sticky text-center">
						<input type="text" placeholder="Search..." v-model="pool.in_filter" class="w-50 rounded" />
					</div>

					<div v-if="pool.in.length == 0" class="p-3 text-muted text-center">
						<h3>
							<i>
								add or drop pockets!
							</i>
						</h3>
					</div>

				  <div v-for="(pocket, index) in pool_in_filtered" :data-id="index" class="d-flex bg-secondary text-white border border-dark shadow">
						<div class="p-2 w-100 text-truncate">
							<img v-if="!!pocket.img" :src="pocket.img" alt="POCKET IMG" width="32" height="32" class="m-1 rounded" />

							<i>
								{{ pocket.name }}
							</i>
						</div>

						<div class="p-2 d-flex">
							<input type="number" title="Chance to choose this pocket!" min="1" max="100" v-model="pocket.chance" @change="sink_update" />

							<img src="~@/assets/icons/feather/trash.svg" title="Delete pocket from pool!" @click="pool_in_delete(index)" style="cursor: pointer;" class="m-2" />
							<img src="~@/assets/icons/feather/arrow-right.svg" title="Remove pocket from pool!" @click="pool_remove(index)" style="cursor: pointer;" class="m-2" />
						</div>
				  </div>

					<div style="bottom: 8px;" class="m-2 w-100 position-sticky text-center">
						<button type="button" title="Create a pocket!" data-toggle="modal" data-target="#pocket-add" class="btn btn-success">+<span class="d-none d-sm-inline"> Add</span></button>
					</div>
				</div>

				<!-- OUT POOL -->
				<div v-if="pool.out.length != 0" style="overflow-x: hidden; overflow-y: auto; border-style: dashed !important; border-width: 3px !important;" class="m-1 p-0 col pocket-space pocket.drop border rounded" data-pool="out">
					<div style="top: 8px;" class="m-2 w-100 position-sticky text-center">
						<input type="text" placeholder="Search..." v-model="pool.out_filter" class="w-50 rounded" />
					</div>

					<div v-for="(pocket, index) in pool_out_filtered" :data-id="index" class="d-flex bg-secondary text-white border border-dark shadow">
						<div class="p-2 d-flex">
							<img src="~@/assets/icons/feather/arrow-left.svg" title="Add pocket to pool!" @click="pool_add(index)" style="cursor: pointer;" class="m-2" />
							<img src="~@/assets/icons/feather/trash.svg" title="Delete pocket from pool!" @click="pool_out_delete(index)" style="cursor: pointer;" class="m-2" />
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
	import PocketCreation from './pocket/pocket-creation'

	function data() {
		return {
			type: 0,
			grp_auto: true,
			grp_num: 1,
			grp_s_num: 1,
			results: [],
			sink: [],
			pool: {
				in_filter: '',
				in: [],
				out_filter: '',
				out: []
			}
		}
	}

  export default {
    name: 'action-space',
		components: {
			PocketCreation
		},
		data: data,
		methods: {
			sink_update: function () {
				this.sink = []
				for (let i = 0; i < this.pool.in.length; i++) {
					for (let c = 0; c < this.pool.in[i].chance; c++) {
						this.sink.push(i)
					}
				}
				console.log(JSON.stringify(this.sink));
			},
			sink_get: function () {
				return this.sink[Math.floor(Math.random() * this.sink.length)];
			},
			roulette: function () {
				this.results = [];
				if (this.type == 0) {
					let result = this.sink_get();

					this.results.push([this.pool.in[result]]);

					this.pool_remove(result)
				} else if (this.type == 1){
					let grp_num = (this.grp_auto ? 2 : this.grp_num);
					let grp_s_num = (this.grp_auto ? Math.ceil(this.pool.in.length / grp_num) : this.grp_num);

					for (let i = 0; i < grp_s_num; i++) {
						for (let s = 0; s < grp_num; s++) {
							let result = this.sink_get();

							if (!this.results[s]) this.results.push([]);

							this.results[s].push(this.pool.in[result])

							this.pool_remove(result)

							if (this.pool.in.length == 0) {
								break;
							}
						}

						if (this.pool.in.length == 0) {
							break;
						}
					}
				}
			},
			pocket_add: function (data) {
				this.pool_add(window.util.pocket_create(data));
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
			pool_in_delete: function (pocket) {
				this.pool.in.splice(pocket, 1)
			},
			pool_out_delete: function (pocket) {
				this.pool.out.splice(pocket, 1)
			},
			invert_in_and_out: function () {
				let temp = this.pool.in;
				this.pool.in = this.pool.out;
				this.pool.out = temp;
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
		computed: {
			pool_in_filtered: function () {
				if (this.pool.in_filter == '') {
					return this.pool.in
				} else {
					return this.pool.in.filter(pocket => pocket.name.toLowerCase().indexOf(this.pool.in_filter) != -1)
				}
			},
			pool_out_filtered: function () {
				if (this.pool.out_filter == '') {
					return this.pool.out
				} else {
					return this.pool.out.filter(pocket => pocket.name.toLowerCase().indexOf(this.pool.out_filter) != -1)
				}
			}
		},
		watch: {
			'pool.in': function () {
				this.sink = []
				for (let i = 0; i < this.pool.in.length; i++) {
					for (let c = 0; c < this.pool.in[i].chance; c++) {
						this.sink.push(i)
					}
				}
				console.log(JSON.stringify(this.sink));
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
