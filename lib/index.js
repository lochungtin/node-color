"use strict";
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.addZero = function (value) {
        return ('0' + value).slice(-2);
    };
    Color.isValidAlpha = function (alpha) {
        return alpha >= 0 && alpha <= 1;
    };
    Color.isValidArr = function (valueArr) {
        return valueArr.length === 3;
    };
    Color.isValidHex = function (hexcode) {
        return /[A-Ha-h0-9]+/.test(hexcode) && hexcode.replace('#', '').length === 6;
    };
    Color.isValidValue = function (value) {
        return value >= 0 && value < 256;
    };
    Color.arrToHex = function (valueArr, includeHash) {
        if (includeHash === void 0) { includeHash = true; }
        if (!Color.isValidArr(valueArr))
            throw new Error("Array length is not valid, array must be of length 3");
        for (var i = 0; i < 3; ++i) {
            if (!Color.isValidValue(valueArr[i]))
                throw new Error("Given values are not valid, values must be between 0 annd 255");
        }
        return Color.valuesToHex(valueArr[0], valueArr[1], valueArr[2], includeHash);
    };
    Color.hexToArr = function (hexcode) {
        var _a;
        if (!Color.isValidHex(hexcode))
            throw new Error("Hexcode is not valid, received " + hexcode);
        return ((_a = hexcode
            .replace('#', '')
            .match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(function (val) { return parseInt(val, 16); })) || [0, 0, 0];
    };
    Color.valuesToHex = function (rValue, gValue, bValue, includeHash) {
        if (includeHash === void 0) { includeHash = true; }
        if (!Color.isValidValue(rValue) || !Color.isValidValue(gValue) || !Color.isValidValue(bValue))
            throw new Error("Given values are not valid, values must be between 0 annd 255");
        return (includeHash ? '#' : '')
            + Color.addZero(rValue.toString(16))
            + Color.addZero(gValue.toString(16))
            + Color.addZero(bValue.toString(16));
    };
    Color.mixByArray = function (color1, color2, alpha) {
        if (alpha === void 0) { alpha = 0.5; }
        if (!Color.isValidArr(color1))
            throw new Error("Array length is not valid, array must be of length 3");
        for (var i = 0; i < 3; ++i) {
            if (!Color.isValidValue(color1[i]))
                throw new Error("Given values are not valid, values must be between 0 annd 255");
        }
        if (!Color.isValidArr(color2))
            throw new Error("Array length is not valid, array must be of length 3");
        for (var i = 0; i < 3; ++i) {
            if (!Color.isValidValue(color2[i]))
                throw new Error("Given values are not valid, values must be between 0 annd 255");
        }
        if (!Color.isValidAlpha(alpha))
            throw new Error('Alpha value is not valid, alpha must be between 0 and 1');
        return color2.map(function (val, index) { return Math.round(val * (1 - alpha) + color1[index] * alpha); });
    };
    Color.mixByHex = function (color1, color2, alpha) {
        if (alpha === void 0) { alpha = 0.5; }
        return Color.mixByArray(Color.hexToArr(color1), Color.hexToArr(color2), alpha);
    };
    Color.mixByValue = function (r1, g1, b1, r2, g2, b2, alpha) {
        if (alpha === void 0) { alpha = 0.5; }
        return Color.mixByArray([r1, g1, b1], [r2, g2, b2], alpha);
    };
    return Color;
}());
module.exports = Color;
//# sourceMappingURL=index.js.map