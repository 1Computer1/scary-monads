const Type = require('../meta/Type');

const Functor = Type.defineClass({
    replace: (x, y) => Functor.for(x).fmap(() => y, x)
}, 'fmap');

module.exports = Functor;
