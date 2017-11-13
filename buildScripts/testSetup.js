//this file isn't transpiled , so must use common js and ESS

//register babel to transpile before our test run.
require('babel-register')();

//Disable the webpack feachers that MOCHA DOESN'T  support
require.extensions['.css'] = function() {};