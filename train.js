// import NlpManager in node-nlp. for training ,saving, loading and processing.
const {NlpManager} = require("node-nlp");

// create new NlpManager class instc.
const manager = new NlpManager({languages:["en"]});;

//import fs module to read json files
const fs = require ("fs");

// read all the intents files in folder
const files = fs.readdirSync("./intents");

// loop thru files, parsing string to object, passing to manager instc to train and process. 
for (const file of files){
    let data = fs.readFileSync(`./intents/${file}`);
    data = JSON.parse(data);
    const intent = file.replace(".json","");
    for (const question of data.questions){
        manager.addDocument("en", question, intent);
    }
    for (const answer of data.answers){
        manager.addAnswer("en",intent, answer);
    }
}
// init training and saving the manager instc. 
async function train_save(){
    await manager.train();
    manager.save();
}

// call the above funtion. 
train_save();