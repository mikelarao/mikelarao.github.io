var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-ruby-sass'),
plumber = require('gulp-plumber'),
browserSync = require('browser-sync'),
rename = require("gulp-rename"),
sourcemaps = require('gulp-sourcemaps');
autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('app/assets/js/'))
});

gulp.task('styles', function() {
	return sass('sass/*.sass', { sourcemap: true, style: 'expanded' })
	.on('error', sass.logError)
	.pipe(autoprefixer())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/assets/css/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: './app/'
		},
	})
});

// Copy all vendors to build folder
gulp.task('vendors', function () {
	gulp.src(['vendors/**/*']).pipe(gulp.dest('app/vendors/'));
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('sass/**/*', ['styles']);
	gulp.watch('vendors/**/*', ['vendors']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/assets/js/main.js').on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'vendors', 'styles', 'watch']);
