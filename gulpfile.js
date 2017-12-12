var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    gulpif = require('gulp-if'),
    spritesmith = require('gulp.spritesmith'),
    del = require('del');


gulp.task('styles', function () {
   return gulp.src('src/sass/main.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
           stream: true
       }));
});

gulp.task('styles:min', function () {
    return gulp.src('src/css/main.css')
        .pipe(csso())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/scripts/common.js'
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/scripts/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sprite:png', function () {
    return gulp.src('src/sprite/**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '../images/sprite.png'
        }))
        .pipe(gulpif('*.png', gulp.dest('src/images')))
        .pipe(gulpif('*.scss', gulp.dest('src/sass/sprite')));
});

gulp.task('bs', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        notify: false,
        open: false
    });
});

gulp.task('watch', function () {
   gulp.watch('src/index.html').on('change', browserSync.reload);
   gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
   gulp.watch('src/scripts/common.js', gulp.series('scripts'));

});

gulp.task('del', function () {
   return del('./build')
});

gulp.task('copy', function () {
    return gulp.src([
        'src/**/*.*',
        '!src/{sass,sass/**}',
        '!src/{sprite,sprite/**}',
        '!src/{libs,libs/**}'
    ])
        .pipe(gulp.dest('./build'));
});

gulp.task('default',
    gulp.series(
        gulp.parallel('styles', 'scripts'),
        gulp.parallel('bs', 'watch')
    )
);

gulp.task('build',
  gulp.series('del', 'copy')
);

