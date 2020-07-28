const $fs = require('fs');
const $path = require('path');
module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name, dash separated words, no space or punctuations"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "A Cocos Creator Module"
    },
    "author": {
      "type": "string",
      "label": "Author"
    },
    "lang": {
      "type": "list",
      "choices": ["js","ts"],
      "default": "ts",
    },
  },
  helpers: {
    camelize: function (str) {
      return str.replace(/^([a-zA-Z])|-([a-zA-Z])/g, function (match, p1, p2) {
        return (p1 || p2).toUpperCase()
      });
    }
  },
  complete: function(data, opts) {
    const cwd = $path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    if (data.name.match(/comp-/)){
      $fs.unlinkSync($path.resolve(cwd, 'util.js'));
      $fs.unlinkSync($path.resolve(cwd, 'index.js'));
      $fs.unlinkSync($path.resolve(cwd, `comp.${data.lang === 'js' ? 'ts' : 'js'}`));
      $fs.renameSync($path.resolve(cwd, `comp.${data.lang}`), $path.resolve(cwd, `${data.name}.${data.lang}`));
    } else if (data.name.match(/util-/)) {
      $fs.unlinkSync($path.resolve(cwd, 'comp.js'));
      $fs.unlinkSync($path.resolve(cwd, 'index.js'));
      $fs.renameSync($path.resolve(cwd, 'util.js'), $path.resolve(cwd, `${data.name}.js`));
    } else {
      $fs.unlinkSync($path.resolve(cwd, 'comp.js'));
      $fs.unlinkSync($path.resolve(cwd, 'util.js'));
      $fs.renameSync($path.resolve(cwd, 'index.js'), $path.resolve(cwd, `${data.name}.js`));
    }
    opts.chalk.green('Done!');
  }
};