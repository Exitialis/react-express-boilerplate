import request from 'supertest';
import app from '../../app';

describe('/api/users endpoint', () => {
    it('GET must return list of users', done => {
        request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(err).toBeFalsy();
                expect(res.body.user).toBe('Exitialis');
                done();
            })
    });

    it('POST must create a new user', done => {
        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send({ user: 'Exitialis' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(err).toBeFalsy();
                expect(res.body.user).toBe('Exitialis');
                done();
            })
    });
});

