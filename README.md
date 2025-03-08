[![npm version][npm-version-src]][npm-version-href]  
[![npm downloads][npm-downloads-src]][npm-downloads-href]  
[![License][license-src]][license-href]

# @le-pepe/url-helper
*A lightweight and versatile URL helper for JavaScript & TypeScript*

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
If no base is provided, it defaults to `window.location.origin` in the browser.
```ts
// In the browser, if no base is provided, it defaults to window.location.origin:
console.log(URLHelper.join({ paths: ["users", "profile"] }));
// For example, on https://myapp.com, this results in: "https://myapp.com/users/profile"

// In Node.js, since window.location is unavailable, it returns just the path:
console.log(URLHelper.join({ paths: ["users", "profile"] }));
// Output: "/users/profile"

// Providing a base without a schema defaults to https://:
console.log(URLHelper.join({ base: "mywebsite.com", paths: ["dashboard", "settings"] }));
// Output: "https://mywebsite.com/dashboard/settings"

// Forcing HTTP:
console.log(URLHelper.join({ base: "mywebsite.com", paths: ["dashboard", "settings"] }, { forceHttp: true }));
// Output: "http://mywebsite.com/dashboard/settings"

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

## 🛠 Building
### Build the package:
```sh
npm run build  
```

### Watch mode for development:
```sh
npm run build:watch  
```

---  

## 📝 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

[npm-version-src]: https://img.shields.io/npm/v/@le-pepe/url-helper/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@le-pepe/url-helper

[npm-downloads-src]: https://img.shields.io/npm/dm/@le-pepe/url-helper.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@le-pepe/url-helper

[license-src]: https://img.shields.io/npm/l/@le-pepe/url-helper.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@le-pepe/url-helper  
