'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class EditController extends Controller {
  async submitData() {
    const { ctx } = this;

    let { data, name, lang } = ctx.request.query;

    data = JSON.parse(data);
    lang = JSON.parse(lang);

    const obj = {};
    lang.forEach(item => {
      obj[item] = {};
      data.forEach(elem => {
        obj[item][elem.key] = elem[item];
      });
    });

    console.log('data: ', data, name);

    // ctx.set('Content-disposition', 'attachment; filename=1.json');
    ctx.attachment(`${name}.json`);
    ctx.set('Content-Type', 'application/octet-stream');

    // files文件夹里的json文件
    const array = fs.readdirSync(path.resolve('files'));
    console.log('array: ', array);

    const outPath = path.resolve('files', `${name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(obj, null, 2));

    ctx.body = fs.createReadStream(outPath);

  }
}

module.exports = EditController;
