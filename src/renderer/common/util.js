import $ from 'jquery'

export default {
	url_open: url_open,
	input_validate: input_validate,
	form_reset: form_reset,
	form_validate: form_validate,
	pocket_data_validation: pocket_data_validation,
	pocket_create: pocket_create
}

function url_open(link) {
	try {
		if (process.env.BUILD_TARGET !== 'web') {
			this.$electron.shell.openExternal(link)
		} else {
			window.open(link)
		}
	} catch (e) {
		window.open(link)
	}

	return false;
}

function input_valid(input) {
	input.style.borderColor = "green"

	return true;
}

function input_invalid(input) {
	input.style.borderColor = "red"

	return false;
}

function input_validate(input) {
	if (!input.required) return true;

	let valid = false;
	switch (input.type) {
		case 'text':
			if (input.value === '') {
				valid = input_invalid(input)
			}
			else {
				valid = input_valid(input)
			}
			break;
		case 'color':
			if (input.value === '') {
				valid = input_invalid(input)
			}
			else {
				valid = input_valid(input)
			}
			break;
		case 'date':
			if (input.value === '') {
				valid = input_invalid(input)
			}
			else {
				valid = input_valid(input)
			}
			break;
		case 'time':
			if (input.value === '') {
				valid = input_invalid(input)
			}
			else {
				valid = input_valid(input)
			}
			break;
		case 'file':
			if (file.fileList.length > 0) {
				input_invalid(input)
			}
			else {
				input_invalid(input)
			}
			break;
	}

	return valid;
}

function form_reset(form) {
	$(form).find('input').each((index, input) => {
		input.style.borderColor = ""
	})
}

function form_validate(form) {
	let valid = true;
	$(form).find('input').each((index, dom) => {
		if (!dom.required) return;

		if (!input_validate(dom)) valid = false;
	})

	return valid;
}

function pocket_data_validation(data) {
	let valid_data = {}

	for (let property of Object.keys(data)) {
		if (window.db.structure.pocket.hasOwnProperty(property)) valid_data[property] = data[property]
	}

	return valid_data
}

function pocket_create(data) {
	return Object.assign({}, window.db.structure.pocket, pocket_data_validation(data));
}
