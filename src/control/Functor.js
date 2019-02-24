const { define } = require('../meta/Typeclass');

const Functor = define({
    replace: (type, x, y) => type.impl(Functor).fmap(() => y, x)
}, 'fmap');

module.exports = Functor;
