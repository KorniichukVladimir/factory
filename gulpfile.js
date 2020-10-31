var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  imgJR = require('imagemin-jpeg-recompress');

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function () {
  return gulp.src('styles/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: [
        'last 1 versions',
        '> 1%',
        'maintained node versions',
        'not dead'
      ],
      cascade: false
    }))
    .pipe(sourcemaps.write('./../../maps'))
    .pipe(gulp.dest('styles/css'))
    .pipe(browserSync.stream());
});

// watching less
gulp.task('watch', function () {
  gulp.watch('styles/less/*.less');
  gulp.watch('styles/less/**/*.less', gulp.series('less'));
});

// Static Server + watching less/html files
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("js/*.js").on('change', browserSync.reload);
  gulp.watch("styles/less/*.less").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./include/*.php").on('change', browserSync.reload);
  gulp.watch("./*.php").on('change', browserSync.reload);
});

let build = gulp.parallel('serve', 'watch');

gulp.task('default', build);

gulp.task('min-css', function () {
  return gulp.src("styles/css/*.css")
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("fold"));
});
gulp.task('min-js', function () {
  return gulp.src("js/*.js")
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest("fold"));
});
gulp.task('images', function () {
  return gulp.src("images/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imgJR({
        loops: 1,
        min: 70,
        max: 80,
        quality: 50,
        strip: true
      }),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest("fold/images"))
});

gulp.task('min', gulp.series('min-css', 'min-js', 'images'));
