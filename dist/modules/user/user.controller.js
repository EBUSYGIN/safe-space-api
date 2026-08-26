var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import {} from 'express';
import { BaseController } from '../../common/base-controller/base.controller.js';
import { HttpError } from '../../common/errors/http-error.js';
import { inject, injectable } from 'inversify';
import { DITypes } from '../../DI.types.js';
let UserController = class UserController extends BaseController {
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
};
UserController = __decorate([
    injectable(),
    __param(0, inject(DITypes.ILog)),
    __metadata("design:paramtypes", [Object])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map