export function hasOwnProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
}

function extend(obj, props) {
    for (let i in props) obj[i] = props[i];
    return obj;
}

function _assign() {
    const args = arguments;
    var target = args[0];

    for (let i = 1, l = args.length; i < l; i++) {
        target = extend(target, args[i]);
    }

    return target;
}

export const assign = Object.assign || _assign;