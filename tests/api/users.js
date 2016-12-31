import test from 'ava';
import request from 'supertest';
import app from '../../app';

test.cb('GET /api/users/ must return list of users', t => {
    request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            t.falsy(err);
            t.is(res.body.user, 'Exitialis');
            t.end();
        })
});
