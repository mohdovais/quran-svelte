import {
    charCodesAt,
    charCodesFrom
} from './../char-codes';

export const bismillahCharCodes = '1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616';

const bismillahRegExp = new RegExp(`^(${bismillahCharCodes}(,32)?(,)?)(.*)`, '');

function executeRegExp(str) {
    return bismillahRegExp.exec(charCodesAt(str)) || [];
}

function doCharCodeFrom(str) {
    return str ? charCodesFrom(str) : '';
}

export function removeBismillah(str) {
    return doCharCodeFrom(executeRegExp(str)[4]) || str;
}

export const arabicBismillah = (function(){
    return charCodesFrom(bismillahCharCodes);
}());
