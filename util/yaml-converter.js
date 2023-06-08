const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');
const templates = require('./jason-templates.js')
const logger = require('./logger').log;

module.exports = {
    async setconfig(){
        let configuration = readyamlfile('./config.yaml', 'utf8' )
        if (configuration[0].use_yaml_config === true) {
            setinjason(configuration)
        } else {
            logger.info("Configuration YAML is skipt")
            return;
        }
  
    }
}

async function setinjason(inputconfiguration){

    // general config
    writjson("data","config.json",templates.generalconfig(inputconfiguration[1])) 

    // db Config
    writjson("data","db.json",templates.dbconfig(inputconfiguration[2])) 
    
    //Command 
    writjson("data","comand.json",templates.commandconfig(inputconfiguration[4]))    
    
    
}

function writjson(configfolder, configname, contents){

    let filelocation = path.join(__dirname, '..', configfolder, configname)

    fs.writeFile(filelocation, contents, function (err) {
        if (err) throw err;})
    
    logger.info(`set configuration in ${configname}`)
    
}

function readyamlfile(path, encoding){

    try {
        let fileContents = fs.readFileSync(path, encoding);
        let data = yaml.loadAll(fileContents,null);
        return data;
    } catch (e) {
        logger.error(e);
    }

}