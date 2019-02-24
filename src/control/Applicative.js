const { define, and, or } = require('../meta/Typeclass');
const Functor = require('./Functor');

const Applicative = define({
    ap: (type, ff, fx) => type.impl(Applicative).liftA2(x => x, ff, fx),
    liftA2: (type, f, fx, fy) => type.impl(Applicative).ap(type.impl(Functor).fmap(x => y => f(x, y), fx), fy)
}, and('pure', or('ap', 'liftA2')), Functor);

module.exports = Applicative;
