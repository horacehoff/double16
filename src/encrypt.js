export function xorEncryptToHexWithLength(data, key) {
    const keyLength = key.length;
    let encryptedHex = '';

    for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % keyLength);
        const hexCharCode = charCode.toString(16).padStart(2, '0');
        encryptedHex += hexCharCode;
    }

    const dataLengthHex = data.length.toString(16).padStart(4, '0'); // 4-byte length
    encryptedHex += dataLengthHex;

    return encryptedHex;
}

export function xorDecryptFromHexWithLength(encryptedHex, key) {
    const keyLength = key.length;
    const dataLengthHex = encryptedHex.slice(-4);
    const dataLength = parseInt(dataLengthHex, 16);

    let decryptedData = '';

    for (let i = 0; i < encryptedHex.length - 4; i += 2) {
        const hexCharCode = encryptedHex.substr(i, 2);
        const charCode = parseInt(hexCharCode, 16) ^ key.charCodeAt((i / 2) % keyLength);
        decryptedData += String.fromCharCode(charCode);
    }

    // Ensure the decrypted data length matches the stored length
    if (decryptedData.length !== dataLength) {
        throw new Error('Invalid data length during decryption');
    }

    return decryptedData;
}