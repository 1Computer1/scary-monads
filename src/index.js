module.exports = {
    // Typeclasses
    Functor: require('./control/Functor'),
    Applicative: require('./control/Applicative'),
    Monad: require('./control/Monad'),
    Semigroup: require('./control/Semigroup'),
    Monoid: require('./control/Monoid'),
    Foldable: require('./control/Foldable'),
    Traversable: require('./control/Traversable'),

    // Data types
    List: require('./data/List'),
    Option: require('./data/Option'),
    Sum: require('./data/Sum'),
    Endo: require('./data/Endo'),

    // Meta
    Typeclass: require('./meta/Type'),
    DoNotation: require('./meta/DoNotation'),
    Util: require('./meta/Util')
};
