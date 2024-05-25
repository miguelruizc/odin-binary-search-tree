import { removeDuplicates, Queue } from './helpers.js';

class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

export class Tree {
	constructor(array = []) {
		// Remove duplicates & sort
		array = removeDuplicates(array);
		array.sort((a, b) => a - b);

		// Build tree
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		// Recursively returns root Node with subtrees

		// BASE CASE: 1 element array, return node
		if (array.length === 1) {
			return new Node(array[0], null, null);
		}
		// BASE CASE: 0 element array, return null
		if (array.length === 0) {
			return null;
		}

		// Find left array & right array
		let midpoint = Math.trunc(array.length / 2);
		let start = 0;
		let end = array.length - 1;

		let left = array.slice(start, midpoint);
		let right = array.slice(midpoint + 1, end + 1);

		// recursively, build left tree, build right tree
		return new Node(array[midpoint], this.buildTree(left), this.buildTree(right));
	}

	insert(value) {
		let inserted = false;
		let node = this.root;
		if (node === null) {
			this.root = new Node(value, null, null);
			inserted = true;
		}

		while (!inserted) {
			// LEFT
			if (value < node.data) {
				// if null, insert
				if (node.left === null) {
					node.left = new Node(value, null, null);
					inserted = true;
				}
				// if not null, advance node
				else {
					node = node.left;
				}
			}
			// RIGHT
			else {
				// if null, insert
				if (node.right === null) {
					node.right = new Node(value, null, null);
					inserted = true;
				}
				// if not null, advance node
				else {
					node = node.right;
				}
			}
		}
	}

	deleteItem(value, root = this.root, parent = null) {
		if (arguments.length === 1) {
			root = this.root;
			parent = null;
		}
		// If value to remove is in left, call deleteItem for left subtree
		if (value < root.data) this.deleteItem(value, root.left, root);
		// If value to remove is in right, call deleteItem for right subtree
		else if (value > root.data) this.deleteItem(value, root.right, root);
		// If value is equal, remove value
		else {
			// CASE 1: no child
			if (root.left === null && root.right === null) {
				if (value < parent.data) {
					parent.left = null;
					return;
				} else {
					parent.right = null;
					return;
				}
			}

			// CASE 2: 1 child
			else if (root.left === null) {
				if (value < parent.data) {
					parent.left = root.right;
					return;
				} else {
					parent.right = root.right;
					return;
				}
			} else if (root.right === null) {
				if (value < parent.data) {
					parent.left = root.left;
					return;
				} else {
					parent.right = root.left;
					return;
				}
			}

			// CASE 3: 2 childs
			else {
				// Find min node of right tree (implement finMin)
				let min = this.findMin(root.right);

				// Replace deleted node with min node
				root.data = min;

				// delete the min value of right tree
				this.deleteItem(min, root.right, root);
			}
		}
	}

	find(value) {
		// Starting from ROOT
		let node = this.root;
		let found = false;

		while (!found) {
			// If null, not in the tree
			if (node === null) return null;
			// Is current node, return
			if (node.data === value) return node;
			// else, go to next, left or right
			node = value < node.data ? node.left : node.right;
		}
	}

	findMin(root) {
		let min = root.data;

		this.levelOrderRecursive(root, new Queue(), function (node) {
			if (node.data < min) min = node.data;
		});

		return min;
	}

	levelOrder(callback) {
		// iterative implementation

		const q = new Queue();
		let node = this.root;

		// Enqueue root node as initial DISCOVER NODE (Node that has not been visited yet)
		q.enqueue(node);

		while (!q.isEmpty()) {
			// Visit node
			node = q.dequeue();
			// Enqueue children
			if (node.left !== null) {
				q.enqueue(node.left);
			}
			if (node.right !== null) {
				q.enqueue(node.right);
			}
			// Call callback function
			callback(node);
		}
	}

	levelOrderRecursive(node, q = new Queue(), callback) {
		// enqueue children
		if (node.left !== null) q.enqueue(node.left);
		if (node.right !== null) q.enqueue(node.right);

		// call callback function
		callback(node);

		// visit node
		if (!q.isEmpty()) {
			let next = q.dequeue();
			this.levelOrderRecursive(next, q, callback);
		}
	}

	inOrder(callback, node = this.root, array = []) {
		if (node === null) return;
		// 1. Visit left subtree
		this.inOrder(callback, node.left, array);
		// 2. visit root
		if (!callback) array.push(node.data);
		else callback(node);
		// 3. visit right subtree
		this.inOrder(callback, node.right, array);

		return array;
	}

	preOrder(callback, node = this.root, array = []) {
		if (node === null) return;
		// 1. visit root
		if (!callback) array.push(node.data);
		else callback(node);
		// 2. Visit left subtree
		this.preOrder(callback, node.left, array);
		// 3. Visit right subtree
		this.preOrder(callback, node.right, array);

		return array;
	}

	postOrder(callback, node = this.root, array = []) {
		if (node === null) return;
		// 1. Visit left subtree
		this.postOrder(callback, node.left, array);
		// 2. visit right subtree
		this.postOrder(callback, node.right, array);
		// 3. visit root
		if (!callback) array.push(node.data);
		else callback(node);

		return array;
	}

	height(node) {
		// number of edges in the longest path from node to leaf
		// formula: height = max(heightLeftSubtree, heightRightSubtree) + 1;

		if (node == null) return -1;

		let leftHeight = this.height(node.left);
		let rightHeight = this.height(node.right);
		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth(value, node = this.root, distance = 0) {
		// empty tree
		if (node === null) return null;

		// Value found
		if (value === node.data) return distance;
		// Recursively check left tree
		else if (value < node.data) {
			distance++;
			return this.depth(value, node.left, distance);
		}
		// Recursively check right tree
		else if (value > node.data) {
			distance++;
			return this.depth(value, node.right, distance);
		}
	}

	isBalanced(node = this.root) {
		if (node === null) {
			return true;
		}

		let heightDiff = Math.abs(this.height(node.left) - this.height(node.right));

		// Current tree is balanced, left tree and subtrees are balanced, right tree and subtress are balanced
		return heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	rebalance() {
		// Generate ordered array
		let orderedArray = this.inOrder();

		// Rebuild the tree
		this.root = this.buildTree(orderedArray);
	}
}
