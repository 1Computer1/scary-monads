const Type = require('../meta/Type');
const Functor = require('../control/Functor');
const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');
const Foldable = require('../control/Foldable');
const Traversable = require('../control/Traversable');

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

Type.implement(Option, Semigroup, {
    append: (x, y) => {
        if (Option.isSome(x) && Option.isSome(y)) {
            return Option.Some(Semigroup.for(x).append(x, y));
        }

        return Option.None();
    }
});

Type.implement(Option, Monoid, {
    mempty: () => Option.None()
});

Type.implement(Option, Foldable, {
    foldMap_at: m => (f, xs) => {
        if (Option.isSome(xs)) {
            return f(xs.value);
        }

        return Monoid.for(m).mempty();
    }
});

Type.implement(Option, Traversable, {
    traverse_at: ft => (f, xs) => {
        if (Option.isSome(xs)) {
            return Functor.for(ft).fmap(Option.Some, f(xs.value));
        }

        return Applicative.for(ft).pure(Option.None());
    }
});

module.exports = Option;
