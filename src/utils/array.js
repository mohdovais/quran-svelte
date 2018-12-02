export function flatShallow(array){
    return Array.prototype.concat.apply([], array);
}