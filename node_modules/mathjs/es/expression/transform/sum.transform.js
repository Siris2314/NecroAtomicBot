import { isBigNumber, isCollection, isNumber } from '../../utils/is';
import { factory } from '../../utils/factory';
import { errorTransform } from './utils/errorTransform';
import { createSum } from '../../function/statistics/sum';
/**
 * Attach a transform function to math.sum
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function mean
 * from one-based to zero based
 */

var name = 'sum';
var dependencies = ['typed', 'config', 'add', 'numeric'];
export var createSumTransform = /* #__PURE__ */factory(name, dependencies, function (_ref) {
  var typed = _ref.typed,
      config = _ref.config,
      add = _ref.add,
      numeric = _ref.numeric;
  var sum = createSum({
    typed: typed,
    config: config,
    add: add,
    numeric: numeric
  });
  return typed(name, {
    '...any': function any(args) {
      // change last argument dim from one-based to zero-based
      if (args.length === 2 && isCollection(args[0])) {
        var dim = args[1];

        if (isNumber(dim)) {
          args[1] = dim - 1;
        } else if (isBigNumber(dim)) {
          args[1] = dim.minus(1);
        }
      }

      try {
        return sum.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});