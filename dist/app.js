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
import express from 'express';
import { inject, injectable } from 'inversify';
import { DITypes } from './DI.types.js';
let App = class App {
    logger;
    userController;
    exceptionFilter;
    app;
    port;
    server;
    constructor(logger, userController, exceptionFilter) {
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
        this.app = express();
        this.port = 8000;
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }
    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.info(`Server started on http://localhost:${this.port}`);
    }
};
App = __decorate([
    injectable(),
    __param(0, inject(DITypes.ILog)),
    __param(1, inject(DITypes.IUserController)),
    __param(2, inject(DITypes.IExceptionFilter)),
    __metadata("design:paramtypes", [Object, Function, Object])
], App);
export { App };
//# sourceMappingURL=app.js.map