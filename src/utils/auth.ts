import * as CryptoJS from "crypto-js";

export const generateAuth = (
  requestMethod: string,
  url: string,
  body: string,
  secret: string
): string => {
  const signStr: string = requestMethod + url + (body ? body: '') + secret;
  const sign: string = CryptoJS.MD5(signStr).toString();
  return sign;
};
