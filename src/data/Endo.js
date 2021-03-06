const Type = require('../meta/Type');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');
const Util = require('../meta/Util');

const Endo = Type.defineData([['Endo', x => x]]);

Type.implement(Endo, Semigroup, {
    append: (f, g) => Endo.Endo(Util.compose(f.value, g.value))
});

Type.implement(Endo, Monoid, {
    mempty: () => Endo.Endo(Util.id)
});

module.exports = Endo;
