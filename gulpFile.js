const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

const sassTask = (done) => {
    gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/'));

    done();
};

const jsTask = (done) => {
    gulp.src('./client/*.js')
    .pipe(babel({
        presets: ['@babel/preset-env', '@babel/preset-react']
    }))
    .pipe(gulp.dest('./hosted/'));

    done();
};

const lintTask = (done) => {
    gulp.src(['./server/*.js'])
    .pipe(eslint())
    .pipe(eslint.format()) 
    .pipe(eslint.failAfterError());

    done();
};

const watch = () => {
    gulp.watch('./scss/main.scss', sassTask);
    gulp.watch('./client/*.js', jsTask);
    nodemon({
        script: './serer/app.js',
        ignore: ['client/', 'node_modules/'],
        ext: 'js html css'
    });
}

module.exports.build = gulp.parallel(sassTask, jsTask, lintTask);
module.exports.watch = watch;
