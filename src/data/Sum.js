const Type = require('../meta/Type');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');

const Sum = Type.defineData([['Sum', x => x]]);

Type.implement(Sum, Semigroup, {
    append: (x, y) => Sum.Sum(Type.value(x) + Type.value(y))
});

Type.implement(Sum, Monoid, {
    mempty: () => Sum.Sum(0)
});

module.exports = Sum;
