"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPES = exports.OTP_EXPIRY_IN_MINUTES = exports.JWT_ACCESS_TOKEN_EXPIRY = exports.OTP_EMAIL_SUBJECT = void 0;
exports.OTP_EMAIL_SUBJECT = 'Your one time password for CompanyName';
exports.JWT_ACCESS_TOKEN_EXPIRY = '6h';
exports.OTP_EXPIRY_IN_MINUTES = 10;
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES[TOKEN_TYPES["REFRESH_TOKEN"] = 0] = "REFRESH_TOKEN";
})(TOKEN_TYPES || (exports.TOKEN_TYPES = TOKEN_TYPES = {}));
