const { src, dest } = require("gulp");
const include = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const ENV = process.env.APP_ENV;

module.exports = function html() {
    if (ENV === "production") {
        return src("src/*.html", "!!src/components/**/*.html")
            .pipe(
                include({
                    prefix: "@@",
                    basepath: "@file",
                })
            )
            .pipe(
                htmlmin({
                    collapseWhitespace: true,
                })
            )
            .pipe(dest("./dist"));
    } else {
        return src("src/*.html", "!!src/components/**/*.html")
            .pipe(
                include({
                    prefix: "@@",
                    basepath: "@file",
                })
            )
            .pipe(dest("./dist"));
    }
};
