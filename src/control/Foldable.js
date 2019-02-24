const Type = require('../meta/Type');
const Monoid = require('./Monoid');
const Endo = require('../data/Endo');

const foldMap_at = m => (f, xs) =>
    Foldable.for(xs).foldr((x, acc) => Monoid.for(m).mappend(f(x), acc), Monoid.for(m).mempty(), xs);

const foldr_at = () => (f, z, xs) =>
    Foldable.for(xs).foldMap_at(Endo)(x => Endo.Endo(y => f(x, y)), xs).value(z);

const Foldable = Type.defineClass({
    foldMap_at,
    foldr_at,
    foldr: (f, z, xs) => foldr_at(xs)(f, z, xs),
    foldMap: undefined
}, Type.or('foldMap', 'foldr'));

module.exports = Foldable;
