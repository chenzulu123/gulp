// 引入相关插件
var gulp = require('gulp'),
    //less转换css的插件
    less = require('gulp-less'),
    //less更新时，css同步更新的插件
    livereload = require('gulp-livereload'),
    //html压缩插件
    htmlmin = require('gulp-htmlmin'),
    //js压缩和混淆的插件
    uglify = require('gulp-uglify'),
    //css压缩插件
    cleanCss = require('gulp-clean-css');
// 创建最简单的task
gulp.task('hello', function () {
    console.log('Hello this a gulp task!');
});
//把less转换为css的task
gulp.task('less', function () {
    return gulp.src('src/less/*.less') //监控文件路径
        .pipe(less())
        .pipe(gulp.dest('src/css')) //转换后文件的输出路径
        .pipe(livereload()); //lss更新时css同步更新
});
//压缩html
gulp.task('html', function () {
    // 对html文件压缩的参数配置
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
//压缩js
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//压缩css
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
});
//监控文件变化
gulp.task('auto', function () {
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/html/*.html', ['html']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});