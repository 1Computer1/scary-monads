const { define, or } = require('../meta/Typeclass');
const Functor = require('./Functor');
const Applicative = require('./Applicative');

const Monad = define({
    bind: (type, mx, f) => type.impl(Monad).join(type.impl(Functor).fmap(f, mx)),
    join: (type, mmx) => type.impl(Monad).bind(mmx, x => x)
}, or('bind', 'join'), Applicative);

module.exports = Monad;
