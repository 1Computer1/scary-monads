const define = members => {
    const data = {};
    for (const [name, f] of members) {
        data[name] = (...args) => ({ tag: data[`tag${name}`], value: f(...args) });
        data[`tag${name}`] = Symbol(name);
        data[`is${name}`] = x => x.tag === data[`tag${name}`];
    }

    return data;
};

const value = ({ value: x }) => x;

module.exports = { define, value };
