const Applicative = require('../control/Applicative');
const Monad = require('../control/Monad');

const run = (type, gen) => {
    const { pure } = Applicative.for(type);
    const { bind } = Monad.for(type);
    const go = (iter, prev, x) => {
        const curr = iter.next(x);
        if (curr.done) {
            return prev.value;
        }

        return bind(curr.value, y => go(iter, curr, y));
    };

    return go(gen(), { value: pure(undefined), done: false }, pure(undefined));
};

module.exports = { run };
