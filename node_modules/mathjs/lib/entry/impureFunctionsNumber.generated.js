"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "docs", {
  enumerable: true,
  get: function get() {
    return _embeddedDocs.embeddedDocs;
  }
});
exports.parser = exports.derivative = exports.Parser = exports.help = exports.compile = exports.rationalize = exports.simplify = exports.Help = exports.evaluate = exports.parse = exports.IndexNode = exports.FunctionNode = exports.AssignmentNode = exports.RangeNode = exports.ConstantNode = exports.AccessorNode = exports.SymbolNode = exports.OperatorNode = exports.BlockNode = exports.reviver = exports.RelationalNode = exports.ParenthesisNode = exports.ObjectNode = exports.FunctionAssignmentNode = exports.ConditionalNode = exports.ArrayNode = exports.Node = exports.chain = exports.Chain = void 0;

var _configReadonly = require("./configReadonly");

var _factoriesNumber = require("../factoriesNumber");

var _pureFunctionsNumber = require("./pureFunctionsNumber.generated");

var _embeddedDocs = require("../expression/embeddedDocs/embeddedDocs");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var math = {}; // NOT pure!

var mathWithTransform = {}; // NOT pure!

var classes = {}; // NOT pure!

var Chain = (0, _factoriesNumber.createChainClass)({
  math: math
});
exports.Chain = Chain;
var chain = (0, _factoriesNumber.createChain)({
  Chain: Chain,
  typed: _pureFunctionsNumber.typed
});
exports.chain = chain;
var Node = (0, _factoriesNumber.createNode)({
  mathWithTransform: mathWithTransform
});
exports.Node = Node;
var ArrayNode = (0, _factoriesNumber.createArrayNode)({
  Node: Node
});
exports.ArrayNode = ArrayNode;
var ConditionalNode = (0, _factoriesNumber.createConditionalNode)({
  Node: Node
});
exports.ConditionalNode = ConditionalNode;
var FunctionAssignmentNode = (0, _factoriesNumber.createFunctionAssignmentNode)({
  Node: Node,
  typed: _pureFunctionsNumber.typed
});
exports.FunctionAssignmentNode = FunctionAssignmentNode;
var ObjectNode = (0, _factoriesNumber.createObjectNode)({
  Node: Node
});
exports.ObjectNode = ObjectNode;
var ParenthesisNode = (0, _factoriesNumber.createParenthesisNode)({
  Node: Node
});
exports.ParenthesisNode = ParenthesisNode;
var RelationalNode = (0, _factoriesNumber.createRelationalNode)({
  Node: Node
});
exports.RelationalNode = RelationalNode;
var reviver = (0, _factoriesNumber.createReviver)({
  classes: classes
});
exports.reviver = reviver;
var BlockNode = (0, _factoriesNumber.createBlockNode)({
  Node: Node,
  ResultSet: _pureFunctionsNumber.ResultSet
});
exports.BlockNode = BlockNode;
var OperatorNode = (0, _factoriesNumber.createOperatorNode)({
  Node: Node
});
exports.OperatorNode = OperatorNode;
var SymbolNode = (0, _factoriesNumber.createSymbolNode)({
  Node: Node,
  math: math
});
exports.SymbolNode = SymbolNode;
var AccessorNode = (0, _factoriesNumber.createAccessorNode)({
  Node: Node,
  subset: _pureFunctionsNumber.subset
});
exports.AccessorNode = AccessorNode;
var ConstantNode = (0, _factoriesNumber.createConstantNode)({
  Node: Node
});
exports.ConstantNode = ConstantNode;
var RangeNode = (0, _factoriesNumber.createRangeNode)({
  Node: Node
});
exports.RangeNode = RangeNode;
var AssignmentNode = (0, _factoriesNumber.createAssignmentNode)({
  matrix: _pureFunctionsNumber.matrix,
  Node: Node,
  subset: _pureFunctionsNumber.subset
});
exports.AssignmentNode = AssignmentNode;
var FunctionNode = (0, _factoriesNumber.createFunctionNode)({
  Node: Node,
  SymbolNode: SymbolNode,
  math: math
});
exports.FunctionNode = FunctionNode;
var IndexNode = (0, _factoriesNumber.createIndexNode)({
  Node: Node,
  Range: _pureFunctionsNumber.Range,
  size: _pureFunctionsNumber.size
});
exports.IndexNode = IndexNode;
var parse = (0, _factoriesNumber.createParse)({
  AccessorNode: AccessorNode,
  ArrayNode: ArrayNode,
  AssignmentNode: AssignmentNode,
  BlockNode: BlockNode,
  ConditionalNode: ConditionalNode,
  ConstantNode: ConstantNode,
  FunctionAssignmentNode: FunctionAssignmentNode,
  FunctionNode: FunctionNode,
  IndexNode: IndexNode,
  ObjectNode: ObjectNode,
  OperatorNode: OperatorNode,
  ParenthesisNode: ParenthesisNode,
  RangeNode: RangeNode,
  RelationalNode: RelationalNode,
  SymbolNode: SymbolNode,
  config: _configReadonly.config,
  numeric: _pureFunctionsNumber.numeric,
  typed: _pureFunctionsNumber.typed
});
exports.parse = parse;
var evaluate = (0, _factoriesNumber.createEvaluate)({
  parse: parse,
  typed: _pureFunctionsNumber.typed
});
exports.evaluate = evaluate;
var Help = (0, _factoriesNumber.createHelpClass)({
  parse: parse
});
exports.Help = Help;
var simplify = (0, _factoriesNumber.createSimplify)({
  ConstantNode: ConstantNode,
  FunctionNode: FunctionNode,
  OperatorNode: OperatorNode,
  ParenthesisNode: ParenthesisNode,
  SymbolNode: SymbolNode,
  add: _pureFunctionsNumber.add,
  config: _configReadonly.config,
  divide: _pureFunctionsNumber.divide,
  equal: _pureFunctionsNumber.equal,
  isZero: _pureFunctionsNumber.isZero,
  mathWithTransform: mathWithTransform,
  multiply: _pureFunctionsNumber.multiply,
  parse: parse,
  pow: _pureFunctionsNumber.pow,
  subtract: _pureFunctionsNumber.subtract,
  typed: _pureFunctionsNumber.typed
});
exports.simplify = simplify;
var rationalize = (0, _factoriesNumber.createRationalize)({
  ConstantNode: ConstantNode,
  FunctionNode: FunctionNode,
  OperatorNode: OperatorNode,
  ParenthesisNode: ParenthesisNode,
  SymbolNode: SymbolNode,
  add: _pureFunctionsNumber.add,
  config: _configReadonly.config,
  divide: _pureFunctionsNumber.divide,
  equal: _pureFunctionsNumber.equal,
  isZero: _pureFunctionsNumber.isZero,
  mathWithTransform: mathWithTransform,
  multiply: _pureFunctionsNumber.multiply,
  parse: parse,
  pow: _pureFunctionsNumber.pow,
  simplify: simplify,
  subtract: _pureFunctionsNumber.subtract,
  typed: _pureFunctionsNumber.typed
});
exports.rationalize = rationalize;
var compile = (0, _factoriesNumber.createCompile)({
  parse: parse,
  typed: _pureFunctionsNumber.typed
});
exports.compile = compile;
var help = (0, _factoriesNumber.createHelp)({
  Help: Help,
  mathWithTransform: mathWithTransform,
  typed: _pureFunctionsNumber.typed
});
exports.help = help;
var Parser = (0, _factoriesNumber.createParserClass)({
  parse: parse
});
exports.Parser = Parser;
var derivative = (0, _factoriesNumber.createDerivative)({
  ConstantNode: ConstantNode,
  FunctionNode: FunctionNode,
  OperatorNode: OperatorNode,
  ParenthesisNode: ParenthesisNode,
  SymbolNode: SymbolNode,
  config: _configReadonly.config,
  equal: _pureFunctionsNumber.equal,
  isZero: _pureFunctionsNumber.isZero,
  numeric: _pureFunctionsNumber.numeric,
  parse: parse,
  simplify: simplify,
  typed: _pureFunctionsNumber.typed
});
exports.derivative = derivative;
var parser = (0, _factoriesNumber.createParser)({
  Parser: Parser,
  typed: _pureFunctionsNumber.typed
});
exports.parser = parser;

