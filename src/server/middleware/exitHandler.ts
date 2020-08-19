export default () => {
  process.stdin.resume();

  // tslint:disable-next-line:no-any
  function exitHandler(options: any, err: any): void {
    if (options.cleanup) {
      process.stdout.write('clean');
    }
    if (err) {
      process.stdout.write(err.stack);
    }
    if (options.exit) {
      process.exit();
    }
  }

  process.on('exit', exitHandler.bind(null, { cleanup: true }));

  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};
