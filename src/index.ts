import app from './app';

export async function startApp(): Promise<void> {
    app.log.info('Initializing application...');

    await app
        .listen(3000)
        .catch((err) => {
            app.log.error(err);
            process.exit(1);
        });
}

if (require.main === module) {
    startApp();
}
