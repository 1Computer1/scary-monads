const Type = require('../meta/Type');
const Semigroup = require('./Semigroup');

const mempty_at = m => () => Monoid.for(m).mempty();
const mappend_at = () => (x, y) => Semigroup.for(x).append(x, y);
const mconcat_at = m => xs => xs.reduce((a, x) => Semigroup.for(a).append(a, x), Monoid.for(m).mempty());

const Monoid = Type.defineClass({
    mempty_at,
    mappend_at,
    mconcat_at,
    mempty: undefined,
    mappend: mappend_at(),
    mconcat: undefined
}, 'mempty', Semigroup);

module.exports = Monoid;
