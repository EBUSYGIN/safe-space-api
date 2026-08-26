var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from 'express';
import { injectable } from 'inversify';
let BaseController = class BaseController {
    logger;
    _router;
    constructor(logger) {
        this.logger = logger;
        this._router = Router();
    }
    get router() {
        return this._router;
    }
    sendError(res, code, error) {
        res.status(code).json(error);
    }
    sendSuccess(res, code, info) {
        res.status(code).json(info);
    }
    bindRoutes(routes) {
        for (const route of routes) {
            this.logger.info(`[${route.method}] ${route.path}`);
            this._router[route.method](route.path, route.function.bind(this));
        }
    }
};
BaseController = __decorate([
    injectable(),
    __metadata("design:paramtypes", [Object])
], BaseController);
export { BaseController };
//# sourceMappingURL=base.controller.js.map