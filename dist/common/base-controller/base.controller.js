import { Router } from 'express';
export class BaseController {
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
}
//# sourceMappingURL=base.controller.js.map