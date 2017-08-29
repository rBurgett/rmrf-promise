const rimraf = require('rimraf');

const rmrf = (...args) => new Promise((resolve, reject) => {
    const [ filePath, options = {} ] = args;
    rimraf(filePath, options, err => {
        if(err) {
            reject(err);
        } else {
            resolve();
        }
    });
});

module.exports = rmrf;
