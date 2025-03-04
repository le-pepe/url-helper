# @le-pepe/url-helper
*A lightweight and versatile URL helper for JavaScript & TypeScript*

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![NPM Version](https://img.shields.io/npm/v/@le-pepe/url-helper.svg)](https://www.npmjs.com/package/@le-pepe/url-helper)
[![npm downloads][npm-downloads-src]][npm-downloads-href]

## 🚀 Features
✅ **Parse, build, join, and normalize URLs**  
✅ **Query parameter manipulation**  
✅ **Force HTTP or HTTPS with priority rules**  
✅ **Works in both Node.js & browser environments**  
✅ **Compatible with React, Vue, Astro, and more**

---

## 📦 Installation
Install via **npm** or **yarn**:
```sh
npm install @le-pepe/url-helper
# or
yarn add @le-pepe/url-helper
```

---

## 🔧 Usage

### Importing
```ts
import URLHelper from "@le-pepe/url-helper"; // ESM
// or
const URLHelper = require("@le-pepe/url-helper"); // CommonJS
```

---

### 🌐 Parsing URLs
Extract components from a URL.
```ts
const parsed = URLHelper.parse("example.com", { forceHttps: true });
console.log(parsed);
// Output:
// {
//   protocol: "https:",
//   host: "example.com",
//   pathname: "/",
//   search: "",
//   hash: "",
//   params: {}
// }
```

---

### 🔗 Building URLs
Construct a URL from its components.
```ts
const url = URLHelper.build({ host: "example.com", pathname: "/path" }, { forceHttp: true });
console.log(url); // "http://example.com/path"
```

---

### 📂 Joining Paths
Join a base URL with multiple segments.
```ts
const fullUrl = URLHelper.join("https://example.com/base", "subpath", "file.html");
console.log(fullUrl); // "https://example.com/base/subpath/file.html"
```

---

### 🛠 Normalizing URLs
Removes redundant `.` and `..` segments.
```ts
const normalized = URLHelper.normalize("https://example.com/a/./b/../c");
console.log(normalized); // "https://example.com/a/c"
```

---

### 🔍 Modifying Query Parameters
Easily add or update query parameters.
```ts
const updatedUrl = URLHelper.setQueryParams("https://example.com", { foo: "bar", baz: "123" });
console.log(updatedUrl); // "https://example.com/?foo=bar&baz=123"
```

---

## ⚙️ Options
All functions accept an optional configuration object:

| Option       | Type    | Default | Description                                      |
|-------------|--------|---------|--------------------------------------------------|
| `forceHttps` | boolean | `false` | Forces `https://`, overriding `forceHttp`. |
| `forceHttp`  | boolean | `false` | Forces `http://`, ignored if `forceHttps` is `true`. |

---

## 🛠 Building & Testing
### Build the package:
```sh
npm run build
```

### Watch mode for development:
```sh
npm run build:watch
```

### Run tests:
TO DO: Implement testing

---

## 📝 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  
[npm-downloads-src]: https://img.shields.io/npm/dm/@le-pepe/url-helper.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@le-pepe/url-helper
