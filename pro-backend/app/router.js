'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getInfo', controller.home.getInfo);
  router.get('/updateInfo', controller.home.updateInfo);

  router.get('/submitData', controller.edit.submitData);
};
