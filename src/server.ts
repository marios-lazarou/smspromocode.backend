import app from './app';

const server = app.listen(4000, 'localhost', () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get("app"),
        app.get("env")
    )
})

export default server;