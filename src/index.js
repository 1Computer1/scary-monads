module.exports = {
    // Typeclasses
    Functor: require('./control/Functor'),
    Applicative: require('./control/Applicative'),
    Monad: require('./control/Monad'),

    // Data types
    Option: require('./data/Option'),

    // Meta
    Typeclass: require('./meta/Type'),
    DoNotation: require('./meta/DoNotation')
};
