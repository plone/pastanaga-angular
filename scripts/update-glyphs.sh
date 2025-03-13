#!/bin/sh

echo "Generate sprite from glyphs folder"
python3 ./scripts/generate-sprite.py > ./projects/ngx-pastanaga/src/assets/glyphs-sprite.svg
cp ./projects/ngx-pastanaga/src/assets/glyphs-sprite.svg ./projects/documentation/public/assets

echo "Generate json list of glyphs"
python3 -c "import json; import xml.dom.minidom; print(json.dumps([el.getAttribute('id') for el in xml.dom.minidom.parseString(open('projects/ngx-pastanaga/src/assets/glyphs-sprite.svg').read()).getElementsByTagName('symbol')]))" > projects/documentation/public/assets/glyphs.json

echo "Generate typescript icon list"
touch projects/documentation/public/assets/glyphs.ts
echo "export const ICONS = " > projects/documentation/public/assets/glyphs.ts
cat projects/documentation/public/assets/glyphs.json >> projects/documentation/public/assets/glyphs.ts
echo ";" >> projects/documentation/public/assets/glyphs.ts

echo "Remove glyphs.json"
rm projects/documentation/public/assets/glyphs.json

echo "All good!"
