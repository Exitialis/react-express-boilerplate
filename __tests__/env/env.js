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

describe('environment loader', () => {
    beforeAll(() => {
        fs.writeFile(envPath, env, (err) => {
            if (err) throw err;
            loadENV({ path: envPath, verbose: true});
        });
    });

    it('should load enviroment variables from file', () => {
        expect(process.env.DB_USER).toBe('env');
        expect(process.env.NODE_ENV).toBe('env-test');
    });

    afterAll(() => {
        fs.unlink(envPath, (err) => {
            if (err) throw err;
        });
    });
});

/*test.skip('Database config should coincide with env', t => {
    console.log(db.local);
    t.is(db.local.username, 'env');
    t.is(db.local.host, 'env-host');
    t.is(db.local.password, 'env-pass');
    t.is(db.local.name, 'env-base');
});*/

/*test.after.always.cb(t => {
    fs.unlink(envPath, (err) => {
        if (err) throw err;
        t.end();
    });
});*/
