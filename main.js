var tree = {};
tree.description = 'Is it an animal?';
tree.class = 'question';
tree.right = {};
tree.right.description = 'bird';
tree.right.class = 'entry';
var node = tree;
var atTop = true;


const rls = require('readline-sync');

while (true) {
    var ans = rls.question(getQuestion(node));
    console.dir(node.right);
    if (ans == 'y' || ans == 'yes') {
        if (node.right === undefined) {
            //node.right = {};
            //askNewAnimal(node, node.right);
            console.log('Yay!');
            node = tree;
        } else {
            node = node.right;
        }
    } else {
        if (node.left === undefined) {
            node.left = {};
            node.left = askNewAnimal(node);
            node = tree;
        } else {
            node = node.left;
        }
    }
}

function askNewAnimal(parent) {
    var d = rls.question('What is it?');
    var q = rls.question(`What would distinguish a ${d} from a ${parent.description}?`);
    var qa = rls.question(`If there animal were ${d} the answer would be?`);
    child = {}
    child.description = q;
    child.class = 'question';
    if (qa == 'yes' || qa == 'y') {
        child.right = {};
        child.right.class = 'entry';
        child.right.description = d;
    } else {
        child.left = {};
        child.left.class = 'entry';
        child.left.description = d;
    }

    return child;
}

function getQuestion(n) {
    if (n.class === 'entry') {
        console.log('DEBUG:  in getQuestion for entry');
        return `Is it a ${n.description}?`
    } else {
        console.log('DEBUG:  in getQuestion for question');
        return n.description;
    }
}



/*
Example python code:
def main():
    "Guess the animal. Add a new node for a wrong guess."

    while 1:
        print
        if not yes("Are you thinking of an animal? "): break
        p = knowledge
        while p.left != None:
            if yes(p.question + "? "):
                p = p.right
            else:
                p = p.left

        if yes("Is it a " + p.question + "? "): continue
        animal = raw_input("What is the animals name? ")
        question = raw_input("What question would distinguish a %s from a %s? "
                             % (animal, p.question))
        p.left = node(p.question)
        p.right = node(animal)
        p.question = question

        if not yes("If the animal were %s the answer would be? " % animal):
            (p.right, p.left) = (p.left, p.right)

main()
*/