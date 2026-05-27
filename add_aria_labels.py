#!/usr/bin/env python3
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define SVG aria labels for each lesson
svg_labels = [
    "Diagramm: RNN vs Transformer - Parallele vs sequenzielle Verarbeitung",
    "Diagramm: RNN sequenzieller Verarbeitung - Tokens werden nacheinander verarbeitet",
    "Diagramm: Attention Mechanism - Query, Key, Value Transformation",
    "Diagramm: Scaled Dot-Product Attention - Mathematische Formel mit Softmax",
    "Diagramm: Multi-Head Attention - Parallele Attention Heads mit Concatenation",
    "Diagramm: Positional Encoding - Sinusförmige Muster für Positionsinformation",
    "Diagramm: Transformer Block - Feed Forward Network und Attention zusammen",
    "Diagramm: Complete Transformer Architektur - Encoder-Decoder mit Cross-Attention",
    "Diagramm: Transformer Übersicht - Vollständige Architektur und Datenfluss"
]

# Find all SVGs and add ARIA attributes
svg_pattern = r'<svg width="100%" viewBox="[^"]*" xmlns="http://www.w3.org/2000/svg">'
svg_count = 0

def replace_svg(match):
    global svg_count
    if svg_count < len(svg_labels):
        svg_tag = match.group(0)
        # Check if it already has role attribute
        if 'role="img"' not in svg_tag:
            new_tag = svg_tag.replace('xmlns="http://www.w3.org/2000/svg">', 
                                     f'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="{svg_labels[svg_count]}">')
            svg_count += 1
            return new_tag
    return match.group(0)

new_content = re.sub(svg_pattern, replace_svg, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✅ Added ARIA labels to {svg_count} SVGs")
