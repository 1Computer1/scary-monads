const Type = require('../meta/Type');

const fmap_at = () => (f, fx) => Functor.for(fx).fmap(f, fx);
const replace_at = () => (fx, y) => Functor.for(fx).fmap(() => y, fx);

const Functor = Type.defineClass({
    fmap_at,
    replace_at,
    fmap: undefined,
    replace: (fx, y) => replace_at(fx)(fx, y)
}, 'fmap');

module.exports = Functor;
