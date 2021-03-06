const Type = require('../meta/Type');
const Monoid = require('./Monoid');
const Endo = require('../data/Endo');
const Util = require('../meta/Util');

const foldMap_at = m => (f, xs) =>
    Foldable.for(xs).foldr(Util.compose(Monoid.for(m).mappend, f), Monoid.for(m).mempty(), xs);

const foldr_at = () => (f, z, xs) =>
    Foldable.for(xs).foldMap_at(Endo)(Util.compose(Endo.Endo, Util.curry(f)), xs).value(z);

const Foldable = Type.defineClass({
    foldMap_at,
    foldr_at,
    foldr: (f, z, xs) => foldr_at(xs)(f, z, xs),
    foldMap: undefined
}, Type.or('foldMap', 'foldr'));

module.exports = Foldable;
