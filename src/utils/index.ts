
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import ZeroPadding from "crypto-js/pad-zeropadding";
import { mode } from 'crypto-js';

const key = Utf8.parse("1234567890123456"); // 十六位十六进制数作为密钥
const iv = Utf8.parse("1234567890123456"); // 向量

export const Encrypt = (word: string) : string => {
  const srcs = Utf8.parse(word);
  const encrypted = AES.encrypt(srcs, key, {
    iv: iv,
    mode: mode.CBC,
    padding: ZeroPadding,
  });
  return Base64.stringify(encrypted.ciphertext);
};

export const Decrypt = (word: string) : string => {
  let base64 = Base64.parse(word);
  let src = Base64.stringify(base64);
  let decrypt = AES.decrypt(src, key, {
    iv: iv,
    mode: mode.CBC,
    padding: ZeroPadding
  });
  let decryptedStr = decrypt.toString(Utf8);
  return decryptedStr.toString();
};

export const isObject = (val: any) : boolean => typeof val === 'object' && val !== null;
export const isPlainObject = (val: any) : boolean => Object.prototype.toString.call(val) === '[object Object]';
export const isArray = Array.isArray;
export const isArrayHasContents = (val: any) : boolean => Boolean(isArray(val) && val.length);

interface ISortItem {
  [index: string]: string
}

export const sort = (list: [], key: string) : [] => {
  return list.sort((a: ISortItem, b: ISortItem) => {
    let first = a[key] ? Number(a[key]) : 0;
    let second = b[key] ? Number(b[key]) : 0;
    if (first < second) {
      return 1;
    } else if (first > second) {
      return -1;
    } else {
      return 0;
    }
  })
};
