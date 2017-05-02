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


const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var answerQuestion = function(ans) {
    if (ans == 'y' || ans == 'yes') {
        if (node.right === undefined) {
            console.log('Yay!');
            node = tree;
        } else {
            node = node.right;
        }
        processNode();
    } else { // answer is no
        if (node.left === undefined) {
            newNode = {};
            newNode.description = 'blank';
            if (node.parent.left !== undefined && node.parent.left.description == node.description) {
                node.parent.left = newNode;
            } else {
                node.parent.right = newNode;
            }
            newNode.parent = node.parent;
            node.parent = undefined;
            askNewAnimal(newNode, node);

            //node = tree;
        } else {
            node = node.left;
            processNode();
        }
    }
}

var processNode = function() {
    rl.question(getQuestion(node), answerQuestion);

}

processNode();


function askNewAnimal_final(d, q, qa, newNodeQuestion, oldNode) {
    newNode = {}
    newNode.description = d;
    newNode.class = 'entry';
    newNodeQuestion.description = q;
    newNodeQuestion.class = 'question';
    if (qa == 'yes' || qa == 'y') {
        newNodeQuestion.right = newNode;
        newNodeQuestion.left = oldNode;
    } else {
        newNodeQuestion.left = newNode;
        newNodeQuestion.right = oldNode;
    }
    newNode.parent = newNodeQuestion;
    oldNode.parent = newNodeQuestion;

    node = tree;
    processNode();
}

function askNewAnimal_whatdistans(d, q, newNodeQuestion, oldNode) {
    rl.question(`If there animal were ${d} the answer would be?`, (qa) => { askNewAnimal_final(d, q, qa, newNodeQuestion, oldNode) });
}

function askNewAnimal_whatdistinguish(d, newNodeQuestion, oldNode) {
    rl.question(`What would distinguish a ${d} from a ${oldNode.description}?`, (q) => { askNewAnimal_whatdistans(d, q, newNodeQuestion, oldNode) });
}

function askNewAnimal(newNodeQuestion, oldNode) {
    rl.question('What is it?', d => { askNewAnimal_whatdistinguish(d, newNodeQuestion, oldNode); });

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