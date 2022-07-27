const editJsonFile = require("edit-json-file");
const logger = require('../util/logger').log

// add qualti of liefe funktions below
// Import the funktions like this : const cfs = require('../util/customfunctions.js')

module.exports = {
        writetojsonvariabl(variablenname, wertdervariable, jsondatei){ 
            //  if inputing a number use let output = Number((zahlvariable)) in host funktion
               
            
            try {
                let file = editJsonFile(`../${jsondatei}`, {
                    autosave: true
                });
    
                file.set(variablenname, wertdervariable);

                logger.http(`\"${variablenname}\" has been changed \"${wertdervariable}\" in the file \"${jsondatei}\".`);
                return true
            } catch (error) {
                logger.error('Error while performing writetojson in customfunctions');
                console.log(error)
            }

        },
}