_extends(math, {
  typed: _pureFunctionsNumber.typed,
  chain: chain,
  nthRoot: _pureFunctionsNumber.nthRoot,
  e: _pureFunctionsNumber.e,
  "false": _pureFunctionsNumber._false,
  LN10: _pureFunctionsNumber.LN10,
  LOG10E: _pureFunctionsNumber.LOG10E,
  NaN: _pureFunctionsNumber._NaN,
  phi: _pureFunctionsNumber.phi,
  SQRT1_2: _pureFunctionsNumber.SQRT1_2,
  tau: _pureFunctionsNumber.tau,
  version: _pureFunctionsNumber.version,
  string: _pureFunctionsNumber.string,
  filter: _pureFunctionsNumber.filter,
  map: _pureFunctionsNumber.map,
  combinationsWithRep: _pureFunctionsNumber.combinationsWithRep,
  pickRandom: _pureFunctionsNumber.pickRandom,
  randomInt: _pureFunctionsNumber.randomInt,
  compare: _pureFunctionsNumber.compare,
  compareText: _pureFunctionsNumber.compareText,
  smaller: _pureFunctionsNumber.smaller,
  larger: _pureFunctionsNumber.larger,
  erf: _pureFunctionsNumber.erf,
  format: _pureFunctionsNumber.format,
  clone: _pureFunctionsNumber.clone,
  typeOf: _pureFunctionsNumber.typeOf,
  reviver: reviver,
  unaryMinus: _pureFunctionsNumber.unaryMinus,
  abs: _pureFunctionsNumber.abs,
  cbrt: _pureFunctionsNumber.cbrt,
  cube: _pureFunctionsNumber.cube,
  expm1: _pureFunctionsNumber.expm1,
  floor: _pureFunctionsNumber.floor,
  lcm: _pureFunctionsNumber.lcm,
  log2: _pureFunctionsNumber.log2,
  multiplyScalar: _pureFunctionsNumber.multiplyScalar,
  sign: _pureFunctionsNumber.sign,
  square: _pureFunctionsNumber.square,
  xgcd: _pureFunctionsNumber.xgcd,
  pow: _pureFunctionsNumber.pow,
  log1p: _pureFunctionsNumber.log1p,
  norm: _pureFunctionsNumber.norm,
  bitAnd: _pureFunctionsNumber.bitAnd,
  bitOr: _pureFunctionsNumber.bitOr,
  leftShift: _pureFunctionsNumber.leftShift,
  rightLogShift: _pureFunctionsNumber.rightLogShift,
  not: _pureFunctionsNumber.not,
  xor: _pureFunctionsNumber.xor,
  matrix: _pureFunctionsNumber.matrix,
  combinations: _pureFunctionsNumber.combinations,
  acos: _pureFunctionsNumber.acos,
  acot: _pureFunctionsNumber.acot,
  acsc: _pureFunctionsNumber.acsc,
  asec: _pureFunctionsNumber.asec,
  asin: _pureFunctionsNumber.asin,
  atan: _pureFunctionsNumber.atan,
  atanh: _pureFunctionsNumber.atanh,
  cosh: _pureFunctionsNumber.cosh,
  coth: _pureFunctionsNumber.coth,
  csch: _pureFunctionsNumber.csch,
  sech: _pureFunctionsNumber.sech,
  sinh: _pureFunctionsNumber.sinh,
  tanh: _pureFunctionsNumber.tanh,
  isNegative: _pureFunctionsNumber.isNegative,
  isZero: _pureFunctionsNumber.isZero,
  round: _pureFunctionsNumber.round,
  'E': _pureFunctionsNumber.e,
  LN2: _pureFunctionsNumber.LN2,
  "null": _pureFunctionsNumber._null,
  SQRT2: _pureFunctionsNumber.SQRT2,
  number: _pureFunctionsNumber.number,
  forEach: _pureFunctionsNumber.forEach,
  size: _pureFunctionsNumber.size,
  random: _pureFunctionsNumber.random,
  compareNatural: _pureFunctionsNumber.compareNatural,
  equalText: _pureFunctionsNumber.equalText,
  largerEq: _pureFunctionsNumber.largerEq,
  print: _pureFunctionsNumber.print,
  isNumeric: _pureFunctionsNumber.isNumeric,
  isPrime: _pureFunctionsNumber.isPrime,
  replacer: _pureFunctionsNumber.replacer,
  addScalar: _pureFunctionsNumber.addScalar,
  exp: _pureFunctionsNumber.exp,
  gcd: _pureFunctionsNumber.gcd,
  mod: _pureFunctionsNumber.mod,
  sqrt: _pureFunctionsNumber.sqrt,
  divideScalar: _pureFunctionsNumber.divideScalar,
  add: _pureFunctionsNumber.add,
  bitNot: _pureFunctionsNumber.bitNot,
  rightArithShift: _pureFunctionsNumber.rightArithShift,
  or: _pureFunctionsNumber.or,
  subset: _pureFunctionsNumber.subset,
  acosh: _pureFunctionsNumber.acosh,
  acsch: _pureFunctionsNumber.acsch,
  asinh: _pureFunctionsNumber.asinh,
  cos: _pureFunctionsNumber.cos,
  csc: _pureFunctionsNumber.csc,
  sin: _pureFunctionsNumber.sin,
  isInteger: _pureFunctionsNumber.isInteger,
  isNaN: _pureFunctionsNumber.isNaN,
  catalan: _pureFunctionsNumber.catalan,
  Infinity: _pureFunctionsNumber._Infinity,
  pi: _pureFunctionsNumber.pi,
  "true": _pureFunctionsNumber._true,
  apply: _pureFunctionsNumber.apply,
  partitionSelect: _pureFunctionsNumber.partitionSelect,
  equalScalar: _pureFunctionsNumber.equalScalar,
  smallerEq: _pureFunctionsNumber.smallerEq,
  unequal: _pureFunctionsNumber.unequal,
  hasNumericValue: _pureFunctionsNumber.hasNumericValue,
  unaryPlus: _pureFunctionsNumber.unaryPlus,
  fix: _pureFunctionsNumber.fix,
  multiply: _pureFunctionsNumber.multiply,
  log: _pureFunctionsNumber.log,
  bitXor: _pureFunctionsNumber.bitXor,
  index: _pureFunctionsNumber.index,
  acoth: _pureFunctionsNumber.acoth,
  atan2: _pureFunctionsNumber.atan2,
  sec: _pureFunctionsNumber.sec,
  isPositive: _pureFunctionsNumber.isPositive,
  hypot: _pureFunctionsNumber.hypot,
  composition: _pureFunctionsNumber.composition,
  'PI': _pureFunctionsNumber.pi,
  range: _pureFunctionsNumber.range,
  equal: _pureFunctionsNumber.equal,
  mode: _pureFunctionsNumber.mode,
  quantileSeq: _pureFunctionsNumber.quantileSeq,
  numeric: _pureFunctionsNumber.numeric,
  log10: _pureFunctionsNumber.log10,
  divide: _pureFunctionsNumber.divide,
  gamma: _pureFunctionsNumber.gamma,
  cot: _pureFunctionsNumber.cot,
  LOG2E: _pureFunctionsNumber.LOG2E,
  factorial: _pureFunctionsNumber.factorial,
  permutations: _pureFunctionsNumber.permutations,
  prod: _pureFunctionsNumber.prod,
  min: _pureFunctionsNumber.min,
  mean: _pureFunctionsNumber.mean,
  ceil: _pureFunctionsNumber.ceil,
  and: _pureFunctionsNumber.and,
  tan: _pureFunctionsNumber.tan,
  "boolean": _pureFunctionsNumber["boolean"],
  parse: parse,
  evaluate: evaluate,
  multinomial: _pureFunctionsNumber.multinomial,
  max: _pureFunctionsNumber.max,
  median: _pureFunctionsNumber.median,
  subtract: _pureFunctionsNumber.subtract,
  simplify: simplify,
  rationalize: rationalize,
  compile: compile,
  deepEqual: _pureFunctionsNumber.deepEqual,
  mad: _pureFunctionsNumber.mad,
  help: help,
  stirlingS2: _pureFunctionsNumber.stirlingS2,
  variance: _pureFunctionsNumber.variance,
  derivative: derivative,
  parser: parser,
  std: _pureFunctionsNumber.std,
  bellNumbers: _pureFunctionsNumber.bellNumbers,
  asech: _pureFunctionsNumber.asech,
  sum: _pureFunctionsNumber.sum,
  config: _configReadonly.config
});

