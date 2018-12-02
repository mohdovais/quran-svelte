export function curry() {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments);
    return function() {
        return args.reduce(function(params, fn) {
            return [fn.apply(null, params)];
        }, slice.call(arguments))[0];
    }
}