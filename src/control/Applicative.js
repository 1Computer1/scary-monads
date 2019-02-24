const Type = require('../meta/Type');
const Functor = require('./Functor');

const pure_at = f => x => Applicative.for(f).pure(x);
const ap_at = f => (ff, fx) => Applicative.for(f).liftA2(x => x, ff, fx);
const liftA2_at = ft => (f, fx, fy) => Applicative.for(ft).ap(Functor.for(ft).fmap(x => y => f(x, y), fx), fy);

const Applicative = Type.defineClass({
    pure_at,
    ap_at,
    liftA2_at,
    pure: undefined,
    ap: (ff, fx) => ap_at(ff)(ff, fx),
    liftA2: (f, fx, fy) => liftA2_at(fx)(f, fx, fy)
}, Type.and('pure', Type.or('ap', 'liftA2')), Functor);

module.exports = Applicative;
