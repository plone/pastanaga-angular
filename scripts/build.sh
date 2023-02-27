#!/bin/sh
set -e

echo "Build Pastanaga library"
ng build pastanaga-angular --configuration production

echo "Copy README, LICENSE, styles and assets to dist/pastanaga-angular"
cp ./README.md ./LICENSE.md ./dist/pastanaga-angular
cp -r projects/pastanaga-angular/src/styles ./dist/pastanaga-angular/lib
cp -r ./projects/pastanaga-angular/src/assets ./dist/pastanaga-angular

echo "Done."
