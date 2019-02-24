const Type = require('../meta/Type');
const Functor = require('../control/Functor');
const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');

const Option = Type.defineData([
    ['Some', x => x],
    ['None', () => null]
]);

Type.implement(Option, Functor, {
    fmap: (f, fx) => {
        if (Option.isSome(fx)) {
            return Option.Some(f(fx.value));
        }

        return Option.None();
    }
});

Type.implement(Option, Applicative, {
    pure: x => Option.Some(x),
    ap: (ff, fx) => {
        if (Option.isSome(ff) && Option.isSome(fx)) {
            return Option.Some(ff.value(fx.value));
        }

        return Option.None();
    }
});

Type.implement(Option, Monad, {
    bind: (mx, f) => {
        if (Option.isSome(mx)) {
            return f(mx.value);
        }

        return Option.None();
    }
});

module.exports = Option;
