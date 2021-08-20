const { watch, parallel, series } = require("gulp");

module.exports = function watching() {
    watch("src/**/*.html", parallel("html"));
    watch("src/**/*.+(scss|sass|css)", parallel("styles"));
    watch("src/**/*.js", parallel("scripts"));
    watch(
        "src/img/**/*.{png,jpg,jpeg,gif,svg,ico}",
        series("cleanimg", "images")
    );
    watch("src/fonts/**/*.ttf", series("cleanfonts", "fonts"));
};
