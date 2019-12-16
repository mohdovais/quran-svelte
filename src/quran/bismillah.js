import { charCodesAt, fromCharCodes } from "../utils/char-codes.js";

export const bismillahCharCodes =
  "1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616";

export const bismillahCharCodesUthmani =
  "1576,1616,1587,1618,1605,1616,32,1649,1604,1604,1617,1614,1607,1616,32,1649,1604,1585,1617,1614,1581,1618,1605,1614,1648,1606,1616,32,1649,1604,1585,1617,1614,1581,1616,1610,1605,1616";

const bismillahRegExp = new RegExp(bismillahCharCodesUthmani, "g");

export function removeBismillah(str) {
  const charCodes = charCodesAt(str).replace(bismillahRegExp, "");
  return charCodes.length === 0 ? '' : fromCharCodes(charCodes);
}

export const arabicBismillah = (function() {
  return fromCharCodes(bismillahCharCodes);
})();

export const arabicBismillahUthmani = (function() {
  return fromCharCodes(bismillahCharCodesUthmani);
})();
