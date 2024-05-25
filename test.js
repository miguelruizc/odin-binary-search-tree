import { Tree } from './binary-search-tree.js';
import { prettyPrint, generateRandomArray } from './helpers.js';

const array = generateRandomArray(20, 1, 100);
const tree = new Tree(array);

console.log(`Array: \n  ${array}\n`);

console.log(`Is the tree balanced:\n  ${tree.isBalanced()}\n`);

let arrayLevelOrder = [];
tree.levelOrder((node) => {
	arrayLevelOrder.push(node.data);
});
console.log(`Elements (Level-order):\n  ${arrayLevelOrder}`);
console.log(`Elements (pre-order):\n  ${tree.preOrder()}`);
console.log(`Elements (post-order):\n  ${tree.postOrder()}`);
console.log(`Elements (in-order):\n  ${tree.inOrder()}\n`);

let moreNumbers = generateRandomArray(10, 101, 150);
moreNumbers.forEach((element) => {
	tree.insert(element);
});

console.log(`New tree (in-order):\n  ${tree.inOrder()}\n`);
console.log(`Is the tree balanced:\n  ${tree.isBalanced()}\n`);

console.log(`Calling rebalance()...\n`);
tree.rebalance();

console.log(`Is the tree balanced:\n  ${tree.isBalanced()}\n`);

arrayLevelOrder = [];
tree.levelOrder((node) => {
	arrayLevelOrder.push(node.data);
});
console.log(`Elements (Level-order):\n  ${arrayLevelOrder}`);
console.log(`Elements (pre-order):\n  ${tree.preOrder()}`);
console.log(`Elements (post-order):\n  ${tree.postOrder()}`);
console.log(`Elements (in-order):\n  ${tree.inOrder()}\n`);