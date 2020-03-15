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
    }
  },
  complete: function(data, opts) {
    const cwd = $path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    if (data.name.match(/comp-/)){
      $fs.unlinkSync($path.resolve(cwd, 'util.js'));
      $fs.unlinkSync($path.resolve(cwd, 'index.js'));
    } else if (data.name.match(/util-/)) {
      $fs.unlinkSync($path.resolve(cwd, 'comp.js'));
      $fs.unlinkSync($path.resolve(cwd, 'index.js'));
    } else {
      $fs.unlinkSync($path.resolve(cwd, 'comp.js'));
      $fs.unlinkSync($path.resolve(cwd, 'util.js'));
    }
    opts.chalk.green('Done!');
  }
};