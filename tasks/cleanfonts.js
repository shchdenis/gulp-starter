const del = require("del");

module.exports = function cleanfonts() {
    return del("dist/fonts");
};
