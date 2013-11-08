/*
 * grunt-toc
 * https://github.com/assemble/grunt-toc
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var makeTOC = require('marked-toc');

module.exports = function(grunt) {

  grunt.registerMultiTask('toc', 'Generate a markdown table of contents.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      heading: '**Table of Contents**\n'
    });

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(fp) {

      // The source files to search. The "nonull" option is used
      // to retain invalid files/patterns so they can be warned about.
      var files = grunt.file.expand({nonull: true}, fp.src);

      // Concat specified files + footer.
      var src = options.heading + files.map(function(file) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(file)) {
          grunt.log.warn('Source file "' + file + '" not found.');
          return '';
        }
        file = grunt.file.read(file);
        // Read each source file and generate a TOC.
        return makeTOC(file);
      }).join('');

      // Write the destination file.
      grunt.file.write(fp.dest, src);

      // Print a success message.
      grunt.log.ok('File '.yellow + '"' + fp.dest + '" transformed.');
    });
  });

};