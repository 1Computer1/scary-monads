const Type = require('../meta/Type');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');

const Sum = Type.defineData([['Sum', x => x]]);

Type.implement(Sum, Semigroup, {
    append: (x, y) => Sum.Sum(x.value + y.value)
});

Type.implement(Sum, Monoid, {
    mempty: () => Sum.Sum(0)
});

module.exports = Sum;
