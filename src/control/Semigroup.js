const Type = require('../meta/Type');

const append_at = () => (x, y) => Semigroup.for(x).append(x, y);

const Semigroup = Type.defineClass({
    append_at,
    append: undefined
}, 'append');

module.exports = Semigroup;
