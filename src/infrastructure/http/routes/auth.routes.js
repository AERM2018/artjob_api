const authController = require("../../../adapters/auth.controller");

const authRouter = (router) => {
    const controller = authController()
    router.post('/auth/login', controller.login);
}
module.exports = authRouter;