const Type = require('../meta/Type');
const Functor = require('./Functor');
const Foldable = require('./Foldable');

const Traversable = Type.defineClass({
    traverse_at: ft => (f, xs) => Traversable.for(xs).sequence_at(ft)(Functor.for(xs).fmap(f, xs)),
    sequence_at: ft => xs => Traversable.for(xs).traverse_at(ft)(x => x, xs)
}, Type.or('traverse_at', 'sequence_at'), Foldable);

module.exports = Traversable;
