import urlParser from 'url';

class Router {

    /**
     * Приложение, в котором регистрируем маршрут.
     *
     * @type {Object}
     */
    app = null;

    /**
     * Url маршрута.
     *
     * @type {string}
     */
    url = '';

    /**
     * Массив фильтров, которые применяются к маршруту.
     *
     * @type {array}
     */
    middlewares = [];

    /**
     * Массив маршрутов.
     *
     * @type {Array}
     */
    routes = [];

    constructor(app) {
        this.app = app;
    }

    /**
     * Создать группу маршрутов.
     *
     * @param prefix
     * @param middlewares
     * @param callback
     */
    group(prefix, middlewares = [], callback) {
        let router = new Router(this.app);

        let url = this.url + '/' + prefix;

        url = urlParser.parse(url);

        //Записываем дочернему роутеру ссылку префикс на его маршруты
        router.url = urlParser.format(url);

        middlewares.forEach(item => {
            router.middlewares.push(item);
        });

        router.middlewares.concat(this.middlewares);

        callback(router);
    }

    get(path, action) {
        this.registerRouteInApp('get', path, action)
    }

    post(path, action) {
        this.registerRouteInApp('post', path, action)
    }

    put(path, action) {
        this.registerRouteInApp('put', path, action)
    }

    del(path, action) {
        this.registerRouteInApp('delete', path, action)
    }

    registerRouteInApp(method, path, action) {
        this.routes[method][path] = action;

        this.app[method](path, action);
    }

    getUrl() {
        return this.url;
    }

}

export default Router;