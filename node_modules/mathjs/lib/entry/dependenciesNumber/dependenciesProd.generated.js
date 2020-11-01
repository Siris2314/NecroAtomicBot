"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prodDependencies = void 0;

var _dependenciesMultiplyScalar = require("./dependenciesMultiplyScalar.generated");

var _dependenciesNumeric = require("./dependenciesNumeric.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesNumber = require("../../factoriesNumber.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var prodDependencies = {
  multiplyScalarDependencies: _dependenciesMultiplyScalar.multiplyScalarDependencies,
  numericDependencies: _dependenciesNumeric.numericDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createProd: _factoriesNumber.createProd
};
exports.prodDependencies = prodDependencies;