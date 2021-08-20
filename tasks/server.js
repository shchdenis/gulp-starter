const browserSync = require("browser-sync").create();
const gulp = require("gulp");

module.exports = function server() {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
    gulp.watch("./dist/").on("all", browserSync.reload);
};
