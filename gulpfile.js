var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin');

gulp.task('imgmin', function() {
	return gulp.src('app/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'));
});

gulp.task('jshint', function() {
	return gulp.src('app/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
	gulp.watch('app/javascript/**/*.js', ['jshint']);
	gulp.watch('app/*.html', ['copyHtml']);
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/images/*', ['imgmin']);
});

gulp.task('serve',function() {
	browserSync.init({
		server: "./public"
	});

	gulp.watch("public/**/*.*").on('change', browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src("app/scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("public/css"))
		.pipe(browserSync.stream());
});

gulp.task('copyHtml', function() {
	// copy any html files in source/ to public/
	gulp.src('app/*.html')
		.pipe(gulp.dest('public'));

});

gulp.task('copyVendorScripts', function() {
	// copy any vendor files in node_modules/ to public/vendor

});

gulp.task('build', ['copyHtml', 'jshint', 'copyVendorScripts', 'sass', 'imgmin']);

gulp.task('clean', function () {
	return gulp.src('public', {read: false})
		.pipe(clean());
});

gulp.task('default', ['serve', 'watch']);
