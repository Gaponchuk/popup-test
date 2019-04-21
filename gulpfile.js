'use strict';

const gulp = require('gulp');
const style = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const minCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const pug = require('gulp-pug');


/*SCSS convert in CSS*/
gulp.task('styles', function(){
	return gulp.src('dev/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(style())
		.on('error', notify.onError(function(err) {
			return {
				title: 'Styles',
				message: err.message
			};
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('production/css/'))
});


gulp.task('compress', function(){
	return gulp.src('production/css/*.css')
		.pipe(minCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('production/css/min'))
});


/* Conver PUG */
gulp.task('pug', function buildHTML() {
    return gulp.src('./dev/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./production'))
  });

/*Copy all folder 'assets' in prodaction*/
gulp.task('assets', function(){
	return gulp.src('dev/assets/**/*.*')
	.pipe(newer('production'))
	.pipe(gulp.dest('production'));
});


gulp.task('serve', function(){
	browserSync.init({
		server: './production'
	});

	browserSync.watch('./production/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', ['styles','assets']);

gulp.task('watch', function(){
	gulp.watch('./dev/sass/**/*.scss', ['styles', 'compress']);
	gulp.watch('dev/assets/**/*.*', ['assets']);
    gulp.watch('./dev/*.pug', ['pug']);
});

gulp.task('dev', ['build', 'watch', 'serve']);