const editJsonFile = require("edit-json-file");
const logger = require('../util/logger').log
const path = require('path');

// add qualti of liefe funktions below
// Import the funktions like this : const cfs = require('../util/customfunctions.js')

module.exports = {
        writetojsonvariabl(variablenname, wertdervariable, jsondateiname, jsonsubfoldername){ 
            //  if inputing a number use let output = Number((zahlvariable)) in host funktion
            // input must be a valid jason variabel input
         
            var datei
            if (jsonsubfoldername !== null) {
                datei = path.join(__dirname, '..', jsonsubfoldername, jsondateiname)
            } else {
                datei = path.join(__dirname, '..', jsondateiname)
            }    

            try {
                let file = editJsonFile( datei, {
                    autosave: true
                });
    
                file.set(variablenname, wertdervariable);

                logger.http(`\"${variablenname}\" has been changed \"${wertdervariable}\" in the file \"${jsondateiname}\".`);
                return true
            } catch (error) {
                logger.error('Error while performing writetojson in customfunctions');
            }

        },
}


