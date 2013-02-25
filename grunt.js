/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-mocha');
  
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.0.3',
      source: 'toml.js',
      sourceMin: 'tom;.min.js',
      banner: '// TOML parser implementation, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> alexander.beletsky@gmail.com\n' + 
        '// Distributed under MIT license\n' + 
        '// http://github.com/alexander.beletsky/toml.js'
    },

    lint: {
      files: ['src/<source:mata.source>']
    },

    mocha: {
      all: ['test/index.html']
    },

    rig: {
      build: {
        src: ['<banner:meta.banner>', 'src/toml.js'],
        dest: 'lib/toml.js'
      },
      amd: {
        src: ['<banner:meta.banner>', 'src/amd.js'],
        dest: 'lib/amd/toml.js'
      }
    },

    min: {
      standard: {
        src: ['<banner:meta.banner>', '<config:rig.build.dest>'],
        dest: 'lib/toml.min.js'
      },
      amd: {
        src: ['<banner:meta.banner>', '<config:rig.amd.dest>'],
        dest: 'lib/amd/toml.min.js'
      },
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true,
        Marionette: true,
        $: true,
        slice: true
      }
    },

    uglify: {}

  });

  // Default task.
  grunt.registerTask('default', 'lint mocha rig min');

};
