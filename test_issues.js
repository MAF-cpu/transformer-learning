// Test script to identify issues in the HTML

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

console.log('=== ISSUE DETECTION ===\n');

// Issue 1: SVG visibility
console.log('1. SVG DISPLAY CHECK:');
const svgMatch = html.match(/<svg[^>]*>/g);
console.log(`   - Found ${svgMatch ? svgMatch.length : 0} SVG elements`);
const displayNoneInSvg = html.match(/svg[^{]*\{[^}]*display\s*:\s*none/gi);
console.log(`   - SVG with display:none found: ${displayNoneInSvg ? 'YES' : 'NO'}`);

// Issue 2: Dark Mode Toggle
console.log('\n2. DARK MODE TOGGLE:');
const darkModeToggle = html.includes('dark-mode') || html.includes('theme-toggle') || html.includes('moon') || html.includes('sun');
const toggleButton = html.match(/button[^>]*toggle/gi);
console.log(`   - Dark mode toggle found: ${darkModeToggle ? 'YES' : 'NO'}`);
console.log(`   - Toggle button element: ${toggleButton ? 'YES' : 'NO'}`);
console.log(`   - Sun/Moon emoji in HTML: ${html.includes('🌙') || html.includes('☀️') ? 'YES' : 'NO'}`);

// Issue 3: Mobile Responsive Check
console.log('\n3. MOBILE RESPONSIVE:');
const hasViewport = html.includes('viewport');
const mobileMediaQueries = (html.match(/@media[^{]*max-width[^}]*}/g) || []).length;
console.log(`   - Viewport meta tag: ${hasViewport ? 'YES' : 'NO'}`);
console.log(`   - Mobile media queries: ${mobileMediaQueries}`);

// Issue 4: Contrast & Readability
console.log('\n4. COLOR CONTRAST:');
const colors = html.match(/(color|background):\s*#?[\da-f]{3,6}/gi);
console.log(`   - Color properties found: ${colors ? colors.length : 0}`);
console.log(`   - Light text on dark bg likely OK (need manual check)`);

// Issue 5: Lesson Loading
console.log('\n5. LESSON STRUCTURE:');
const lessonDivs = html.match(/<div[^>]*class="lesson"[^>]*>/g);
console.log(`   - Lesson divs found: ${lessonDivs ? lessonDivs.length : 0}`);
const lessonIds = html.match(/id="lesson\d+"/g);
console.log(`   - Lesson IDs (should be 9): ${lessonIds ? lessonIds.length : 0}`);
const navLinks = html.match(/#lesson\d+/g);
console.log(`   - Navigation links to lessons: ${navLinks ? navLinks.length : 0}`);

console.log('\n=== END DIAGNOSIS ===');
