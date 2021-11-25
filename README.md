# Fresh Node.js Project Setup Guide
---
### Initializing the Project:

```bash
mkdir <project-name>
```

```bash
cd <project-name>
```

```bash
npm init -y
```

---

### Setting up Babel:
[Babel Setup:](https://babeljs.io/docs/en/usage)
[Babel Presets](https://babeljs.io/docs/en/presets/)
> With Frameworks like CRA or Next.js, Babel is usually deeply integrated already and needs no setup.

```bash
npm install -D @babel/core @babel/cli @babel/preset-env
```

- create a .babelrc / babel.config.json 
- insert:

```json
{
	"presets": [
		["@babel/preset-env", {
			"targets": {
				"node": "current",
				// other examples:
				//"chrome": "58", 
				//"ie": "11"
			}
			// additional options go here
		}]
		// additional presets example (can be without extra options)
		// "@babel/preset-typescript", "@babel/preset-react"
	],
	// if you want to add specific babel plugins not included in the preset
	"plugins": [
		//"@babel/plugin-proposal-class-properties",
		//"@babel/plugin-proposal-object-rest-spread"
		]
	}
```

---

### Setting up Nodemon:
```bash
npm i -g nodemon
```

```bash
npm i -D rimraf
```

- create nodemon.json file:
```json
{
	"ignore": [".git", "node_modules/**/node_modules", "build"],
 	"verbose": true,
	"runOnChangeOnly": false,
 	"watch": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
 	"env": {
 		"NODE_ENV": "development"
 	},
 	"ext": "js,jsx,ts,tsx,json"
}
```

- create npm scripts in the package.json:
```json
 "scripts": {
 	"build": "npx babel src --out-dir build --extensions '.ts,.tsx,.js,.jsx'",
 	"dev": "nodemon --exec npm run restart",
 	"restart": "rimraf dist && npm run build && npm start",
 	"start": "node build/index.js"
 },
```

---

### Setting up Typescript:

> Since Babel 7, it can be used for compiling instead of the TS Compiler. 
>  See: https://iamturns.com/typescript-babel/

```bash
npm install -D @babel/preset-typescript
```

> Babel supposedly does not type-check but it did for me on the sample project. 
> If it does not, the TS Compiler is needed for type-checking only:

- Babel can't Type-Check, so TSC is still needed:

```bash
npm install -D typescript
```

- add a script for type-checking to package.json:

```json
"scripts": {
	"check-types": "tsc"
}
```

- run "tsc -init" and configure it as follows: 

```json
{
 "compilerOptions": {
 "target": "esnext" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */,
 "allowJs": true /* Allow javascript files to be compiled. */,
 "noEmit": true /* Do not emit outputs. */,
 "strict": true /* Enable all strict type-checking options. */,
 "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
 "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
 "skipLibCheck": true /* Skip type checking of declaration files. */,
 "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
 },
 "include": ["src"]
}
```

---

### Setting up EsLint & Prettier

```bash
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
```

- for TS add: 

```bash
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- Airbnb config: 

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

- create **.prettierrc** file (additional rules at: https://prettier.io/docs/en/options.html):

```json 
{
 "singleQuote": true,
 "trailingComma": "es5",
 "semi": true,
 "tabWidth": 4
}
```

- create .eslintrc:

```bash
npm i -g eslint
```

```bash
eslint --init
```

- replace contents with:

```json
{
 	"env": {
 		"browser": true,
 		"es2021": true,
 		"node": true
 	},
 	"extends": [
 		"airbnb",
 		"prettier",
 		"plugin:node/recommended",
 		"plugin:@typescript-eslint/recommended"
 	],
 	"plugins": ["@typescript-eslint", "prettier"],
 	"rules": {}
}
```

---

### Utilizing different Environments:

[Environment Variables](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)

- set **NODE_ENV="development"** in .env file (default env)
- install dotenv package:

```bash
npm i dotenv
```

- choose different configurations depending on the environment:

```js
import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'production') {
	// eg. use different env variables for database, api keys, etc.
} else if (process.env.NODE_ENV === 'testing') {
	//
} else if (process.env.NODE_ENV === 'development') {
	//
}
```
- add node scripts. eg.: 
```json
 "scripts": {
 	"test": "NODE_ENV=testing jest --forceExit --detectOpenHandles  --silent",
 	"deploy": "NODE_ENV=production node build/index.js"
 },
```
