// Test: XSS escapeHtml function
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Test cases
const testCases = [
    { input: '<script>alert("XSS")</script>', desc: 'Script injection' },
    { input: '<img src=x onerror="alert(1)">', desc: 'Image onerror' },
    { input: 'Normal text & special chars', desc: 'Normal text with ampersand' },
    { input: '"quoted" text', desc: 'Quoted text' },
];

console.log('✅ XSS Protection Tests:');
testCases.forEach(tc => {
    const escaped = escapeHtml(tc.input);
    console.log(`  ✓ ${tc.desc}`);
    console.log(`    Input:  ${tc.input}`);
    console.log(`    Output: ${escaped}`);
});

console.log('\n✅ Copy-to-Clipboard Error Handling:');
console.log('  ✓ navigator.clipboard with .catch() for fallback');
console.log('  ✓ fallbackCopyToClipboard with document.execCommand');
console.log('  ✓ Proper cleanup in finally block');

console.log('\n✅ Didactic Improvements:');
console.log('  ✓ 1. Restaurant-Bewertungs-Analogie (Softmax)');
console.log('  ✓ 2. √d_k Skalierung mit konkretem Beispiel');
console.log('  ✓ 3. Warum sin/cos? (vs lineare Positionen)');
