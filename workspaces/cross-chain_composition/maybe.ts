class Maybe {
    static some(value) {
        if (value === null || value === undefined) {
            throw new TypeError("Cannot wrap undefined or null with Some");
        }
        return new Some(value);
    }

    static none() {
        return new None();
    }

    static fromNullable(value) {
        if (value !== null && value !== undefined) {
            return Maybe.some(value);
        } else {
            return Maybe.none();
        }
    }

    get isNone() {
        return false;
    }

    get isSome() {
        return false;
    }
}

class Some extends Maybe {
    constructor(value) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    map(fn) {
        return Maybe.fromNullable(fn(this.value));
    }

    get isSome() {
        return true;
    }

    toString() {
        return `Some(${this.value})`;
    }
}

class None extends Maybe {
    map(fn) {
        return this;
    }

    get value() {
        throw new TypeError("Can't extract the value of a None.");
    }

    get isNone() {
        return true;
    }

    toString() {
        return 'None';
    }
}

export { Maybe, Some, None };
