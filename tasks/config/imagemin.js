module.exports = function (grunt) {
    var mozjpeg = require('imagemin-mozjpeg');

    var folderName = grunt.option('target');
    if (!folderName) {
        folderName = "";
    }


    grunt.config.set('imagemin', { // Task
        static: { // Target
            options: { // Target options
                optimizationLevel: 3,
            },
            files: [{
                expand: true, // Enable dynamic expansion
                cwd: folderName + '/', // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                dest: folderName + '2/' // Destination path prefix
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
};