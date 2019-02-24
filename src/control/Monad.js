const Type = require('../meta/Type');
const Functor = require('./Functor');
const Applicative = require('./Applicative');
const Util = require('../meta/Util');

const bind_at = () => (mx, f) => Monad.for(mx).join(Functor.for(mx).fmap(f, mx));
const join_at = () => mmx => Monad.for(mmx).bind(mmx, Util.id);

const Monad = Type.defineClass({
    bind_at,
    join_at,
    bind: bind_at(),
    join: join_at()
}, Type.or('bind', 'join'), Applicative);

module.exports = Monad;
