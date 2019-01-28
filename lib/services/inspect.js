"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inspect = require('util').inspect;
exports.default = (function (data, depth) {
    if (depth === void 0) { depth = 4; }
    var value = inspect(data, {
        depth: depth,
        colors: true,
        sorted: true,
    });
    process.stdout.write(value + "\n");
});
