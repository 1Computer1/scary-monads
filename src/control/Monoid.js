const Type = require('../meta/Type');
const Semigroup = require('./Semigroup');

const Monoid = Type.defineClass({
    mappend: (x, y) => Semigroup.for(x).append(x, y),
    mconcat_at: m => xs => xs.reduce((a, x) => Semigroup.for(a).append(a, x), Monoid.for(m).mempty())
}, 'mempty', Semigroup);

module.exports = Monoid;
