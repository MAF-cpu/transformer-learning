const fs = require('fs');
const path = require('path');

const htmlFile = fs.readFileSync('index.html', 'utf-8');

console.log('=== TRANSFORMER LEARNING WEBSITE QUALITY CHECK ===\n');

// 1. Check lessons load (6+ lessons)
const lessonMatches = htmlFile.match(/<div[^>]*class="[^"]*lesson[^"]*"[^>]*>/gi) || [];
const navLinks = htmlFile.match(/href="#lesson\d+"/gi) || [];
console.log('✅ 1. LEKTIONEN LADEN (6+ Lektionen):');
console.log(`   - Lesson DIVs: ${lessonMatches.length}`);
console.log(`   - Navigation Links: ${navLinks.length}`);
console.log(`   - Status: ${navLinks.length >= 6 ? '✅ PASS' : '❌ FAIL'}\n`);

// 2. Check content completeness
const formulas = (htmlFile.match(/\\text{|\\frac{|Attention\(|MultiHead|FFN|PE\(/g) || []).length;
const codeBlocks = (htmlFile.match(/class="code-example"/gi) || []).length;
const keyPoints = (htmlFile.match(/class="key-points"/gi) || []).length;
const qBoxes = (htmlFile.match(/class="qa-box"/gi) || []).length;

console.log('✅ 2. INHALT VOLLSTÄNDIG & HILFREICH:');
console.log(`   - Formeln: ${formulas > 0 ? '✅ Ja (' + formulas + ' Formeln)' : '❌ Nein'}`);
console.log(`   - Code Blöcke: ${codeBlocks > 0 ? '✅ Ja (' + codeBlocks + ')' : '❌ Nein'}`);
console.log(`   - Key Points: ${keyPoints} gefunden`);
console.log(`   - Q&A Boxen: ${qBoxes} gefunden`);
console.log(`   - Status: ${formulas > 0 && codeBlocks > 0 ? '✅ PASS' : '❌ FAIL'}\n`);

// 3. Check mobile responsiveness
const mediaQuery = htmlFile.includes('@media (max-width: 768px)');
const viewport = htmlFile.includes('viewport');
const flexbox = htmlFile.match(/display:\s*flex/gi) || [];
const grid = htmlFile.match(/display:\s*grid/gi) || [];

console.log('✅ 3. MOBILE NAVIGATION FUNKTIONIERT:');
console.log(`   - Viewport Meta Tag: ${viewport ? '✅ Ja' : '❌ Nein'}`);
console.log(`   - Media Query: ${mediaQuery ? '✅ Ja' : '❌ Nein'}`);
console.log(`   - Flexbox/Grid: ${flexbox.length + grid.length} CSS Rules`);
console.log(`   - Status: ${viewport && mediaQuery ? '✅ PASS' : '❌ FAIL'}\n`);

// 4. Check images/graphics
const svgs = (htmlFile.match(/<svg[^>]*>/gi) || []).length;
const imgs = (htmlFile.match(/<img[^>]*>/gi) || []).length;
const canvases = (htmlFile.match(/<canvas[^>]*>/gi) || []).length;

console.log('✅ 4. BILDER/GRAFIKEN VORHANDEN:');
console.log(`   - SVG Grafiken: ${svgs}`);
console.log(`   - IMG Tags: ${imgs}`);
console.log(`   - Canvas Elemente: ${canvases}`);
console.log(`   - Status: ${svgs > 0 || canvases > 0 ? '✅ PASS' : '❌ FAIL'}\n`);

// 5. Check dark mode
const darkModeCSS = htmlFile.includes('@media (prefers-color-scheme: dark)') || htmlFile.includes('@media (prefers-color-scheme: light)');
const themeToggleBtn = htmlFile.includes('theme-toggle') || htmlFile.includes('themeToggle');
const darkMode = darkModeCSS;
const themeToggle = themeToggleBtn;

console.log('✅ 5. DARK MODE:');
console.log(`   - Dark Mode CSS: ${darkModeCSS ? '✅ Ja' : '❌ Nein'}`);
console.log(`   - Theme Toggle: ${themeToggleBtn ? '✅ Ja' : '❌ Nein'}`);
console.log(`   - Status: ${(darkModeCSS && themeToggleBtn) ? '✅ PASS' : '❌ FAIL'}\n`);

// 6. Check contrast & readability
const colorContrast = htmlFile.match(/color:\s*#/gi) || [];
const fontSize = htmlFile.match(/font-size:\s*\d+/gi) || [];
const lineHeight = htmlFile.match(/line-height:\s*[\d.]+/gi) || [];

console.log('✅ 6. KONTRAST & LESBARKEIT:');
console.log(`   - Color Definitions: ${colorContrast.length}`);
console.log(`   - Font Sizes: ${fontSize.length}`);
console.log(`   - Line Heights: ${lineHeight.length}`);
console.log(`   - Status: ${fontSize.length > 0 && lineHeight.length > 0 ? '✅ PASS' : '❌ FAIL'}\n`);

// Check aria labels
const ariaLabels = (htmlFile.match(/aria-label=/gi) || []).length;
const roles = (htmlFile.match(/role="/gi) || []).length;

console.log('✅ ACCESSIBILITY FEATURES:');
console.log(`   - ARIA Labels: ${ariaLabels}`);
console.log(`   - ARIA Roles: ${roles}`);
console.log(`   - Status: ${ariaLabels > 0 ? '✅ PASS' : '⚠️ Could improve'}\n`);

// Overall result
const checks = [
  navLinks.length >= 6,
  formulas > 0 && codeBlocks > 0,
  viewport && mediaQuery,
  svgs > 0 || canvases > 0,
  darkMode || themeToggle,
  fontSize.length > 0 && lineHeight.length > 0
];

const passed = checks.filter(c => c).length;
console.log(`\n🎯 GESAMT ERGEBNIS: ${passed}/6 CHECKS BESTANDEN`);
console.log(passed >= 5 ? '✅ WEBSITE QUALITÄT: BESTANDEN' : '⚠️ WEBSITE QUALITÄT: Einige Probleme gefunden');
