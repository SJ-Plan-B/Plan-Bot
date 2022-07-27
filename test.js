const editJsonFile = require("edit-json-file");

let jsonfile = 'data/counter.json'
let jsonvariable = 'deutschcounter'
let wertdervariable = 4





try {
    let file = editJsonFile(`../${jsonfile}`, {
        autosave: true
    });

    file.set(jsonvariable, wertdervariable);

    

} catch (error) {

    console.log(error)
}
