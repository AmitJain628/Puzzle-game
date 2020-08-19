import core from 'express-serve-static-core';

export default (app: core.Express) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // tslint:disable-next-line:no-any
    app.use((err: any, _: core.Request, res: core.Response) => {
      res.status(err.status || 500);
      res.json(err);
    });
  } else {
    // tslint:disable-next-line:no-any
    app.use((err: any, _: core.Request, res: core.Response) => {
      res.status(err.status);
      delete err.details;
      res.json(err);
    });
  }
};
