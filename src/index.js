module.exports = {
    // Typeclasses
    Functor: require('./control/Functor'),
    Applicative: require('./control/Applicative'),
    Monad: require('./control/Monad'),

    // Data types
    Option: require('./data/Option'),

    // Meta
    Algebraic: require('./meta/Algebraic'),
    Typeclass: require('./meta/Typeclass'),
    DoNotation: require('./meta/DoNotation')
};
