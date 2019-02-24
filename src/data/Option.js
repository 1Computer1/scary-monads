const Algebraic = require('../meta/Algebraic');
const Typeclass = require('../meta/Typeclass');
const Functor = require('../control/Functor');
const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');

const Option = Typeclass.newType(Algebraic.define([
    ['Some', x => x],
    ['None', () => null]
]));

Typeclass.implement(Option, Functor, {
    fmap: (f, fx) => {
        if (Option.isSome(fx)) {
            return Option.Some(f(Algebraic.value(fx)));
        }

        return Option.None();
    }
});

Typeclass.implement(Option, Applicative, {
    pure: x => Option.Some(x),
    ap: (ff, fx) => {
        if (Option.isSome(ff) && Option.isSome(fx)) {
            return Option.Some(Algebraic.value(ff)(Algebraic.value(fx)));
        }

        return Option.None();
    }
});

Typeclass.implement(Option, Monad, {
    bind: (mx, f) => {
        if (Option.isSome(mx)) {
            return f(Algebraic.value(mx));
        }

        return Option.None();
    }
});

module.exports = Option;
