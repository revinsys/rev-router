var Router = {
    router: [],
    get: get,
    post: post,
    put: put,
    del: del,
    start: start
}


/*
 * Добавляем пути и вызываемые функции в массив маршрутизации
 */
function get(uri, funct) {
    this.router['GET'+uri] = funct;
}

function post(uri, funct) {
    this.router['POST'+uri] = funct;
}

function put(uri, funct) {
    this.router['PUT'+uri] = funct;
}

function del(uri, funct) {
    this.router['DELETE'+uri] = funct;
}


/*
 * Выполнение роутинга по ключу с учетом регулярных выражений, расширение объекта req свойством params
 */
function start(req, res) {
    var query = req.method+req.url;

        for (var key in this.router) {
        	if (key != query) {
	            if (/:[A-Za-z0-9]*/.test(key)) {
	                var tmpvar = key.match(/:[A-Za-z0-9]*/g);
	                var result = key.replace( /:[A-Za-z0-9]*/g, '[A-Za-z0-9]*');
	                var tmpval = key.replace( /:[A-Za-z0-9]*/g, '([A-Za-z0-9]*)');

	                var expr = new RegExp(result, 'g');
	                var valexpr = new RegExp(tmpval);

	                var resul = expr.exec(query);
	                var valres = valexpr.exec(query);

	                if (resul == query) {

	                    req.params = {};
	                    for (var i=0; i<tmpvar.length; i++) {
	                        req.params[tmpvar[i].substring(1, tmpvar[i].length)] = valres[i+1];
	                    }
	                    this.router[key](req, res);
	                    return true;
	                }
	            } else {
	            	this.router[query](req, res);
			        return true;
	            }
        	}

        }
        return false;
}

module.exports = Router;
