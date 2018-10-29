import events from 'events'
import localforage from 'localforage'

class db {
	constructor() {
		this.version = '1.0.0'

		this.events = new events.EventEmitter()

		this._pocket = {
			id: 0,
			img: '',
			name: '',
			pockets: []
		}

		this.data = []
	}

	async setup() {
		let loaded_data = await this.load()
		if (loaded_data.success) {
			this.data = loaded_data.data;
		}

		console.log(`DATABASE IS DONE SETTING UP!\nVersion: ${this.version}`)

		this.events.emit('setup')
	}

	async reset(refresh) {
		await localforage.clear()

		if (refresh == undefined || refresh == true) location.reload();

		this.events.emit('reset')
	}

	async save(pocket) {
		// BACK UP DATA
		let backup = this.load();
		if (backup.success) localforage.setItem('data_backup', backup.data)

		localforage.setItem('data', this.data)

		this.events.emit('save')

		return {
			success: true,
			data: this.data
		}
	}

	async load() {
		let data = await localforage.getItem('data')

		if (!data) {
			data = await localforage.getItem('data_backup')

			// TODO Tell user backup was loaded (nicer GUI)
			if (data) alert('BACKUP LOADED')
		}

		this.events.emit('load')

		return {
			success: data ? true : false,
			data: data ? data : {}
		}
	}

	pocket_data_validation(data) {
		let valid_data = {}

		for (let property of Object.keys(data)) {
			if (this._pocket.hasOwnProperty(property)) valid_data[property] = data[property]
		}

		return valid_data
	}

	pocket_search(queries, raw) {
		let results = []

		for (let i = 0; i < this.data.length; i++) {
			for (let query of Object.keys(queries)) {
				if (this.data[i][query].toLowerCase().indexOf(queries[query]) != -1) {
					if (raw) {
						results.push(this.data[i]);
					} else {
						results.push(i);
					}
					break;
				}
			}
		}

		this.events.emit('pocket_search')

		return {
			success: !results.length ? false : true,
			data: results
		}
	}

	pocket_create(data) {
		let pocket = Object.assign({}, this._pocket, this.pocket_data_validation(data));

		this.data.push(pocket);

		this.save()

		this.events.emit('pocket_create')

		return {
			success: true,
			data: pocket
		}
	}

	pocket_remove(ids) {
		let pockets = []

		for (let id of ids) {
			if (this.data[id]) {
				pockets.push(this.data.pop[id])
			}
		}

		this.save()

		this.events.emit('pocket_remove')

		return {
			success: !pocket.length ? false : true,
			data: pockets
		}
	}
}

export default async function() {
	const instance = new db()
	await instance.setup()

	return instance
}
