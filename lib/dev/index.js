import uuid
	from 'uuid/v4'

function ish(that) { return this == that }
function doNothing() {}
const {defineProperty = doNothing} = Object
const valueOf_PropertyDescriptor = {configurable:true, writable:false}

function random() {
	return '$' +  uuid().split('-').join('$') + '$'
}

export default function nymbol(...components) {
	for (let i = components.length; 0 <=-- i;) {
		if (null == components[i]) components[i] = random()
	}
	const string = components.join('$')
	if (! ish.call(null, this)) {
		this.valueOf = function () { return string }
		defineProperty(this, 'valueOf', valueOf_PropertyDescriptor)
	}
	return string
}

nymbol.prefix =
	function (...prefix) { return function (...suffix) {
		return nymbol.call(this, ...prefix, ...suffix)
	}}

nymbol.suffix =
	function (...suffix) { return function (...prefix) {
		return nymbol.call(this, ...prefix, ...suffix)
	}}
