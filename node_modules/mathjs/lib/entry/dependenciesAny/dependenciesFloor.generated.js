"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floorDependencies = void 0;

var _dependenciesEqualScalar = require("./dependenciesEqualScalar.generated");

var _dependenciesMatrix = require("./dependenciesMatrix.generated");

var _dependenciesRound = require("./dependenciesRound.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var floorDependencies = {
  equalScalarDependencies: _dependenciesEqualScalar.equalScalarDependencies,
  matrixDependencies: _dependenciesMatrix.matrixDependencies,
  roundDependencies: _dependenciesRound.roundDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  createFloor: _factoriesAny.createFloor
};
exports.floorDependencies = floorDependencies;