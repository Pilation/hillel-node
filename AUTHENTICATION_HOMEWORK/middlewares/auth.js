import { ROUTES, STATUS_CODES, MESSAGES, VIEW_NAMES, USER_ROLES } from '../common/constants/index.js';

// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect(ROUTES.LOGIN);
    }
};

// Middleware to check if user has admin role
export const requireAdmin = (req, res, next) => {
    if (req.session.username && req.session.role === USER_ROLES.ADMIN) {
        next();
    } else {
        res.status(STATUS_CODES.FORBIDDEN).render(VIEW_NAMES.ERROR, { 
            message: MESSAGES.ACCESS_DENIED_ADMIN,
            error: { status: STATUS_CODES.FORBIDDEN }
        });
    }
};
