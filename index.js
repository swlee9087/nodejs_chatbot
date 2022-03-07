// same as train.js
const {NlpManager} = require("node-nlp");
console.log("Starting Chatbot ...");
const manager = new NlpManager({languages:["en"]});

// load saved model
manager.load();

// load module readline to take input from terminal
var readline = require("readline");
var rl = readline.createInterface(process.stdin,process.stdout);
console.log("Chatbot Start.");
rl.setPrompt("> ");
rl.prompt();
rl.on("line", async function (line){
    // pass input text to manager for response + display response
    const response = await manager.process("en",line);
    console.log(response.answer);
    rl.prompt();
}).on("close", function(){
    process.exit(0);
});