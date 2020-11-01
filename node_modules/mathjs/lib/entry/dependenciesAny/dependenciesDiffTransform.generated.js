"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffTransformDependencies = void 0;

var _dependenciesBignumber = require("./dependenciesBignumber.generated");

var _dependenciesMatrix = require("./dependenciesMatrix.generated");

var _dependenciesNumber = require("./dependenciesNumber.generated");

var _dependenciesSubtract = require("./dependenciesSubtract.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var diffTransformDependencies = {
  bignumberDependencies: _dependenciesBignumber.bignumberDependencies,
  matrixDependencies: _dependenciesMatrix.matrixDependencies,
  numberDependencies: _dependenciesNumber.numberDependencies,
  subtractDependencies: _dependenciesSubtract.subtractDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createDiffTransform: _factoriesAny.createDiffTransform
};
exports.diffTransformDependencies = diffTransformDependencies;