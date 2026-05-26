#!/bin/bash

echo "🔍 TRANSFORMER LEARNING WEBSITE - QUALITY CHECK"
echo "==============================================="
echo ""

# 1. Lektionen
echo "1️⃣ LEKTIONEN:"
lesson_count=$(grep -c 'class="lesson"' index.html)
echo "   Anzahl: $lesson_count (erwartet: 6+)"
[[ $lesson_count -ge 6 ]] && echo "   ✅ OK" || echo "   ❌ FEHLER"
echo ""

# 2. Inhalt
echo "2️⃣ INHALT & STRUKTUR:"
grep 'id="lesson' index.html | sed 's/.*id="\(.*\)".*/   - \1/'
echo ""

# 3. Bilder
echo "3️⃣ BILDER:"
img_count=$(grep -c '<img' index.html)
echo "   <img> Tags: $img_count"
[[ $img_count -gt 0 ]] && echo "   ✅ OK" || echo "   ⚠️  KEINE BILDER VORHANDEN"
echo ""

# 4. Mobile Navigation
echo "4️⃣ MOBILE SUPPORT:"
grep -q 'viewport' index.html && echo "   ✅ Viewport Meta Tag vorhanden"
grep -q '@media.*max-width.*768px' index.html && echo "   ✅ Mobile CSS vorhanden" || echo "   ❌ Mobile CSS fehlt"
echo ""

# 5. Dark Mode
echo "5️⃣ DARK MODE:"
dark_mode=$(grep -c '@media.*prefers-color-scheme.*dark' index.html)
echo "   Dark Mode CSS: $dark_mode"
[[ $dark_mode -gt 0 ]] && echo "   ✅ OK" || echo "   ❌ DARK MODE NICHT VORHANDEN"
echo ""

# 6. Kontrast
echo "6️⃣ KONTRAST & LESBARKEIT:"
echo "   Körper-Text: #e0e0e0 auf #1a0033"
echo "   ⚠️  Kontrast-Ratio überprüfung erforderlich"
echo ""

