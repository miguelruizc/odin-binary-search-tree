import { prettyPrint } from './helpers.js';

class Node {
	constructor() {
		this.data = null;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		// Sort
		// remove duplicates
		// should return level-0 root node
	}

	insert(value) {}

	deleteItem(value) {}

	find(value) {}

	levelOrder(callback) {
		// iterative implementation
		// recursive implementation
	}

	inOrder(callback) {}

	preOrder(callback) {}

	postOrder(callback) {}

	height(node) {}

	depth(node) {}

	isBalanced() {}

	rebalance() {}
}

console.log("Test")