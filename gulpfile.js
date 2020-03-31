//Подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const replace = require('gulp-replace');

//Порядок подключения CSS файлов
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
];

//Порядок подключения JS файлов
const jsFiles = [
    './src/js/jquery-3.4.1.js',
    './src/js/popper.min.js',
    './src/js/bootstrap.min.js',
    './src/js/616a422fe3.js',
    './src/js/progressbar.min.js',
    './src/js/lightbox.js',
    './src/js/icheck.js',
    './src/js/carousel.js',
    './src/js/main.js'

];

// File paths
const files = {
    scssPath: './scss/**/*.scss',
};

//Таск на скрипты JS
function scripts() {
    //Шаблон для поиска файлов JS
    //Всей файлы по шаблону './src/js/**/*.js'
    return gulp.src(jsFiles)
        //Обьединение файлов в один
        .pipe(concat('script.min.js'))
        //Минификация JS
        .pipe(uglify())
        //Выходная папка для скриптов
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
}
//Задача Sass: компилирует файл style.scss в style.css
// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return gulp.src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream()); // put final CSS in dist folder
}

//Удалить все в указанной папке
function clean() {
    return del(['build/*'])
}

//Просматривать файлы
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts)
    //Следить за SCSS файлами
    gulp.watch([files.scssPath],
        {usePolling: true}, scssTask);
//При измененни HTML запустить синхронизацию
    gulp.watch("./*.html").on('change', browserSync.reload);
}
//Таск вызывающий функцию scripts
gulp.task('scripts', scripts);
//Таск для очистки папки build
gulp.task('del', clean);
//Таск для отслкживаня изменений
gulp.task('watch', watch);
//Таск вызывающий функцию scssTask
gulp.task('scssTask', scssTask);
//Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel( scripts)));
//Таск запускает таск build, scssTask  и watch
gulp.task('dev', gulp.series('build', 'scssTask', 'watch'));