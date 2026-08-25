import { type Request, type Response, type NextFunction, Router } from 'express';
export interface IRoute {
    path: string;
    function: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
}
//# sourceMappingURL=route.interface.d.ts.map