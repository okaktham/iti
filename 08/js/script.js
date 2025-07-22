const input = document.getElementById('decimalInput');
const binaryOut = document.getElementById('binaryOut');
const hexOut = document.getElementById('hexOut');

input.addEventListener('input', () => {
    const value = parseInt(input.value);
    if (isNaN(value)) {
    binaryOut.textContent = '-';
    hexOut.textContent = '-';
    return;
    }
    const bin = value.toString(2).padStart(8, '0'); 
    binaryOut.textContent = bin.replace(/(.{8})/g, '$1 ').trim();
    const hex = value.toString(16).toUpperCase();
    hexOut.textContent = hex.replace(/(.{2})/g, '$1 ').trim(); // groups hex in bytes
});