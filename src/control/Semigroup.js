const Type = require('../meta/Type');

const append_at = () => (x, y) => Semigroup.for(x).append(x, y);

const Semigroup = Type.defineClass({
    append_at,
    append: (x, y) => append_at(x)(x, y)
}, 'append');

module.exports = Semigroup;
