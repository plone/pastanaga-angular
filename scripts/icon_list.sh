#!/bin/sh

echo "Generate json list of glyphs"
python3 -c "import json; import xml.dom.minidom; print(json.dumps([el.getAttribute('id') for el in xml.dom.minidom.parseString(open('projects/pastanaga-angular/src/assets/glyphs-sprite.svg').read()).getElementsByTagName('symbol')]))" > projects/demo/src/assets/glyphs.json

echo "Generate typescript icon list"
touch projects/demo/src/assets/glyphs.ts
echo "export const ICONS = " > projects/demo/src/assets/glyphs.ts
cat projects/demo/src/assets/glyphs.json >> projects/demo/src/assets/glyphs.ts
echo ";" >> projects/demo/src/assets/glyphs.ts

echo "Remove glyphs.json"
rm projects/demo/src/assets/glyphs.json

echo "All good!"
