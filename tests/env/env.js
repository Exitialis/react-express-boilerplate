import test from 'ava';
import { loadENV } from '../../app/helpers';
import fs from 'fs';
import db from '../../config/db';

let env = `
NODE_ENV=env-test
DB_USER=env
DB_HOST=env-host
DB_PASSWORD=env-pass
DB_NAME=env-base
`;

const envPath = 'tests/env/.env';

test.before.cb(t => {
    fs.writeFile(envPath, env, (err) => {
        if (err) throw err;
        loadENV({ path: envPath, verbose: true});
        t.end();
    });
});

test('Enviroment file must correctly readed', t => {
    t.is(process.env.DB_USER, 'env');
    t.is(process.env.NODE_ENV, 'env-test');
});

test.skip('Database config should coincide with env', t => {
    console.log(db.local);
    t.is(db.local.username, 'env');
    t.is(db.local.host, 'env-host');
    t.is(db.local.password, 'env-pass');
    t.is(db.local.name, 'env-base');
});

test.after.always.cb(t => {
    fs.unlink(envPath, (err) => {
        if (err) throw err;
        t.end();
    });
});
