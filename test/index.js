const Functor = require('../src/control/Functor');
const Applicative = require('../src/control/Applicative');
const Monad = require('../src/control/Monad');
const Option = require('../src/data/Option');
const { run } = require('../src/meta/DoNotation');

// Function via type
Option.impl(Applicative).liftA2((x, y) => x + y, Option.Some(1), Option.Some(2));

// Function via typeclass
Monad.impl(Option).join(Option.Some(Option.Some(5)));

// Function via all implementations of type
// Insertion order is used when there is a name conflict
Option.impls().fmap(x => x + 1, Option.Some(5));

// Do notation
run(Option, function* f() {
    const x = yield Option.Some(5);
    const y = yield Option.impl(Functor).fmap(z => z + 1, Option.Some(3));
    yield Option.Some(x + y);
});
