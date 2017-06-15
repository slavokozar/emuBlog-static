var gulp = require('gulp');
var util = require('gulp-util');
var concat = require("gulp-concat");
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var production = util.env.production;

gulp.task('style', function() {
	return gulp.src(["less/style.less"])
		.pipe(less())
		.pipe(autoprefixer({
			browsers : [
				'Android 2.3',
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24', // Firefox 24 is the latest ESR
				'Explorer >= 8',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6'
			],
			cascade: false
		}))
		.pipe(concat("style.css"))
		.pipe(production ? cleanCSS() : util.noop())
		.pipe(gulp.dest("public/css"));
	
	
});

gulp.task('default', [
    'style'
]);



gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(less().on('error', function(err){
            browserSync.notify('<h3>'+err.message.replace('\n','<br>')+'</h3>', 5000);
            this.emit('end');
        }))

        .pipe(concat("style.css"))
        .pipe(production ? cleanCSS() : util.noop())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});


//start browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    })
})


// Default Task

gulp.task('default', ['browserSync', 'less'], function(){
    gulp.watch('less/*.less', ['less']);
    gulp.watch('less/*/*.less', ['less']);
    gulp.watch('./*.html', browserSync.reload);
})


//error handling
var gulp_src = gulp.src;
gulp.src = function() {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function(error) {
                // Output an error message
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                // emit the end event, to properly end the task
                this.emit('end');
            })
        );
};

