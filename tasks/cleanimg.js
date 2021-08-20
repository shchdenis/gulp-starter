const del = require("del");

module.exports = function cleanimg() {
    return del("dist/img");
};
