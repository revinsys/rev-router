Rev-router
=====================
Простой маршрутизатор для приложений построенные на nodejs, без использования каких либо фреймворков.
На данный момент функционал реализован максимально просто. 

Использование
-----------------------------------
Подключите модуль в Вашем проекте
```js
	var router = require('rev-router');
```

Добавляете все необходимые пути отслеживания, например:
```js
	router.get('/', function(req, res){
		/* Исполняемый блок */
	});

	router.post('/', function(req, res){
		/* Исполняемый блок */
	});

	router.put('/', function(req, res){
		/* Исполняемый блок */
	});

	router.del('/', function(req, res){
		/* Исполняемый блок */
	});
```
Так же возможно добавление путей с "регулярными" выражениями, расширяющий объект req, пример:
```js
	router.get('/users/:id', function(req, res){
		console.log(req.params.id); // При переходе по пути /users/125 выведет в консоль 125
	});
```
После чего нужно запустить выполнение маршрутизатора
```js
	http.createServer(router.start).listen(4444);
```

Пример использования
-----------------------------------
```js
	var http = require('http'),
		router = require('rev-router');

		router.get('/', function(req, res){
				res.end('Home Page');
			});

		router.get('/users/:id', function(req, res){
				res.end('Welcom, user '+req.params.id);
			});

		http.createServer(function(req, res){
			    if (!router.start(req, res)){
	    		    res.end('Not Found!');
	    		}
			}).listen(4444);
```
