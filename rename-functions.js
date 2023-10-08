const fs = require('fs-extra');
const path = 'dist/repaglas-web-frontend';

fs.readdirSync(path).forEach(file => {
  if (file.startsWith('main.') || file.startsWith('polyfills.') || file.startsWith('runtime.')) {
    const newName = file.replace(/[^\w.]/g, '_');
    fs.renameSync(`${path}/${file}`, `${path}/${newName}`);
  }
});
