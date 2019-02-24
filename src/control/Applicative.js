const Type = require('../meta/Type');
const Functor = require('./Functor');

const Applicative = Type.defineClass({
    ap: (ff, fx) => Applicative.for(ff).liftA2(x => x, ff, fx),
    liftA2: (f, fx, fy) => Applicative.for(f).ap(Functor.for(f).fmap(x => y => f(x, y), fx), fy)
}, Type.and('pure', Type.or('ap', 'liftA2')), Functor);

module.exports = Applicative;
