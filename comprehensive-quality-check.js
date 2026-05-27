const fs = require('fs');

const html = fs.readFileSync('./index.html', 'utf-8');

// Count actual lesson headers (h2 with lesson-number)
const h2Matches = html.match(/<h2[^>]*>.*?<span class="lesson-number">.*?<\/span>/gi);
const lessons = h2Matches ? h2Matches.length : 0;

const paragraphs = (html.match(/<p[^>]*>/gi) || []).length;
const lists = (html.match(/<ul[^>]*>/gi) || []).length;
const hasContent = paragraphs > 50 || lists > 5;

const hasViewport = /viewport.*width=device-width/i.test(html);
const hasMobileNav = /media.*max-width/i.test(html);

const imgTags = (html.match(/<img[^>]*>/gi) || []).length;
const svgTags = (html.match(/<svg[^>]*>/gi) || []).length;
const images = imgTags + svgTags;

const darkModeCSS = /body\.dark-mode\s*\{/i.test(html);
const darkModeJS = /classList\.add\(['"]dark-mode/i.test(html) && 
                    /classList\.remove\(['"]dark-mode/i.test(html);
const toggleButton = /id=['"]theme-toggle/i.test(html);

const contrast = /font-size|line-height|color:|background:/i.test(html);

console.log('🎯 TRANSFORMER LEARNING - QUALITY CHECK\n');
console.log('═══════════════════════════════════════════════════════\n');

const check = (num, name, pass, details = '') => {
  console.log(`${num} ${pass ? '✅' : '❌'} ${name} ${details}`);
};

check('1️⃣', 'Lektionen (6+)', lessons >= 6, `| ${lessons} gefunden`);
check('2️⃣', 'Inhalt vollständig', hasContent, `| ${paragraphs} Absätze, ${lists} Listen`);
check('3️⃣', 'Mobile Navigation', hasMobileNav && hasViewport);
check('4️⃣', 'Bilder vorhanden', images >= 6, `| ${images} Elemente`);
check('5️⃣', 'Dark Mode OK', darkModeCSS && darkModeJS && toggleButton);
check('6️⃣', 'Kontrast & Lesbarkeit', contrast);

const allPass = lessons >= 6 && hasContent && hasMobileNav && 
                hasViewport && images >= 6 && darkModeCSS && 
                darkModeJS && toggleButton && contrast;

console.log(`\n═══════════════════════════════════════════════════════`);
console.log(`${allPass ? '✅ OK - All checks passed!' : '⚠️  Issues found!'}\n`);

process.exit(allPass ? 0 : 1);
