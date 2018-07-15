const gulp = require('gulp'),
      sass = require('gulp-sass'),
      server = require('browser-sync').create(),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      del = require('del'),
      sequence = require('gulp-sequence');

// Default task
gulp.task('default', ['styles:sass', 'server']);

// Compile SCSS to CSS
gulp.task('styles:sass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
        .pipe(server.stream());
});

gulp.task('server', ['styles:sass'], function() {
    server.init({
        server: "./src",
        notify: false
    });

    gulp.watch("src/sass/*.scss", ['styles:sass']);
    gulp.watch("src/scripts/*.js", ['scripts:concat']).on('change', server.reload);
    gulp.watch("src/*.html").on('change', server.reload);
});

// Make one script file from all
gulp.task('scripts:concat', function() {
    return gulp.src([
        'src/scripts/temp.js'
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('src/scripts/'));
});

// Make one script from all js libs
gulp.task('scripts:libs', function() {
    return gulp.src([
        'src/libs/temp.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('src/scripts/'));
});

// Imagemin task
gulp.task('images:min', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images/'));
});

// Copy scripts
gulp.task('scripts:copy', function() {
    gulp.src([
        'src/scripts/script.js',
        'src/scripts/libs.js'
    ])
        .pipe(gulp.dest('dist/scripts/'));
});

// Copy styles
gulp.task('styles:copy', function() {
    gulp.src('src/css/style.css')
        .pipe(gulp.dest('dist/css/'));
});

// Copy html
gulp.task('html:copy', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

// Copy fonts
gulp.task('fonts:copy', function() {
    gulp.src('src/fonts/**')
        .pipe(gulp.dest('dist/fonts/'));
})

// Delete dist folder
gulp.task('del', function() {
    return del.sync('dist');
})

// Copy files
gulp.task('files:copy', sequence('html:copy', 'styles:copy', 'scripts:copy', 'images:min', 'fonts:copy'));

// Build task
gulp.task('build', sequence('del', 'files:copy'));