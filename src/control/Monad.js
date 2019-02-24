const Type = require('../meta/Type');
const Functor = require('./Functor');
const Applicative = require('./Applicative');

const bind_at = () => (mx, f) => Monad.for(mx).join(Functor.for(mx).fmap(f, mx));
const join_at = () => mmx => Monad.for(mmx).bind(mmx, x => x);

const Monad = Type.defineClass({
    bind_at,
    join_at,
    bind: (mx, f) => bind_at()(mx, f),
    join: mmx => join_at()(mmx)
}, Type.or('bind', 'join'), Applicative);

module.exports = Monad;
