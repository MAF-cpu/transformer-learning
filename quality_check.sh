#!/bin/bash

# Transformer Learning Website Quality Check
HTML_FILE="index.html"
FAILED=0

echo "🔍 TRANSFORMER LEARNING WEBSITE QUALITY CHECK"
echo "============================================="

# 1. Lesson Count
LESSONS=$(grep -c '<div class="lesson"' "$HTML_FILE")
echo "✓ Lektionen: $LESSONS (mindestens 6 erforderlich)"
[ $LESSONS -lt 6 ] && FAILED=1

# 2. SVG Diagrams
SVGS=$(grep -c '<svg' "$HTML_FILE")
echo "✓ SVG-Diagramme: $SVGS"
[ $SVGS -lt $LESSONS ] && echo "⚠️  Nicht alle Lektionen haben Diagramme" && FAILED=1

# 3. Mobile Viewport
if grep -q 'viewport' "$HTML_FILE"; then
    echo "✓ Mobile Viewport Meta Tag: OK"
else
    echo "✗ Mobile Viewport Meta Tag: FEHLT"
    FAILED=1
fi

# 4. Dark Mode CSS
DARK_CSS=$(grep -c 'dark-mode' "$HTML_FILE")
echo "✓ Dark Mode CSS: $DARK_CSS Definitionen"
[ $DARK_CSS -lt 5 ] && echo "⚠️  Dark Mode könnte unvollständig sein" && FAILED=1

# 5. Media Queries
MEDIA=$(grep -c '@media' "$HTML_FILE")
echo "✓ Media Queries: $MEDIA (Responsive Design)"
[ $MEDIA -lt 2 ] && echo "⚠️  Zu wenig Media Queries" && FAILED=1

# 6. Accessibility - ARIA Labels
ARIA=$(grep -c 'aria-label' "$HTML_FILE")
echo "✓ ARIA Labels: $ARIA"
[ $ARIA -lt 5 ] && echo "⚠️  Wenige ARIA Labels" && FAILED=1

# 7. Content - Paragraphs
PARAS=$(grep -c '<p>' "$HTML_FILE")
echo "✓ Absätze (Inhalt): $PARAS"
[ $PARAS -lt 20 ] && echo "⚠️  Wenig Text-Inhalt" && FAILED=1

# 8. Code Examples
CODES=$(grep -c '<code>' "$HTML_FILE")
echo "✓ Code-Beispiele: $CODES"
[ $CODES -lt 3 ] && echo "⚠️  Wenige Code-Beispiele" && FAILED=1

# 9. Key Points Sections
KEYPTS=$(grep -c 'key-points' "$HTML_FILE")
echo "✓ Key-Points Sektionen: $KEYPTS"
[ $KEYPTS -lt 5 ] && echo "⚠️  Wenige Key-Points" && FAILED=1

# 10. HTML5 DOCTYPE
if grep -q '<!DOCTYPE html>' "$HTML_FILE"; then
    echo "✓ HTML5 DOCTYPE: OK"
else
    echo "✗ HTML5 DOCTYPE: FEHLT"
    FAILED=1
fi

# 11. Language Attribute
if grep -q '<html lang="de">' "$HTML_FILE"; then
    echo "✓ Sprache: Deutsch (DE)"
else
    echo "⚠️  Sprache nicht als Deutsch definiert"
fi

# 12. Navigation Links
NAV_LINKS=$(grep '<a href="#lesson' "$HTML_FILE" | wc -l)
echo "✓ Navigation Links: $NAV_LINKS"
[ $NAV_LINKS -ne $LESSONS ] && echo "⚠️  Navigation stimmt nicht mit Lektionen überein" && FAILED=1

# 13. JavaScript
if grep -q '<script>' "$HTML_FILE"; then
    echo "✓ JavaScript: Vorhanden (Theme Toggle, Smart Nav)"
else
    echo "⚠️  Kein JavaScript gefunden"
fi

echo ""
echo "============================================="
if [ $FAILED -eq 0 ]; then
    echo "✅ ALLE QUALITÄTSPRÜFUNGEN BESTANDEN"
    exit 0
else
    echo "⚠️  EINIGE PRÜFUNGEN FEHLGESCHLAGEN"
    exit 1
fi
