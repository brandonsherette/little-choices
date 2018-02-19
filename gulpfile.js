const gulp = require('gulp');
const changed = require('gulp-changed');
const del = require('del');
const rename = require('gulp-rename');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.production.config.js');
const sass = require('gulp-sass');
const buildFiles = [
  'css',
  'downloads',
  'lib',
  'images',
  'img',
  'resources',
  'vendor',
];

const srcBuildFiles = buildFiles.map((file) => {
  if (file.indexOf('.') >= 0) {
    return "src/" + file;
  }

  return "src/" + file + "/**/*";
});

//////////////////////////
/* CLEAN TASKS */
gulp.task('clean-api', function() {
  return del(['build/api']);
});
/**
 * Cleans (removes), all files from the build folder.
 */
gulp.task('clean-build', function() {
  return del(['build/']);
});

gulp.task('clean-app', function() {
  return del(['build/app*?(.css|.js)', 'build/index.html']);
});

/////////////////////////
/* BUILD TASKS */
gulp.task('build-all', ['build-api', 'build-api-live', 'build-app', 'build-files', 'build-styles'], function() {
  console.log('All files built in the build folder.');
});

gulp.task('build-api', function() {
  return gulp.src(['src/api/**/*?(.php|.jpg|.png)', '!src/api/lib/config/db?(-live|-test).php', '!src/api/{private-resources,private-resources/**/*}'])
    .pipe(changed('build/api/'))
    .pipe(gulp.dest('build/api/'));
});

gulp.task('build-api-live', function() {
  return gulp.src('src/api/lib/config/db-live.php')
    .pipe(rename('db.php'))
    .pipe(gulp.dest('build/api/lib/config/'));
});

gulp.task('build-api-test', function() {
  return gulp.src('src/api/lib/config/db-test.php')
    .pipe(rename('db.php'))
    .pipe(gulp.dest('build/api/lib/config/'));
});

/**
 * Bundles the entire application to the build folder.
 */
gulp.task('build-app', ['clean-app'], function() {
  return gulp.src('src/app/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('build/'));
});

/**
 * Build files copies over files that don't need optimization.
 */
gulp.task('build-files', function() {
  return gulp.src(srcBuildFiles, { base: './src' })
    .pipe(changed('build'))
    .pipe(gulp.dest('build'))
});
/**
 * Copies over the styles to the build folder.
 */
gulp.task('build-styles', function() {
  return gulp.src('src/main.css')
    .pipe(changed('build'))
    .pipe(gulp.dest('build'));
});

//////////////////////
/* OTHER TASKS */
/**
 * Runs sass command on main styles.
 */
gulp.task('sass', function() {
  return gulp.src('src/styles/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/'));
});