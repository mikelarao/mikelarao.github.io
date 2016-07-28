var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	rename = require("gulp-rename"),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
    }))
	.pipe(gulp.dest('_app/assets/js/'))
});

gulp.task('styles', function() {
	return sass('sass/*.sass', { sourcemap: true, style: 'expanded' })
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_app/assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './_app/'
    },
  })
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('sass/**/*', ['styles']);
	gulp.watch('_app/*.html').on('change', browserSync.reload);
	gulp.watch('_app/assets/js/main.js').on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
