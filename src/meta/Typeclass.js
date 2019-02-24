/**
 * Global implementation cache.
 * The structure is like `typeID => tcID => impl`.
 */
const implementations = new Map();

// Constraints-related things
const andTag = Symbol('and');
const orTag = Symbol('or');

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

    return implementations.has(type.id) && implementations.get(type.id).has(required.id);
};

const hasMinimal = (functions, minimal) => {
    if (minimal.tag === andTag) {
        return minimal.constraints.every(x => hasMinimal(functions, x));
    }

    if (minimal.tag === orTag) {
        return minimal.constraints.some(x => hasMinimal(functions, x));
    }

    return Object.prototype.hasOwnProperty.call(functions, minimal);
};

// Public typeclasses API
const define = (functions, minimal, required) => {
    const id = Symbol();
    return {
        id,
        functions,
        minimal,
        required,
        impl: type => implementations.get(type.id).get(id)
    };
};

const implement = (type, tc, functions) => {
    if (!hasRequired(type, tc.required)) {
        throw new TypeError('Required typeclasses not implemented');
    }

    if (!hasMinimal(functions, tc.minimal)) {
        throw new TypeError('Minimal definition not satisfied');
    }

    const impl = Object.create(null);
    for (const [k, f] of Object.entries(tc.functions)) {
        impl[k] = (...args) => f(type, ...args);
    }

    Object.assign(impl, functions);
    if (!implementations.has(type.id)) {
        implementations.set(type.id, new Map());
    }

    implementations.get(type.id).set(tc.id, impl);
    return impl;
};

const newType = base => {
    const id = Symbol();
    return Object.assign(base, {
        id,
        impl: tc => implementations.get(id).get(tc.id),
        impls: () => Object.assign({}, ...implementations.get(id).values())
    });
};

const and = (...constraints) => ({ tag: andTag, constraints });
const or = (...constraints) => ({ tag: orTag, constraints });

module.exports = { newType, define, implement, and, or };
