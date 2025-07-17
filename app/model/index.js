// model/index.js
var signupModel = require('./signup');
var loginModel = require('./login');
var { changeUserModel, deleteAccountModel } = require('./settings');
var cvModel = require('./cvcreation');
var addPostModel = require('./addpost')
var walletModel = require('./wallet');

module.exports = {
    signupModel,
    loginModel,
    changeUserModel,
    deleteAccountModel,
    cvModel,
    addPostModel,
    walletModel
};