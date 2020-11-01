"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotationMatrixDependencies = void 0;

var _dependenciesBigNumberClass = require("./dependenciesBigNumberClass.generated");

var _dependenciesDenseMatrixClass = require("./dependenciesDenseMatrixClass.generated");

var _dependenciesSparseMatrixClass = require("./dependenciesSparseMatrixClass.generated");

var _dependenciesAddScalar = require("./dependenciesAddScalar.generated");

var _dependenciesCos = require("./dependenciesCos.generated");

var _dependenciesMatrix = require("./dependenciesMatrix.generated");

var _dependenciesMultiplyScalar = require("./dependenciesMultiplyScalar.generated");

var _dependenciesNorm = require("./dependenciesNorm.generated");

var _dependenciesSin = require("./dependenciesSin.generated");

var _dependenciesTyped = require("./dependenciesTyped.generated");

var _dependenciesUnaryMinus = require("./dependenciesUnaryMinus.generated");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var rotationMatrixDependencies = {
  BigNumberDependencies: _dependenciesBigNumberClass.BigNumberDependencies,
  DenseMatrixDependencies: _dependenciesDenseMatrixClass.DenseMatrixDependencies,
  SparseMatrixDependencies: _dependenciesSparseMatrixClass.SparseMatrixDependencies,
  addScalarDependencies: _dependenciesAddScalar.addScalarDependencies,
  cosDependencies: _dependenciesCos.cosDependencies,
  matrixDependencies: _dependenciesMatrix.matrixDependencies,
  multiplyScalarDependencies: _dependenciesMultiplyScalar.multiplyScalarDependencies,
  normDependencies: _dependenciesNorm.normDependencies,
  sinDependencies: _dependenciesSin.sinDependencies,
  typedDependencies: _dependenciesTyped.typedDependencies,
  unaryMinusDependencies: _dependenciesUnaryMinus.unaryMinusDependencies,
  createRotationMatrix: _factoriesAny.createRotationMatrix
};
exports.rotationMatrixDependencies = rotationMatrixDependencies;