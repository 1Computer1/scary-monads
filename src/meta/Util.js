const id = x => x;
const curry = f => x => y => f(x, y);
const compose = (f, g) => x => f(g(x));
const constant = x => () => x;

module.exports = { id, curry, compose, constant };
