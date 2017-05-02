var tree = {};
tree.description = 'Is it an animal?';
tree.class = 'question';
tree.right = {};
tree.right.description = 'bird';
tree.right.parent = tree;
tree.right.class = 'entry';
tree.left = {};
tree.left.description = 'rock'
tree.left.parent = tree;
tree.left.class = 'entry';
var node = tree;
var atTop = true;


const rls = require('readline-sync');

while (true) {
    DebugTree(node);
    var ans = rls.question(getQuestion(node));
    if (ans == 'y' || ans == 'yes') {
        if (node.right === undefined) {

            console.log('Yay!');
            node = tree;
        } else {
            node = node.right;
        }
    } else { // answer is no
        if (node.left === undefined) {
            newNode = {};
            if (node.parent.left !== undefined && node.parent.left.description == node.description) {
                node.parent.left = newNode;
            } else {
                node.parent.right = newNode;
            }
            newNode.parent = node.parent;
            node.parent = undefined;
            askNewAnimal(newNode, node);

            node = tree;
        } else {
            node = node.left;
        }
    }
}

function askNewAnimal(newNodeQuestion, node) {
    var d = rls.question('What is it?');
    var q = rls.question(`What would distinguish a ${d} from a ${node.description}?`);
    var qa = rls.question(`If there animal were ${d} the answer would be?`);
    newNode = {}
    newNode.description = d;
    newNode.class = 'entry';
    newNodeQuestion.description = q;
    newNodeQuestion.class = 'question';
    if (qa == 'yes' || qa == 'y') {
        newNodeQuestion.right = newNode;
        newNodeQuestion.left = node;
    } else {
        newNodeQuestion.left = newNode;
        newNodeQuestion.right = node;
    }
    newNode.parent = newNodeQuestion;
    node.parent = newNodeQuestion;
}

function getQuestion(n) {
    if (n.class === 'entry') {
        return `Is it a ${n.description}?`
    } else {
        return n.description;
    }
}

function DebugNode(node) {
    console.log('################DEBUG################');
    console.log(`Description: ${node.description}`)
    if (node.left !== undefined) {
        console.log(`left: ${node.left.description}`);
    } else {
        console.log('left: null');
    }
    if (node.right !== undefined) {
        console.log(`right: ${node.right.description}`);
    } else {
        console.log('right: null');
    }
    console.log('#####################################');
}

function DebugTree(n, depth) {
    var d = depth || 0;
    if (d === 0) {
        console.log('######################DEBUG TREE#####################');
    }

    PrintNode(n.description, d);

    if (n.right !== undefined) {
        PrintNode('***RIGHT***', d + 1);
        DebugTree(n.right, d + 1);
    }
    if (n.left !== undefined) {
        PrintNode('***LEFT***', d + 1);
        DebugTree(n.left, d + 1);
    }

    if (d === 0) {
        console.log('####################################################');
    }
}

function PrintNode(txt, depth) {
    sb = [];
    for (var i = 0; i < depth; i++) {
        sb.push('----');
    }
    sb.push(txt);
    console.log(sb.join(''));
}