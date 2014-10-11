module.exports = function(grunt) {

    // Project configuration.

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Compile Sass
        sass: {
          dev: {
            options: {
              quiet: true,
              style: 'expanded'
            },
            files: {
              'css/main.css': '_sass/main.scss',
              'css/ie.css': '_sass/ie.scss',
            }
          },
          dist: {
            options: {
              quiet: true,
              style: 'compressed' 
            },
            files: {
              'css/main.min.css': '_sass/main.scss',
              'css/ie.min.css': '_sass/ie.scss'
            }
          }
        },// end sass

        // Images
        imagemin: {
          dynamic: {
            files: [{
              expand: true,
              cwd: '_assets/images/',
              src: ['**/*.{png,jpg,gif}'],
              dest: '_site/images/'
            }]
          }
        }, // imagemin

        // SVG Optimisation
        svgmin: {
          options: { 
            plugins: [{
              removeViewBox: false
            }, {
                removeUselessStrokeAndFill: false
            }, {
                convertPathData: { 
                  straightCurves: false
                }
            }]
          },
          dist: {
            files: [{              
              expand: true,      
              cwd: 'src/img',  
              src: ['**/*.svg'],  
              dest: 'web/img/', 
              ext: '.svg'
            }]
          }
        }, // end svgmin

        // Simply copy the fonts over
        copy: {
          files: {
            cwd: '_assets/fonts',
            src: '**/*',
            dest: '_site/fonts',
            expand: true 
          },
          // static_html: {
          //   cwd: 'src/nav',
          //   src: '**/*',
          //   dest: 'web/nav',
          //   expand: true 
          // },
          // static_js: {
          //   cwd: 'src/js/vendor',
          //   src: '**/*',
          //   dest: 'web/js/vendor',
          //   expand: true 
          // },
          // ie_js: {
          //   cwd: 'src/js/ie',
          //   src: '**/*',
          //   dest: 'web/js/ie',
          //   expand: true 
          // },
          // custom_ie_js: {
          //   cwd: 'src/js/funeralcare/ie',
          //   src: '**/*',
          //   dest: 'web/js/ie',
          //   expand: true 
          // }
        }, // end copy

        // Run Jekyll
        shell : {
          jekyllBuild : {
              command : 'jekyll build'
          },
          jekyllServe : {
              command : 'jekyll serve'
          }
        },

        // Watch                                                 
        watch: {     
          options: {                                                      
            livereload: true,               
          }, 
          html: {
            files: ['**/*.html'],
            tasks: ['shell:jekyllBuild'] 
          },
          css: {
            files: ['**/*.scss'],
            tasks: ['sass:dev'] 
          },
          scripts: {
            files: ['src/js/{,**/}*.js', '!src/js/{,**/}*.min.js'],
            tasks: ['concat']
          },
          images: {
            files: ['src/img/**']
          }
        } // end Watch
        
    });
    

    // RUN JEKYLL (HTML BUILD)
    grunt.loadNpmTasks('grunt-shell');
    // grunt.loadNpmTasks('grunt-jekyll');
    // CSS
    grunt.loadNpmTasks('grunt-contrib-sass');
    // JS
    grunt.loadNpmTasks('grunt-contrib-concat');
    // IMAGES
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // GRAPHICS
    //grunt.loadNpmTasks('grunt-svgmin');
    // COPY 
    grunt.loadNpmTasks('grunt-contrib-copy');
    // WATCH
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default build tasks
    grunt.registerTask('default', ['dev']);

    // development build tasks
    grunt.registerTask('dev', [
        //'jekyll',
        'sass:dev',
        //'imagemin',
        //'copy',
        // 'concat',
        // 'imagemin',
        'shell:jekyllBuild',
        'watch'
    ]);

    // production build tasks
    grunt.registerTask('dist', [
        //'shell:jekyllServe',
        'sass:dist',
        'imagemin',
        'copy'
        // 'imagemin',
        // 'copy', 
        // 'watch'
    ]);

};