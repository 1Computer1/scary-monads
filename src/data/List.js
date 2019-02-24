const Type = require('../meta/Type');
const Functor = require('../control/Functor');
const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');
const Semigroup = require('../control/Semigroup');
const Monoid = require('../control/Monoid');
const Foldable = require('../control/Foldable');
const Traversable = require('../control/Traversable');

const List = Type.defineData([['List', xs => xs]]);

Type.implement(List, Functor, {
    fmap: (f, fx) => List.List(fx.value.map(f))
});

Type.implement(List, Applicative, {
    pure: x => List.List([x]),
    ap: (ff, fx) => {
        const res = [];
        for (const f of ff.value) {
            for (const x of fx.value) {
                res.push(f(x));
            }
        }

        return List.List(res);
    }
});

Type.implement(List, Monad, {
    bind: (mx, f) => {
        const res = [];
        for (const x of mx.value) {
            res.push(...f(x));
        }

        return List.List(res);
    }
});

Type.implement(List, Semigroup, {
    append: (x, y) => List.List(x.value.concat(y.value))
});

Type.implement(List, Monoid, {
    mempty: () => List.List([])
});

Type.implement(List, Foldable, {
    foldMap_at: m => (f, xs) => Monoid.for(m).mconcat_at(m)(xs.value.map(f))
});

Type.implement(List, Traversable, {
    traverse_at: ft => (f, xs) =>
        Foldable.for(xs).foldr((x, acc) =>
            Applicative.for(ft).liftA2((x_, acc_) =>
                List.List(acc_.value.concat([x_])), f(x), acc), Applicative.for(ft).pure(List.List([])), xs)
});

module.exports = List;