_extends(mathWithTransform, math, {
  filter: (0, _factoriesNumber.createFilterTransform)({
    typed: _pureFunctionsNumber.typed
  }),
  map: (0, _factoriesNumber.createMapTransform)({
    typed: _pureFunctionsNumber.typed
  }),
  forEach: (0, _factoriesNumber.createForEachTransform)({
    typed: _pureFunctionsNumber.typed
  }),
  subset: (0, _factoriesNumber.createSubsetTransform)({
    matrix: _pureFunctionsNumber.matrix,
    typed: _pureFunctionsNumber.typed
  }),
  apply: (0, _factoriesNumber.createApplyTransform)({
    isInteger: _pureFunctionsNumber.isInteger,
    typed: _pureFunctionsNumber.typed
  }),
  range: (0, _factoriesNumber.createRangeTransform)({
    matrix: _pureFunctionsNumber.matrix,
    config: _configReadonly.config,
    larger: _pureFunctionsNumber.larger,
    largerEq: _pureFunctionsNumber.largerEq,
    smaller: _pureFunctionsNumber.smaller,
    smallerEq: _pureFunctionsNumber.smallerEq,
    typed: _pureFunctionsNumber.typed
  }),
  max: (0, _factoriesNumber.createMaxTransform)({
    config: _configReadonly.config,
    larger: _pureFunctionsNumber.larger,
    numeric: _pureFunctionsNumber.numeric,
    typed: _pureFunctionsNumber.typed
  }),
  min: (0, _factoriesNumber.createMinTransform)({
    config: _configReadonly.config,
    numeric: _pureFunctionsNumber.numeric,
    smaller: _pureFunctionsNumber.smaller,
    typed: _pureFunctionsNumber.typed
  }),
  sum: (0, _factoriesNumber.createSumTransform)({
    add: _pureFunctionsNumber.add,
    config: _configReadonly.config,
    numeric: _pureFunctionsNumber.numeric,
    typed: _pureFunctionsNumber.typed
  }),
  mean: (0, _factoriesNumber.createMeanTransform)({
    add: _pureFunctionsNumber.add,
    divide: _pureFunctionsNumber.divide,
    typed: _pureFunctionsNumber.typed
  }),
  variance: (0, _factoriesNumber.createVarianceTransform)({
    add: _pureFunctionsNumber.add,
    apply: _pureFunctionsNumber.apply,
    divide: _pureFunctionsNumber.divide,
    isNaN: _pureFunctionsNumber.isNaN,
    multiply: _pureFunctionsNumber.multiply,
    subtract: _pureFunctionsNumber.subtract,
    typed: _pureFunctionsNumber.typed
  }),
  std: (0, _factoriesNumber.createStdTransform)({
    sqrt: _pureFunctionsNumber.sqrt,
    typed: _pureFunctionsNumber.typed,
    variance: _pureFunctionsNumber.variance
  })
});

_extends(classes, {
  Range: _pureFunctionsNumber.Range,
  Chain: Chain,
  Node: Node,
  ArrayNode: ArrayNode,
  ConditionalNode: ConditionalNode,
  FunctionAssignmentNode: FunctionAssignmentNode,
  ObjectNode: ObjectNode,
  ParenthesisNode: ParenthesisNode,
  RelationalNode: RelationalNode,
  ResultSet: _pureFunctionsNumber.ResultSet,
  BlockNode: BlockNode,
  OperatorNode: OperatorNode,
  SymbolNode: SymbolNode,
  AccessorNode: AccessorNode,
  ConstantNode: ConstantNode,
  RangeNode: RangeNode,
  AssignmentNode: AssignmentNode,
  FunctionNode: FunctionNode,
  IndexNode: IndexNode,
  Help: Help,
  Parser: Parser
});

Chain.createProxy(math);