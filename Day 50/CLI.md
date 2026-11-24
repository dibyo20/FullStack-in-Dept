   npm init -y
   npm i -D typescript
   npx tsc --init
   npm i express ...

   dev Dependencies(npm i -D ...):
   typescript
   tsx
   @types/node
   @types/express
   @types/cors
   @types/jsonwebtoken

    If you're in dev server: (use -> tsx watch src/server.ts)
        "dev": "tsx watch src/server.ts"

    For Production:
        Compile/build Command:
            "build": "tsc"
        After Compile Command:
            "start" : "node dist/index.js"










    tsconfig.json:
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "target": "esnext",
    "types": ["node"],

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}