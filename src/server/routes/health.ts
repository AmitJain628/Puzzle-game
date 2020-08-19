import express from 'express';
import core from 'express-serve-static-core';

const router = express.Router();

router.route('/').get((_: core.Request, res: core.Response) => {
  return res.sendStatus(200);
});

export default router;
