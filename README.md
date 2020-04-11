# Type Script App

This is to demonstrate the importance of utilizing compiler `strict` type checking options to 
capture programming error at compile-time.

`DemoNullSafety.ts` is an example to demonstrate how to achieve `null-safety`.
`DemoTypeSafety.ts` is an example to demonstrate how to achieve `type-safety`.

### DemoNullSafety.ts
##### Compile (transpile .ts files into .js files):
```sh
npx tsc --strictNullChecks DemoNullSafety.ts
```

##### Run
```sh
node DemoNullSafety.js
```

<br/>

### DemoTypeSafety.ts

##### Compile (transpile .ts files into .js files):
```sh
npx tsc --strictNullChecks --noImplicitAny DemoTypeSafety.ts 
```

##### Compile with all strict type-checking
```sh
npx tsc --strictNullChecks --noImplicitAny --strict DemoTypeSafety.ts
```

##### Run 
```sh
node DemoTypeSafety.js
```

<br/>

## Reference:
- [Transpile TypeScript into JavaScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_transpile-typescript-into-javascript)