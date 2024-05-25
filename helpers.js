export const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

export function removeDuplicates(array) {
	// do the thing
	let uniqueArray = [];
	array.forEach((element) => {
		if (!uniqueArray.includes(element)) uniqueArray.push(element);
	});

	return uniqueArray;
}

export class Queue {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
	}

	dequeue() {
		if (this.items.length === 0) {
			return null;
		}
		return this.items.shift();
	}

	isEmpty() {
		if (this.items.length === 0) return true;
		return false;
	}
}

export function generateRandomArray(size, min, max) {
	const generateRandomInt = function (min, max) {
		min = Math.floor(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	let array = [];

	for(let i = 0; i < size; i++){
		array.push(generateRandomInt(min, max));
	}

	return removeDuplicates(array);
}
