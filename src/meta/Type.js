// Global data type cache.
// The structure is like `typeID => data`.
const types = new Map();

// Public algebraic data types API
const defineData = members => {
    const id = Symbol();
    const data = { id };
    for (const [name, f] of members) {
        data[name] = (...args) => ({
            id,
            tag: data[`tag${name}`],
            value: f(...args)
        });

        data[`tag${name}`] = Symbol(name);
        data[`is${name}`] = x => x.tag === data[`tag${name}`];
    }

    types.set(id, data);
    return data;
};

const dataTypeof = ({ id }) => types.get(id);

// Global implementation cache.
// The structure is like `typeID => tcID => impl`.
const implementations = new Map();

// Constraints-related things
const andTag = Symbol('and');
const orTag = Symbol('or');

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

const hasRequired = (type, required) => {
    if (required == null) {
        return true;
    }

    if (required.tag === andTag) {
        return required.constraints.every(x => hasRequired(type, x));
    }

    if (required.tag === orTag) {
        return required.constraints.some(x => hasRequired(type, x));
    }

    return implements(type, required);
};

const hasMinimal = (functions, minimal) => {
    if (minimal.tag === andTag) {
        return minimal.constraints.every(x => hasMinimal(functions, x));
    }

    if (minimal.tag === orTag) {
        return minimal.constraints.some(x => hasMinimal(functions, x));
    }

    return has(functions, minimal) || has(functions, `${minimal}_at`);
};

const isValidImpl = (tcFs, implFs) => {
    const tcKeys = Object.keys(tcFs);
    const implKeys = Object.keys(implFs);
    return implKeys.every(k => has(tcFs, k))
        && tcKeys.filter(k => k.endsWith('_at')).every(k => !has(implFs, k) || !has(implFs, k.slice(0, -3)));
};

// Public typeclasses API
const defineClass = (functions, minimal, required) => {
    const id = Symbol();
    return {
        id,
        functions,
        minimal,
        required,
        for: k => {
            if (!implementations.has(k.id) || !implementations.get(k.id).has(id)) {
                throw new TypeError('Type does not have a typeclass implementation');
            }

            return implementations.get(k.id).get(id);
        }
    };
};

const implement = (type, tc, functions) => {
    if (!hasRequired(type, tc.required)) {
        throw new TypeError('Required typeclasses not implemented');
    }

    if (!hasMinimal(functions, tc.minimal)) {
        throw new TypeError('Minimal definition not satisfied');
    }

    if (!isValidImpl(tc.functions, functions)) {
        throw new TypeError('Implementation is not valid');
    }

    const impl = Object.create(null);
    Object.assign(impl, tc.functions, functions);
    if (!implementations.has(type.id)) {
        implementations.set(type.id, new Map());
    }

    implementations.get(type.id).set(tc.id, impl);
    return impl;
};

const implements = (k, tc) => implementations.has(k.id) && implementations.get(k.id).has(tc.id);
const and = (...constraints) => ({ tag: andTag, constraints });
const or = (...constraints) => ({ tag: orTag, constraints });

module.exports = { defineData, dataTypeof, defineClass, implement, implements, and, or };
