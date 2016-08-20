module.exports = function(grunt) { 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {  
    options: {  
    },  
    dist: {  
      src: ['JS/**/*.js'],//src文件夹下包括子文件夹下的所有文件  
      dest: 'dist/built.js'//合并文件在dist下名为built.js的文件  
    }  
  },  
  uglify: {  
     build: {  
        src: 'dist/built.js',//压缩源文件是之前合并的buildt.js文件  
        dest: 'dist/built.min.js'//压缩文件为built.min.js  
      }  
   }  

});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat','uglify']);  
};