---
title: "Top 5 JavaScript Features from ES2022 You Should Know"
slug: "javascript-es2022-features"
date: "2024-08-04"
imageId: "blog-es2022"
description: "A look at some of the most useful features introduced in ES2022, including top-level await, private class fields, and the .at() method."
---

JavaScript is constantly evolving, and the ES2022 specification brought several exciting features that make the language more powerful and developer-friendly. Here are five highlights you can start using today.

### 1. Top-Level `await`
You can now use the `await` keyword at the top level of modules without needing an `async` function wrapper. This is incredibly useful for initializing applications or fetching configuration data.

```javascript
// config.js
const connection = await db.connect();
export default connection;
```

### 2. Private Class Fields and Methods
True privacy is finally here for classes. By prefixing a field or method with a hash (`#`), you can make it inaccessible from outside the class.

```javascript
class MyClass {
  #privateField = 'secret';

  getSecret() {
    return this.#privateField;
  }
}
const instance = new MyClass();
console.log(instance.#privateField); // SyntaxError
```

### 3. The `.at()` Method for Arrays
Accessing elements from the end of an array used to be clumsy (`arr[arr.length - 1]`). The `.at()` method provides a clean, Python-like syntax.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits.at(-1)); // 'cherry'
```

These are just a few of the updates that can help you write cleaner, more efficient JavaScript code.
