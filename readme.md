# parcel alias
webpack alias for parcel

# config
need an .aliasrc.js config file in your root directory
```js
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    'src': resolve('src'),
    'assets': resolve('src/assets'),
    'components': resolve('src/components'),
    'pages': resolve('src/pages'),
    'store': resolve('src/store'),
    'api': resolve('src/api'),
    'common': resolve('src/common')
}
```
