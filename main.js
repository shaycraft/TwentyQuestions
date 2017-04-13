var tree = {};
tree.description = 'Is it an animal?';
tree.right = {};
tree.right.description = 'Is it a bird?';
var node = tree;


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

processQuestion();

function processQuestion() {
    if (node.left !== undefined) {
        rl.question(node.description, (ans) => processYesNo(ans));
    } else {
        askGuess();
    }
}

function processyesNo(ans) {
    let x = ans.toLowerCase();
    if (x === 'y' || ans === 'yes') {
        node = node.right;
    } else {
        node = node.left;
    }

    processQuestion();
}

function askGuess() {
    rl.question(node.description, (ans) => processGuess(ans));
}

function processGuess(ans) {
    if (ans.toLowerCase() === 'y') {
        console.log('Hooray!');
        node = tree;
        processQuestion();
    } else {
        // ask these questions:
        // What is the animal?
        // What would distinguish an x from a y?
        // What would the answer to that question be?
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