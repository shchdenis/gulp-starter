const { series } = require("gulp");
require("dotenv").config();

const gulp = require("gulp"),
    requireDir = require("require-dir"),
    tasks = requireDir("./tasks");

exports.server = tasks.server;
exports.html = tasks.html;
exports.styles = tasks.styles;
exports.images = tasks.images;
exports.scripts = tasks.scripts;
exports.fonts = tasks.fonts;
exports.watching = tasks.watching;
exports.cleanimg = tasks.cleanimg;
exports.cleanfonts = tasks.cleanfonts;
exports.clean = tasks.clean;

exports.default = gulp.series(
    exports.clean,
    exports.html,
    exports.styles,
    exports.scripts,
    exports.images,
    exports.fonts,
    gulp.parallel(exports.server, exports.watching)
);
