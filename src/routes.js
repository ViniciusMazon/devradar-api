const { Router } = require('express');
const PingController = require('./controllers/PingController');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Test route
routes.get('/ping', PingController.index);
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);
module.exports = routes;
