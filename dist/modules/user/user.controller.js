import {} from 'express';
import { BaseController } from '../../common/base-controller/base.controller.js';
import { HttpError } from '../../common/errors/http-error.js';
export class UserController extends BaseController {
    constructor(logger) {
        super(logger);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                function: this.login,
            },
            {
                path: '/register',
                method: 'post',
                function: this.register,
            },
        ]);
    }
    login(req, res, next) {
        return res.status(200).json({ message: 'logged in' });
    }
    register(req, res, next) {
        // return res.status(200).json({ message: 'registered' });
        next(new HttpError(404, 'Ошибка регистрации повторите позже', 'UserController'));
    }
}
//# sourceMappingURL=user.controller.js.map