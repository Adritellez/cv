var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");

gulp.task("sass", function() {

	return gulp.src("sass/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest("dest/css"))
});

gulp.task("watch", function() {
	gulp.watch("sass/**/*.scss", ["sass"]);
});