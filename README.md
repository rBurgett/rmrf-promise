# rmrf-promise
The awesome [rimraf](https://www.npmjs.com/package/rimraf) package wrapped in Promises for removing files and folders recursively using Node.

## Why?
While Node's built-in `fs` package works well for many file system operations, recursive folder deletion is somewhat inconsistent, especially in Windows. `rimraf` solved that problem by creating a library which can consistently remove folders. `rmrf-promise` does not add or take away anything from `rimraf` itself. All that `rmrf-promise` does is return Promises instead of taking callbacks when calling `rimraf`.

## Installation
```
$ npm install rmrf-promise
```

## Usage

`rimraf(filePath, [options])`

`filePath` is the path to the file or folder to be removed.

`options` is an optional object of `rimraf` options. To see all available options, click [here](https://www.npmjs.com/package/rimraf#options).

```js
const rmrf = require('rmrf-promise');

// Usage with manual Promise handling
rmrf('some-file-path')
    .then(() => {
        // success!
    })
    .catch(err => {
        // handle error
    });

// Usage within an sync function
async function() {
    try {
        await rmrf('some-file-path');
        // success!
    } catch(err) {
        // handle error
    }
};

// Usage within a generator function
co(function*() {
    try {
        yield rmrf('some-file-path');
        // success!
    } catch(err) {
        // handle error
    }
});
```

## Running Tests
```
$ npm install
$ npm test
```

## License
Apache License Version 2.0
