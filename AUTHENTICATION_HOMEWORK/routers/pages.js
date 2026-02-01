import express from 'express';
import { ROUTES, MESSAGES, VIEW_NAMES } from '../common/constants/index.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

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
