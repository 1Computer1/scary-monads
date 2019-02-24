const Type = require('../meta/Type');
const Functor = require('./Functor');
const Applicative = require('./Applicative');

const Monad = Type.defineClass({
    bind: (mx, f) => Monad.for(mx).join(Functor.for(mx).fmap(f, mx)),
    join: mmx => Monad.for(mmx).bind(mmx, x => x)
}, Type.or('bind', 'join'), Applicative);

module.exports = Monad;
