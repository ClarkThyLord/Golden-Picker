import events from 'events'
import localforage from 'localforage'

class db {
	constructor() {
		this.version = '1.0.0'

		this.events = new events.EventEmitter()

		this.structure = {
			pocket: {
				img: '',
				name: '',
				chance: 1
			}
		}

		this.data = []
	}

	async default () {
		let data = await window.$.getJSON('./static/data.json')
		for (let student of data) {
			this.pocket_add(student)
		}
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
		localStorage.clear();
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

	pocket_add(data) {
		let id = localStorage.getItem('id_count') || "0";
		let pocket = Object.assign(window.util.pocket_create(data), {
			id: id
		});
		localStorage.setItem('id_count', JSON.parse(id) + 1)

		this.data.push(pocket);

		this.save()

		this.events.emit('pocket_add')

		return {
			success: true,
			data: pocket
		}
	}

	pocket_remove(id) {
		let pocket = {}

		id = this.data.map(function(pocket) { return pocket.id; }).indexOf(id + '')
		if (id != -1) {
			pocket = this.data.splice(id, 1)[0]

			this.save()

			this.events.emit('pocket_remove')
		}

		return {
			success: id != -1 ? true : false,
			data: pocket
		}
	}
}

export default async function() {
	const instance = new db()
	await instance.setup()

	return instance
}
