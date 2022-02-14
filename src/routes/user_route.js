'use strict';
module.exports = function (app) {
  var userController = require('../controllers/user_controller');

  app.route('/sendNotification').get(userController.sendNotification);

  app.route('/sendNotification').post(userController.sendNotification);

  app.route('/user/login').post(userController.userLogin);

  app.route('/banner/list').get(userController.bannerList);

  app.route('/product/list').get(userController.productList);

  app.route('/user/list').get(userController.userList);

  // app.route('/user/find').post(userController.userFind);

  // app.route('/user/add').post(userController.userAdd);

  // app.route('/user/update').post(userController.userUpdate);


  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};