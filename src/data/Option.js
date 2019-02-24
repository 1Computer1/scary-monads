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
            return Option.Some(f(Type.value(fx)));
        }

        return Option.None();
    }
});

Type.implement(Option, Applicative, {
    pure: x => Option.Some(x),
    ap: (ff, fx) => {
        if (Option.isSome(ff) && Option.isSome(fx)) {
            return Option.Some(Type.value(ff)(Type.value(fx)));
        }

        return Option.None();
    }
});

Type.implement(Option, Monad, {
    bind: (mx, f) => {
        if (Option.isSome(mx)) {
            return f(Type.value(mx));
        }

        return Option.None();
    }
});

module.exports = Option;
