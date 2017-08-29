/* global describe, it, before, after */

require('should');
const fs = require('fs-extra');
const path = require('path');
const rmrf = require('../index.js');

const tempDir = path.join('test', 'temp');
const someFolderPath = path.join(tempDir, 'some-folder');
const someFilePath = path.join(tempDir, 'some-file');

describe('rmrf-promise', () => {

    before(() => {
        fs.mkdirSync(tempDir);
        fs.mkdirSync(someFolderPath);
        fs.writeFileSync(path.join(someFolderPath, 'file0'), 'some file contents', 'utf8');
        const innerFolderPath = path.join(someFolderPath, 'folder0');
        fs.mkdirSync(innerFolderPath);
        fs.writeFileSync(path.join(innerFolderPath, 'file0'), 'some file contents', 'utf8');
        fs.writeFileSync(path.join(innerFolderPath, 'file1'), 'some file contents', 'utf8');
        fs.writeFileSync(path.join(innerFolderPath, 'file2'), 'some file contents', 'utf8');
        fs.writeFileSync(someFilePath, 'some file contents', 'utf8');
    });

    it('should be a function', () => {
        rmrf.should.be.a.Function();
    });

    it('should return a promise', () => {
        (rmrf('notarealfile')).should.be.a.Promise();
    });

    it('errors should be rejected', () => {
        (rmrf()).should.be.rejected();
    });

    it('should remove files', done => {
        rmrf(someFilePath)
            .then(() => {
                try {
                    fs.statSync(someFilePath);
                    done(new Error('File still exists'));
                } catch(err) {
                    done();
                }
            })
            .catch(err => done(err));

    });

    it('should recursively remove folders', done => {
        rmrf(someFolderPath)
            .then(() => {
                try {
                    fs.statSync(someFolderPath);
                    done(new Error('Folder still exists'));
                } catch(err) {
                    done();
                }
            })
            .catch(err => done(err));

    });

    after(() => {
        fs.removeSync(tempDir);
    });

});
