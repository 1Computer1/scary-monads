const Type = require('../meta/Type');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');

const Endo = Type.defineData([['Endo', x => x]]);

Type.implement(Endo, Semigroup, {
    append: (f, g) => Endo.Endo(x => f.value(g.value(x)))
});

Type.implement(Endo, Monoid, {
    mempty: () => Endo.Endo(x => x)
});

module.exports = Endo;
