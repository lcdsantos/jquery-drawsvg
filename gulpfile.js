var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    fs   = require('fs');

var getPackageJson = function() {
      return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    };

/*======================================
  Bump version
======================================*/
gulp.task('bump', function() {
  var pkg = getPackageJson(),
      newVersion = $.util.env.version || pkg.version;

  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      version: newVersion
    }))
    .pipe(gulp.dest('./'));
});

/*======================================
  Javascript
======================================*/
gulp.task('js', ['bump'], function() {
  var pkg = getPackageJson(),
      banner = [
        '/*!',
        ' * jQuery DrawSVG v<%= pkg.version %> (<%= new Date().toString().substr(4, 11) %>) - http://lcdsantos.github.io/jquery-drawsvg/',
        ' *',
        ' * Copyright (c) <%= new Date().getFullYear() %> Leonardo Santos; MIT License',
        ' *',
        ' */\n\n'
      ].join('\n');

  return gulp.src('src/jquery.drawsvg.js')
    .pipe($.plumber())
    .pipe($.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./public'))
    .pipe($.connect.reload());
});

gulp.task('js-min', ['bump'], function() {
  var pkg = getPackageJson();

  return gulp.src('src/jquery.drawsvg.js')
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe($.header('/*! jQuery DrawSVG v<%= pkg.version %> (<%= new Date().toJSON().slice(0,10) %>) - git.io/vGFa5 - Copyright (c) <%= new Date().getFullYear() %> Leonardo Santos - MIT License */\n', { pkg: pkg }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public'))
    .pipe($.connect.reload());
});

/*======================================
  Live preview
======================================*/
gulp.task('serve', function() {
  $.connect.server({
    root: './public',
    livereload: true
  });
});

gulp.task('html', function() {
  return gulp.src('./public/*.html')
    .pipe($.connect.reload());
});

gulp.task('css', function() {
  return gulp.src('./public/*.css')
    .pipe($.connect.reload());
})

/*======================================
  Watch
======================================*/
gulp.task('watch', ['serve'], function() {
  gulp.watch(['./public/*.css'], ['css']);
  gulp.watch(['./src/*.js'], ['js', 'js-min']);
  gulp.watch(['./public/*.html'], ['html']);
});

/*======================================
  ZIP
======================================*/
gulp.task('zip', function() {
  var pkg = getPackageJson();

  return gulp.src('./public/*')
    .pipe($.zip('drawsvg_v' + pkg.version + '.zip'))
    .pipe(gulp.dest('./'));
});

/*======================================
  GitHub Pages
======================================*/
gulp.task('gh-pages', function() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

/*======================================
  Default tasks
======================================*/
gulp.task('build', ['js', 'js-min']);
gulp.task('default', ['build', 'watch']);
gulp.task('release', ['bump', 'build', 'zip']);
gulp.task('publish', ['gh-pages']);