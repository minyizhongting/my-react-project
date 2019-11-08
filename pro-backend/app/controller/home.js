'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getInfo() {
    const { ctx } = this;
    ctx.body = {
      status: 1,
      result: 'haha',
    };
  }

  async updateInfo() {
    const { ctx } = this;
    ctx.body = {
      status: 1,
      result: 'hahaha async',
    };
  }
}

module.exports = HomeController;
