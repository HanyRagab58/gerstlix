<p align="center">
  <img src="https://i.imgur.com/e6GVqge.png" alt="...">
</p>
<p align="center">Modern ES6+ API client for <a href="https://gerstlix.com/" target="_blank">Gerstlix.com</a></p>

## ⚙️ install guide
```bash
# NPM
npm i gerstlix
# YARN
yarn add gerstlix
# PNPM
pnpm add gerstlix
```

## 🧩 using guide
```js
// ESModule
import { Gerstlix } from 'gerstlix';
// CommonJS
const { Gerstlix } = require('gerstlix');

const client = new Gerstlix({ token: 'YOUR_API_TOKEN' });

client.getInfo(1)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err.message);
    });
```

| 📚 [Docs](https://mccormickk.github.io/gerstlix/) |
|---------------------------------------------------|
