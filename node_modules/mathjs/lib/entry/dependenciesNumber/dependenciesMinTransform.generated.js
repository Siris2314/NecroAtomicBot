"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minTransformDependencies = void 0;

var _dependenciesNumeric = require("./dependenciesNumeric.generated");

var _dependenciesSmaller = require("./dependenciesSmaller.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesNumber = require("../../factoriesNumber.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var minTransformDependencies = {
  numericDependencies: _dependenciesNumeric.numericDependencies,
  smallerDependencies: _dependenciesSmaller.smallerDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createMinTransform: _factoriesNumber.createMinTransform
};
exports.minTransformDependencies = minTransformDependencies;