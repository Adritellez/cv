var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require('browser-sync');

gulp.task("sync", function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("sass", function() {

	return gulp.src("src/scss/*.scss")
				.pipe(sass().on("error", sass.logError))
				.pipe(autoprefixer())
				.pipe(cssnano())
				.pipe(gulp.dest("dest/css"))
				.pipe(browserSync.reload({stream:true}))
});

gulp.task("html", function() {

	return gulp.src("./*.html")
				.pipe(browserSync.reload({stream:true}))
});

gulp.task("js", function() {
	gulp.src([
		"bower_components/jquery/dist/jquery.js",
		"bower_components/foundation-sites/dist/js/foundation.js",
		"src/js/app.js"	
	])

	.pipe(concat("app.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dest/js"))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task("watch" , function() {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("./**/*.html", ["html"]);
	gulp.watch("src/js/*.js", ["js"]);
});

gulp.task("serve", ["sync", "watch"]);

