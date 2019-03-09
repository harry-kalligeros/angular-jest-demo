const server = require('express-mock-server');
const faker = require('faker');
const { fake, seed } = faker;
const sources = [[{
	request: {
		method: 'GET',
		path: '/api/products'
	},
	response: function () {
		return {
			statusCode: 200,
			body: JSON.stringify(generateProducts())
		};
	}
}]];
let _products;

const productsSchema = {
	id: '{{random.number}}',
	name: '{{commerce.product}}',
	price: '{{commerce.price}}',
	vat: '23%'
};

function generateProducts() {
	if (!_products) {
		_products = generator(productsSchema);
	}
	return _products;
}



function generator(schema) {
	const i = 1;
	return (Array.from({ length: 10 }).map(
		() => Object.keys(schema).reduce((entity, key) => {
			entity[key] = fake(schema[key]);
			return entity;
		}, {}))
	);
}
// this is default configuration
const opt_serverConfig = {
	port: 8080,
	controlApiUrl: '/api/v1'
};

/**
 *  Return not strated Server instance
     function can be called are
        start
        close
 *  @param {Array} sources
 *  @param {?Object} opt_serverConfig
 *  @return {Server}
 */
// createServer(sources [, opt_serverConfig])

/**
 *  Return strated Server instance
     function can be called are
        start
        close
 *  @param {Array} sources
 *  @param {?Object} opt_serverConfig
 *  @return {Server}
 */
server.serverStart(sources, opt_serverConfig);
