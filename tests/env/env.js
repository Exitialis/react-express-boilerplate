import { loadENV } from '../../app/helpers';
import fs from 'fs';
import path from 'path';

let env = `
NODE_ENV=env-test
DB_USER=env
DB_HOST=env-host
DB_PASSWORD=env-pass
DB_NAME=env-base
`;

const envPath = path.join(__dirname, '.env');

describe('loadENV', () => {
    beforeAll(done => {
        fs.writeFile(envPath, env, (err) => {
            if (err) throw err;
            loadENV({ path: envPath, verbose: true});
            done();
        });
    });

    it('should rewrite enviroment variables', () => {
       process.env.DB_USER = 'kappa';

       loadENV({path: envPath});

       expect(process.env.DB_USER).toBe('env');
    });

    it('should load enviroment variables from file', () => {
        expect(process.env.DB_USER).toBe('env');
        expect(process.env.NODE_ENV).toBe('env-test');
    });

    it.skip('should throw error when enviroment file has errors', done => {
        let temp = `
        qwvcefdvwefv
        `;

        let tempPath = path.join(__dirname, '.temp');

        fs.writeFile(tempPath, temp, (err) => {
            if (err) throw err;
            loadENV({ path: tempPath });
            done();
        });
    });

    afterAll(done => {
        fs.unlink(envPath, (err) => {
            if (err) throw err;
            done();
        });
    });
});
