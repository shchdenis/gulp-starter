const { src, dest, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const plumber = require("gulp-plumber");
const changed = require("gulp-changed");
const browserSync = require("browser-sync").create();
const ENV = process.env.APP_ENV;

module.exports = function images() {
    if (ENV === "production") {
        return src("src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)")
            .pipe(plumber())
            .pipe(changed("dist/img"))
            .pipe(
                imagemin(
                    {
                        interlaced: true,
                        progressive: true,
                        optimizationLevel: 5,
                    },
                    [
                        recompress({
                            loops: 6,
                            min: 50,
                            max: 90,
                            quality: "high",
                            use: [
                                pngquant({
                                    quality: [0.8, 1],
                                    strip: true,
                                    speed: 1,
                                }),
                            ],
                        }),
                        imagemin.gifsicle(),
                        imagemin.optipng(),
                        imagemin.svgo(),
                    ]
                )
            )
            .pipe(dest("dist/img"))
            .pipe(browserSync.stream());
    } else {
        return src("src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)")
            .pipe(dest("dist/img"))
            .pipe(browserSync.stream());
    }
};
