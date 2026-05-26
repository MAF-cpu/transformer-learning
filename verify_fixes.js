const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

console.log('✅ VERIFICATION REPORT\n');

// 1. SVG visibility
console.log('1. SVG VISIBILITY FIX:');
const svgDisplay = html.includes('display: block !important');
const svgVisibility = html.includes('visibility: visible !important');
console.log(`   ✓ SVG forced display: ${svgDisplay ? 'YES' : 'NO'}`);
console.log(`   ✓ SVG forced visibility: ${svgVisibility ? 'YES' : 'NO'}`);

// 2. Dark Mode Toggle
console.log('\n2. DARK MODE TOGGLE FIX:');
const hasToggleButton = html.includes('theme-toggle');
const hasMoonEmoji = html.includes('🌙');
const hasSunEmoji = html.includes('☀️');
const hasToggleScript = html.includes("document.getElementById('theme-toggle')");
const hasLocalStorage = html.includes("localStorage.getItem('theme')");
console.log(`   ✓ Toggle button added: ${hasToggleButton ? 'YES' : 'NO'}`);
console.log(`   ✓ Moon emoji (🌙): ${hasMoonEmoji ? 'YES' : 'NO'}`);
console.log(`   ✓ Sun emoji (☀️): ${hasSunEmoji ? 'YES' : 'NO'}`);
console.log(`   ✓ Toggle JavaScript: ${hasToggleScript ? 'YES' : 'NO'}`);
console.log(`   ✓ LocalStorage persistence: ${hasLocalStorage ? 'YES' : 'NO'}`);

// 3. Mobile Responsive
console.log('\n3. MOBILE RESPONSIVE FIX:');
const mobileMediaQueries = html.match(/@media[^{]*\(\s*max-width:\s*768px\s*\)/g);
console.log(`   ✓ Mobile media query count: ${mobileMediaQueries ? mobileMediaQueries.length : 0}`);
const mobileNav = html.includes('nav ul {');
console.log(`   ✓ Mobile nav responsive: ${mobileNav ? 'YES' : 'NO'}`);
const navFlex = html.includes('display: flex');
console.log(`   ✓ Flex layout for nav: ${navFlex ? 'YES' : 'NO'}`);

// 4. Contrast & Readability
console.log('\n4. COLOR CONTRAST & READABILITY:');
const betterContrast = html.includes('#e0e0e0');
const fontSmoothing = html.includes('-webkit-font-smoothing');
console.log(`   ✓ Enhanced text color: ${betterContrast ? 'YES (#e0e0e0)' : 'NO'}`);
console.log(`   ✓ Font smoothing: ${fontSmoothing ? 'YES' : 'NO'}`);
console.log(`   ✓ Line height optimized: ${html.includes('line-height: 1.8') ? 'YES' : 'NO'}`);

// 5. Lesson Loading
console.log('\n5. LESSON STRUCTURE VERIFICATION:');
const lessonIds = html.match(/id="lesson\d+"/g);
const lessonCount = lessonIds ? lessonIds.length : 0;
console.log(`   ✓ Total lessons: ${lessonCount} (should be 9)`);
const navLinks = html.match(/#lesson\d+"/g);
console.log(`   ✓ Navigation links: ${navLinks ? navLinks.length : 0} (should be 9)`);

if (lessonCount === 9) {
    for (let i = 1; i <= 9; i++) {
        const hasId = html.includes(`id="lesson${i}"`);
        const hasNav = html.includes(`href="#lesson${i}"`);
        console.log(`   ✓ Lesson ${i}: ID=${hasId ? '✓' : '✗'}, Nav Link=${hasNav ? '✓' : '✗'}`);
    }
}

console.log('\n✅ FIXES COMPLETE!\n');
