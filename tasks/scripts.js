const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const ENV = process.env.APP_ENV;

module.exports = function scripts() {
    if (ENV === "production") {
        src("node_modules/jquery/dist/jquery.min.js").pipe(dest("dist/js/"));
        return src(["src/components/**/*.js", "src/js/script.js"])
            .pipe(
                webpack({
                    mode: "production",
                    output: {
                        filename: "script.js",
                    },
                    watch: false,
                    /* devtool: "source-map", */
                    module: {
                        rules: [
                            {
                                test: /\.js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                    loader: "babel-loader",
                                    options: {
                                        presets: [
                                            [
                                                "@babel/preset-env",
                                                {
                                                    debug: true,
                                                    corejs: 3,
                                                    useBuiltIns: "usage",
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                })
            )
            .pipe(uglify())
            .pipe(concat("script.min.js"))
            .pipe(dest("dist/js/"))
            .pipe(browserSync.stream());
    } else {
        src("node_modules/jquery/dist/jquery.min.js").pipe(dest("dist/js/"));
        return src(["src/components/**/*.js", "src/js/script.js"])
            .pipe(
                webpack({
                    mode: "development",
                    output: {
                        filename: "script.js",
                    },
                    watch: false,
                    /* devtool: "source-map", */
                    /* module: {
                        rules: [
                            {
                                test: /\.js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                    loader: "babel-loader",
                                    options: {
                                        presets: [
                                            [
                                                "@babel/preset-env",
                                                {
                                                    debug: true,
                                                    corejs: 3,
                                                    useBuiltIns: "usage",
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                        ],
                    }, */
                })
            )
            .pipe(map.init())
            .pipe(concat("script.min.js"))
            .pipe(map.write("/sourcemaps/"))
            .pipe(dest("dist/js/"))
            .pipe(browserSync.stream());
    }
};
