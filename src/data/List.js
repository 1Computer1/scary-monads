const Type = require('../meta/Type');
const Functor = require('../control/Functor');
const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');

const List = Type.defineData([['List', xs => xs]]);

Type.implement(List, Functor, {
    fmap: (f, fx) => List.List(Type.value(fx).map(f))
});

Type.implement(List, Applicative, {
    pure: x => List.List([x]),
    ap: (ff, fx) => {
        const res = [];
        for (const f of Type.value(ff)) {
            for (const x of Type.value(fx)) {
                res.push(f(x));
            }
        }

        return List.List(res);
    }
});

Type.implement(List, Monad, {
    bind: (mx, f) => {
        const res = [];
        for (const x of Type.value(mx)) {
            res.push(...f(x));
        }

        return List.List(res);
    }
});

module.exports = List;
