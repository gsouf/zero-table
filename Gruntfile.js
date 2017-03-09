module.exports = function(grunt) {


    // Source files to include
    var sourceFiles = grunt.file.readJSON('build.json');

    // PREPARE FILES FOR KARMA
    var karmaFiles = [] ;
    for(var i = 0 ; i < sourceFiles.javascript.length ; i++){
        karmaFiles.push({src:sourceFiles.javascript[i] , included:true});
    }
    karmaFiles.push({src : ['tests/spec/**/*.spec.js'], included:true});

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            build: {
                src: sourceFiles.javascript,
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    "dist/zero-table.min.css" : sourceFiles.sass
                }]
            }
        },

        watch: {

            "js" : {
                files: [sourceFiles.javascript],
                tasks:["uglify"]
            },

            "css" : {
                files: sourceFiles.sass,
                tasks:["sass"]
            },

            "grunt" : {
                files: ['Gruntfile.js','build.json'],
                options: { reload: true }
            }

        },

        karma: {

            ci: {
                files: karmaFiles,
                configFile: 'karma.conf.js',
                options: {
                    singleRun: true
                }
            }

        },


        copy : {
            images: {
                files:  [
                    {
                        expand: true,
                        cwd   : "style/images",
                        src   : "**/*",
                        dest  : "dist/images"

                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('default', ['newer:uglify','newer:sass']);
    grunt.registerTask('dev', ['dev-compile','karma:unit:start','watch']);
    grunt.registerTask('dev-compile', ['newer:uglify','newer:sass', 'copy']);
    grunt.registerTask('test', ['karma']);


};