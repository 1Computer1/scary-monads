const Type = require('../meta/Type');
const Monoid = require('./Monoid');
const Endo = require('../data/Endo');

const Foldable = Type.defineClass({
    foldMap_at: m => (f, xs) =>
        Foldable.for(xs).foldr((x, acc) => Monoid.for(m).mappend(f(x), acc), Monoid.for(m).mempty(), xs),
    foldr: (f, z, xs) =>
        Type.value(Foldable.for(xs).foldMap_at(Endo)(x => Endo.Endo(y => f(x, y)), xs))(z)
}, 'foldMap_at');

module.exports = Foldable;
