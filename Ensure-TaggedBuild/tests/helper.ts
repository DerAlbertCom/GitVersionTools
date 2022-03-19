interface Dict<T> {
    [key: string]: T | undefined;
}

let keys : Dict<string> = {};

function _getVariableKey(name: string) {
    if (!name) {
        throw new Error(`Parameter name is required`);
    }
    return name.replace(/\./g, '_').replace(/ /g, '_').toUpperCase();
}

export function setVariable(name: string, value: string) {
    const key = _getVariableKey(name);
    keys[key] = value;
    process.env[key] = value;
}

export function clearVariables() {
    for (const key of Object.keys(keys)) {
        console.log('clearKey', key);
        process.env[key] = undefined;
    }

    keys = {};
}