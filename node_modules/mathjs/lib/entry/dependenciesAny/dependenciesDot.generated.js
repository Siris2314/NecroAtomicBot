"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dotDependencies = void 0;

var _dependenciesAddScalar = require("./dependenciesAddScalar.generated");

var _dependenciesConj = require("./dependenciesConj.generated");

var _dependenciesMultiplyScalar = require("./dependenciesMultiplyScalar.generated");

var _dependenciesSize = require("./dependenciesSize.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var dotDependencies = {
  addScalarDependencies: _dependenciesAddScalar.addScalarDependencies,
  conjDependencies: _dependenciesConj.conjDependencies,
  multiplyScalarDependencies: _dependenciesMultiplyScalar.multiplyScalarDependencies,
  sizeDependencies: _dependenciesSize.sizeDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createDot: _factoriesAny.createDot
};
exports.dotDependencies = dotDependencies;