"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffDependencies = void 0;

var _dependenciesMatrix = require("./dependenciesMatrix.generated");

var _dependenciesNumber = require("./dependenciesNumber.generated");

var _dependenciesSubtract = require("./dependenciesSubtract.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var diffDependencies = {
  matrixDependencies: _dependenciesMatrix.matrixDependencies,
  numberDependencies: _dependenciesNumber.numberDependencies,
  subtractDependencies: _dependenciesSubtract.subtractDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createDiff: _factoriesAny.createDiff
};
exports.diffDependencies = diffDependencies;