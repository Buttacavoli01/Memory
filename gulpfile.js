const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del(['docs/styles/*.css', 'docs/scripts/*.css']);
});

gulp.task('scripts', function() {
  return gulp.src(['app/src/scripts/vendor/*.js', 'app/src/scripts/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('docs/scripts'));
});

gulp.task('styles', function() {
  return gulp.src('app/src/styles/sass/*.s*ss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest('docs/styles'))
    .pipe(browserSync.stream());
});


gulp.task('serve', gulp.series('styles', function() {
  browserSync.init({
    server: ['docs']
  });
  gulp.watch('app/src/styles/sass/*.s*ss', gulp.series('styles'));
  gulp.watch(['app/src/scripts/*.js', '!app/src/vendor/*.js'], gulp.series('scripts'));
  gulp.watch('docs/*.html').on('change', browserSync.reload);
}));

gulp.task('imgMin', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img'));
});

gulp.task('default',
  gulp.series('clean',
    gulp.parallel('styles', 'scripts', 'imgMin'),
    'serve',
    function watcher(done) {
      gulp.watch(
        ['app/src/scripts/*.js', '!app/src/vendor/*.js'],
        gulp.parallel('scripts')
      );
      gulp.watch(
        'docs/**/**',
        browserSync.reload()
      );
      done();
    }
  )
);
