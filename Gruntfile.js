/*
 * grunt-toc
 * https://assemble.github.com/assemble/
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    toc: {
      readme: {
        files: {
          'test/actual/readme-with-toc.md': ['README.md']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // These plugins provide necessary tasks.
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('test', ['jshint', 'toc']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('default', ['test']);
};
