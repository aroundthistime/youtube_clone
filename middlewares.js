import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'Yutube';
    res.locals.routes = routes;
    next();
};