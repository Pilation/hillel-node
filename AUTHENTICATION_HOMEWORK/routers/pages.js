import express from 'express';
import { ROUTES, STATUS_CODES, MESSAGES, VIEW_NAMES, USER_ROLES } from '../common/constants/index.js';

const router = express.Router();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect(ROUTES.LOGIN);
    }
};

// Middleware to check if user has admin role
const requireAdmin = (req, res, next) => {
    if (req.session.username && req.session.role === USER_ROLES.ADMIN) {
        next();
    } else {
        res.status(STATUS_CODES.FORBIDDEN).render(VIEW_NAMES.ERROR, { 
            message: MESSAGES.ACCESS_DENIED_ADMIN,
            error: { status: STATUS_CODES.FORBIDDEN }
        });
    }
};

router.get(ROUTES.HOME, (req, res) => {
    res.render(VIEW_NAMES.INDEX, { message: MESSAGES.MAIN_PAGE });
});

router.get(ROUTES.ABOUT, (req, res) => {
    res.render(VIEW_NAMES.ABOUT);
});

router.get(ROUTES.ONLY_USERS, requireAuth, (req, res) => {
    res.render(VIEW_NAMES.ONLY_USERS);
});

router.get(ROUTES.ADMIN, requireAdmin, (req, res) => {
    res.render(VIEW_NAMES.ADMIN);
});

export default router;
