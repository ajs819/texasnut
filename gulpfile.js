const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss')
const sass = require('gulp-sass');
const del = require('del');
const webp = require('gulp-webp');

// Optimize Images
function images() {
    'use strict';
    return gulp.src('src/assets/**/*')
        .pipe(cache(imagemin([
            imagemin.mozjpeg({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [
                    {
                        removeViewBox: true
                    }
                ]
            })
        ])))
        .pipe(gulp.dest('dist/assets'))
        .pipe(webp())
        .pipe(gulp.dest('dist/assets'));
    }

// Compile CSS
function styles() {
    'use strict';
    return gulp.src(['src/styles/main.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        // .pipe(purgecss({
        //     content: ['templates/**/*.twig'],
        //     safelist: ['is-active', 'mx-auto', 'text-primary', 'text-secondary', 'btn-outline-primary', 'btn-outline-secondary']
        // }))
        .pipe(rename('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./'))
    }

// Concatenate, minify, and lint vendor scripts
function vendor() {
    'use strict';
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
}

// Concatenate, minify, and lint scripts
function scripts() {
    'use strict';
    return gulp.src(['src/scripts/main.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
}

// Copy Fonts
function fonts() {
    'use strict';
    return gulp.src([
        'src/fonts/*',
        'node_modules/@fortawesome/fontawesome-free/webfonts/**/*'])
        .pipe(gulp.dest('dist/fonts'))
}

// Watch Files
function watchFiles() {
    'use strict';
    gulp.watch([ "src/styles/**/*.scss", "templates/**/*.twig" ], styles);
    gulp.watch('src/scripts/**/*.js', scripts);
    gulp.watch("src/assets/**/*", images);
}

// Delete Dist
function clean() {
    return del([
       'dist' 
    ]);
}

// Group complex tasks
const build = gulp.parallel(styles, images, vendor, scripts, fonts);
const watch = gulp.parallel(watchFiles);

// Export tasks
exports.build = build;
exports.images = images;
exports.vendor = vendor;
exports.scripts = scripts;
exports.styles = styles;
exports.fonts = fonts;
exports.watch = watch;
exports.default = watch;
exports.clean = clean;
