const Type = require('../meta/Type');
const Util = require('../meta/Util');

const fmap_at = () => (f, fx) => Functor.for(fx).fmap(f, fx);
const replace_at = () => (fx, y) => Functor.for(fx).fmap(Util.constant(y), fx);

const Functor = Type.defineClass({
    fmap_at,
    replace_at,
    fmap: (f, fx) => fmap_at(fx)(f, fx),
    replace: (fx, y) => replace_at(fx)(fx, y)
}, 'fmap');

module.exports = Functor;
