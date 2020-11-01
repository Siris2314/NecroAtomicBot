"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumTransformDependencies = void 0;

var _dependenciesAdd = require("./dependenciesAdd.generated");

var _dependenciesNumeric = require("./dependenciesNumeric.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var sumTransformDependencies = {
  addDependencies: _dependenciesAdd.addDependencies,
  numericDependencies: _dependenciesNumeric.numericDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createSumTransform: _factoriesAny.createSumTransform
};
exports.sumTransformDependencies = sumTransformDependencies;