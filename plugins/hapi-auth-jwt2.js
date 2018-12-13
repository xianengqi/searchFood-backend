const config = require('../config');

const validate = (decode, request, callback) => {
  let error;
  const { userId } = decoded;
  if (!userId) {
    return callback(error, false, userId);
  }
  const credentials = {
    userId,
  };
  // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
  return callback(error, true, credentials);
};

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    // 需要自行在 config/index.js 中添加 jwtSecret 的配置，并且通过 process.env.JWT_SECRET 来进行 .git 版本库外的管理。
    key: config.jwtSecret,
    validateFunc: validate,
  });
  server.auth.default('jwt');
};