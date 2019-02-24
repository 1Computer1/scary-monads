const {
    Functor, Applicative, Monad,
    Foldable, Traversable,
    List, Option, Sum,
    DoNotation: { run }
} = require('..');

// Getting the correct function for a type.
Monad.for(Option).join(Option.Some(Option.Some(5)));
Applicative.for(List).ap(List.List([x => x + 1, x => x + 2]), List.List([3, 4, 5]));

// Getting the correct function for a value.
const when = (p, s) => p ? s : Applicative.for(s).pure(null);

// Functions that do not have concrete value(s) immediately should have proxy argument(s)
// and should probably be denoted in the identifier somehow. I'm thinking a trailing `_at`
// to be suggestive of Haskell's `@` type application operator.
const composeKleisli_at = m => (f, g) => x => Monad.for(m).bind(f(x), g);

// We could also try to be cheeky, but it's not always going to work.
// const composeKleisli = (f, g) => x => {
//     const fx = f(x);
//     return Monad.for(fx).bind(fx, g);
// };

// Functions should also always have an `_at` variant for consistency.
// const when_at = f => (p, s) => p ? s : Applicative.for(f).pure(null);
// const when = (p, s) => when_at(s)(p, s);

// Do notation
run(Option, function*() {
    const x = yield Functor.for(Option).fmap(z => z + 1, Option.Some(3));
    const f = z => Option.Some(z - 1);
    const g = z => Option.Some(z + 1);
    const y = yield composeKleisli_at(Option)(f, g)(10);
    yield when(x > 2, Option.Some(x + y));
});

// Foldable and Traversable, which has more than one constraint on the types.
Foldable.for(List).foldMap_at(Sum)(x => Sum.Sum(x), List.List([1, 2, 3, 4]));
Foldable.for(List).foldr((acc, x) => acc + x, 0, List.List([1, 2, 3, 4]));
Traversable.for(List).traverse_at(Option)(x => Option.Some(x), List.List([1, 2, 3, 4, 5]));
Traversable.for(List).sequence_at(Option)(List.List([Option.Some(1), Option.None()]));
