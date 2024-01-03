import cryptojs from "crypto-js/aes"
import crypto_utf from "crypto-js/enc-utf8"

export function encrypt(content, key) {
    let utf8encoded = encodeURIComponent(content)
    return cryptojs.encrypt(utf8encoded, key).toString();
}

export function decrypt(content, key) {
    return decodeURIComponent(cryptojs.decrypt(content, key).toString(crypto_utf))
}

// export function generateKey(uuid, crypto) {
//     let utf8Encode = new TextEncoder();
//     let uuid_encode = utf8Encode.encode(encodeURIComponent(uuid))
//     let crypto_encode = utf8Encode.encode(encodeURIComponent(crypto))
//     function concatTypedArrays(a, b) { // a, b TypedArray of same type
//         var c = new (a.constructor)(a.length + b.length);
//         c.set(a, 0);
//         c.set(b, a.length);
//         return c;
//     }
//     let new_array = concatTypedArrays(uuid_encode, crypto_encode)
//     new_array = concatTypedArrays(new_array, concatTypedArrays(new_array, crypto_encode))
//     new_array = concatTypedArrays(new_array, concatTypedArrays(new_array, uuid_encode))
//     let final = ""
//     for (const bit of new_array) {
//         final += bit.toString()
//     }
//
//     function countCharacters(inputString) {
//         if (typeof inputString !== 'string' || inputString.length === 0) {
//             return "Invalid input";
//         }
//
//         let charCount = {};
//
//         // Count occurrences of each character
//         for (let char of inputString) {
//             if (charCount[char] === undefined) {
//                 charCount[char] = 1;
//             } else {
//                 charCount[char]++;
//             }
//         }
//
//         // Create a string with character counts
//         let resultString = '';
//         for (let char in charCount) {
//             resultString += `${char}`+(Math.random() + 1).toString(36).substring(11)+`${charCount[char]}`;
//         }
//
//         // Remove the trailing comma and space
//         resultString = resultString.slice(0, -2);
//
//         return resultString;
//     }
//
//     function shrinkString(inputString, targetBits) {
//         // Convert the string to binary representation
//         let binaryString = '';
//         for (let i = 0; i < inputString.length; i++) {
//             const binaryChar = inputString.charCodeAt(i).toString(2);
//             binaryString += '0'.repeat(8 - binaryChar.length) + binaryChar;
//         }
//
//         // Check if the input string is already within the target number of bits
//         if (binaryString.length <= targetBits) {
//             return inputString;
//         }
//
//         // Shrink the binary string to the target number of bits
//         const compressedBinary = binaryString.substring(0, targetBits);
//
//         // Convert the compressed binary string back to characters
//         let compressedString = '';
//         for (let i = 0; i < compressedBinary.length; i += 8) {
//             const binaryChar = compressedBinary.substring(i, i + 8);
//             compressedString += String.fromCharCode(parseInt(binaryChar, 2));
//         }
//
//         return compressedString;
//     }
//
//     return shrinkString(countCharacters(compressToBase64(compressToBase64(final))), 128)
// }
