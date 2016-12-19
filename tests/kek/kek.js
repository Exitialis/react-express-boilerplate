const request = require('supertest'),
    app = require(__dirname + '/../app');

describe('GET /', function () {
    it('should contain text "Тест"', function (done) {
        request(app)
            .get('home')
            .expect(/Тест/, done)
    })
})