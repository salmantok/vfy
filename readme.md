# vfy

> `vfy` alat sederhana untuk menguji output menggunakan `assert`.

## Instalasi

```bash
npm install vfy
```

## Penggunaan

```js
import { test } from 'vfy';

function add(a, b) {
  return a + b;
}
const result = add(2, 3);
console.log(result);

test([5]);
```
