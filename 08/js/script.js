'use strict';

const input = document.getElementById('decimalInput');
const binaryOut = document.getElementById('binaryOut');
const hexOut = document.getElementById('hexOut');
let conversionCount = 0;

const formatBinary = (binary) => {
    const padded = binary.padStart(8, '0');
    return padded.replace(/(.{8})/g, '$1 ').trim();
};

function formatHex(hex) {
    return hex.replace(/(.{2})/g, '$1 ').trim();
}

function clearOutputs() {
    binaryOut.textContent = '-';
    hexOut.textContent = '-';
    binaryOut.style.color = '#fff';
    hexOut.style.color = '#fff';
}

function convertNumber(value) {
    const num = parseInt(value);

    if (isNaN(num) || value === '') {
        clearOutputs();
        return;
    }

    const binary = num.toString(2);
    const hex = num.toString(16).toUpperCase();

    binaryOut.textContent = formatBinary(binary);
    hexOut.textContent = formatHex(hex);

    binaryOut.style.color = '#4CAF50';
    hexOut.style.color = '#4CAF50';

    conversionCount++;
    console.log(`Conversion #${conversionCount}: ${num} → Binary: ${binary}, Hex: ${hex}`);
}

input.addEventListener('input', function(e) {
    convertNumber(e.target.value);
});