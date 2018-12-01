export function curry(){
    const args = arguments;
    return () => {
        return Array.prototype.reduce.call(args, (args, fn) =>{
            return fn.apply(args);
        }, Array.prototype.slice.call(arguments));
    }
}