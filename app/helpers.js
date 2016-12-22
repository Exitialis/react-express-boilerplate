import fs from 'fs';

function parse (src) {
    let obj = {};

    src.toString().split('\n').forEach(function (line) {

        let keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);

        if (keyValueArr != null) {
            let key = keyValueArr[1];

            let value = keyValueArr[2] ? keyValueArr[2] : '';

            let len = value ? value.length : 0;
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n');
            }

            value = value.replace(/(^['"]|['"]$)/g, '').trim();

            obj[key] = value
        }
    });

    return obj;
}

function loadENV(options) {
    let path = '.env';
    let encoding = 'utf8';
    let verbose = false;

    if (options) {
        if (options.verbose) {
            verbose = options.verbose
        }
        if (options.path) {
            path = options.path
        }
        if (options.encoding) {
            encoding = options.encoding
        }
    }

    try {
        let parsedObj = parse(fs.readFileSync(path, { encoding: encoding }));

        Object.keys(parsedObj).forEach(function (key) {
            process.env[key] = process.env[key] || parsedObj[key]
        });

        return parsedObj
    } catch (e) {
        if (verbose) {
            console.error('dotenv failed to parse and/or populate:' + e.message)
        }
        return false
    }
}

export {
    loadENV, parse
};