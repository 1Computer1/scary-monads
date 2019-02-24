const Type = require('../meta/Type');
const Functor = require('./Functor');
const Foldable = require('./Foldable');
const Util = require('../meta/Util');

const traverse_at = ft => (f, xs) => Traversable.for(xs).sequence_at(ft)(Functor.for(xs).fmap(f, xs));
const sequence_at = ft => xs => Traversable.for(xs).traverse_at(ft)(Util.id, xs);

const Traversable = Type.defineClass({
    traverse_at,
    sequence_at,
    traverse: undefined,
    sequence: undefined
}, Type.or('traverse', 'sequence'), Foldable);

module.exports = Traversable;
