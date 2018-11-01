const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

gulp.task('autoprefix', () =>
  gulp.src('app/css/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('app/css'))
);

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    injectChanges: true,
    server: "./app/"
  });

  gulp.watch("app/scss/*.scss", ['sass']).on('change', browserSync.reload);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
