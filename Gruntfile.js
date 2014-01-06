module.exports = function(grunt) {

  // Load the necessary grunt plug-ins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html2js');


  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'html2js']); 

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    src: {
      jsfiles: ['client/**/*.js'],
      jstemplates: ['<%= distdir %>/templates.js'],
      angularjs: ['public/javascripts/vendor/angular/angular.min.js'],
      angularUI: ['public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'],
      less: ['public/javascripts/vendor/less.min.js'],
      templates: ['client/templates/**/*.html'],
    },


    concat:{ 
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.jsfiles %>', '<%= src.jstemplates %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      }, 

      angular: {
        src:['<%= src.angularjs %>'],
        dest: '<%= distdir %>/angular.js'
      },

      less: {
        src:['<%= src.less %>'],
        dest: '<%= distdir %>/less.js'
      },

      bootstrap: {
        src:['<%= src.angularUI %>'],
        dest: '<%= distdir %>/bootstrap.js'
      }, 
    },

    html2js: {
      templates: {
        src: ['<%= src.templates %>'],
        dest: '<%= distdir %>/templates.js',
        module: 'cmufit.templates' // Declare module where templates are accessed from 
      } 
    },

    jshint:{
      files:['gruntFile.js', '<%= src.jsfiles %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }

  }); //grunt initConfig


};