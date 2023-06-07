const yaml = require('js-yaml')
const fs = require('fs');

try {
    let fileContents = fs.readFileSync('./config.yaml', 'utf8');
    let data = yaml.load(fileContents);

    console.log(data);
} catch (e) {
    console.log(e);
}